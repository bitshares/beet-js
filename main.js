import io from 'socket.io-client';
import CompanionClient from './lib/CompanionClient';
import "isomorphic-fetch"

let origin;

const throwNoAuth = () => {
    if(!holder.scatter.isExtension && !CompanionClient.isConnected())
        throw new Error('Connect and Authenticate first - scatter.connect( pluginName )');
};

const checkForPlugin = (resolve, tries = 0) => {
    if(tries > 20) return;
    if(holder.scatter.isExtension) return resolve(true);
    setTimeout(() => checkForPlugin(resolve, tries + 1), 100);
};

class BTSCompanion {

    constructor(){
        const noIdFunc = () => { if(!this.identity) throw new Error('No Identity') };

        this.isExtension = false;
        this.identity = null;
    }

    async isInstalled(){
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(false);
            }, 3000);

            Promise.race([
                CompanionClient.ping().then(found => {
                    console.log('found', found);
                    if(found) resolve(true);
                })
            ])



            // Tries to set up Desktop Connection

        })
    }

    async connect(pluginName, options){
        return new Promise(resolve => {
            if(!pluginName || !pluginName.length) throw new Error("You must specify a name for this connection");

            // Setting options defaults
            options = Object.assign({initTimeout:10000, linkTimeout:30000}, options);

            // Auto failer
            setTimeout(() => {
                resolve(false);
            }, options.initTimeout);


            // Tries to set up Desktop Connection
            CompanionClient.init(pluginName, options.linkTimeout);
            CompanionClient.link().then(async authenticated => {
                if(!authenticated) return false;
                this.identity = await this.getAccount();
                return resolve(true);
            });
        })
    }

    disconnect(){
        return CompanionClient.disconnect();
    }

    isConnected(){
        return CompanionClient.isConnected();
    }


    getAccount(){
        //throwNoAuth();
        return CompanionClient.sendApiRequest({
            type:'getAccount',
            payload:{
        //        fields:requiredFields
            }
        }).then(id => {
            if(id) this.identity = id;
            return id;
        });
    }


    requestSignature(payload){
        //throwNoAuth();
        return CompanionClient.sendApiRequest({
            type:'requestSignature',
            payload
        });
    }

}


class Holder {
    constructor(_companion){
        this.btscompanion = _companion;
    }
}


let holder = new Holder(new BTSCompanion());
if(typeof window !== 'undefined') window.btscompanion = holder.btscompanion;

export default holder;