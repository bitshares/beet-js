import Socket from 'simple-websocket';

let LOCAL_HOST = 'ws://localhost:60555/';
let _allowFallback = false;

export const getWebSocketConnection = function (onopen = null, onmessage = null, onclose = null, onerror = null) {
    let _ignoreErrorsFrom = [];

    let _connect = () => {
        return new Promise((resolve, reject) => {
            try {
                let socket = new Socket(LOCAL_HOST);
                socket.onerror = (event) => {
                    _ignoreErrorsFrom.push(LOCAL_HOST);
                    // only fallback for an error on first initialisation
                    if (_allowFallback && event.timeStamp < 2000 && next !== null) {
                        event.stopPropagation();
                        event.preventDefault();
                        console.log("Falling back to localhost socket", event);
                        _connect(next, null).then(socket => {
                            resolve(socket);
                        }).catch(reject);
                    } else {
                        reject("Socket initialization errored.")
                        if (onerror != null) {
                            console.log(event)
                            onerror(event, socket);
                        }
                    }
                };
                socket.onopen = (event) => {
                    if (event.target && event.target.url && _ignoreErrorsFrom.includes(event.target.url)) {
                        if (socket.readyState === socket.OPEN || socket.readyState === socket.CONNECTING) {
                            socket.close();
                        }
                        console.error("Ignoring onopen for errored socket, this shouldn't happen!");
                        return;
                    }
                    resolve(socket);
                    // requeue following commands at the end of stack
                    setTimeout(() => {
                        if (onopen !== null) {
                            onopen(event, socket);
                        }
                    });
                };
                socket.onclose = (event) => {
                    if (event.target && event.target.url && _ignoreErrorsFrom.includes(event.target.url)) {
                        console.log("Ignoring onclose for errored socket: ", event.target.url);
                        return;
                    }
                    reject("Socket was closed");
                    if (onclose !== null) {
                        onclose(event, socket);
                    }
                };
                socket.onmessage = (event) => {
                    if (event.target && event.target.url && _ignoreErrorsFrom.includes(event.target.url)) {
                        if (socket.readyState === socket.OPEN || socket.readyState === socket.CONNECTING) {
                            socket.close();
                        }
                        console.error("Ignoring onmessage for errored socket, this shouldn't happen!");
                        return;
                    }
                    if (onmessage !== null) {
                        onmessage(event, socket);
                    }
                };
            } catch (err) {
                console.log(err);
            }

        });
    };

    return _connect();
};

export const allowFallback = function () {
    _allowFallback = true;
};
