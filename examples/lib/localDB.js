import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import prompts from 'prompts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

/**
 * Retrieve a stored identity from the local JSON db
 * @param {String} appName
 * @returns {Object} identity
 */
async function readData(appName) {
    return new Promise(async (resolve, reject) => {
        await db.read();

        if (
            !db.data ||
            !db.data.identities ||
            !db.data.identities.filter(x => x.appName === appName).length
        ) {
            // No stored identities for this app; proceed to link.
            return resolve();
        }
    
        let storedIdentities = db.data.identities.filter(x => x.appName === appName);
    
        const onCancel = prompt => {
            return reject();
        }

        let response;
        try {
            response = await prompts(
                [
                    {
                        type: 'confirm',
                        name: 'confirm',
                        message: 'Do you want to relink?',
                        initial: true
                    },
                    {
                        type: prev => prev === true ? 'select' : null,
                        name: 'identityhash',
                        message: 'Which account do you want to relink with?',
                        choices: storedIdentities.map(id => {
                            return {
                                title: id.requested.account.name,
                                value: id.identityhash
                            }
                        }),
                    }
                ],
                { onCancel }
            );
        } catch (error) {
            console.log(error);
            return resolve();
        }
    
        if (!response || !response.confirm || !storedIdentities.length) {
            // No stored || relink rejected
            return resolve();
        }       

        let chosenID = storedIdentities.find(x => x.identityhash === response.identityhash)
        return resolve(chosenID);
    });
}

async function storeData(data) {
    return new Promise(async (resolve, reject) => {
        await db.read()
        db.data ||= { identities: [] }
        let tempIDs = db.data.identities;
        
        let filteredIDs = tempIDs.filter(x => x.identityhash !== data.identityhash);
        filteredIDs.push(data);
        db.data.identities = filteredIDs;

        await db.write()
        return resolve();
    });
}

export {
    readData,
    storeData
}