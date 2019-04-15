let SSL_HOST = 'wss://local.get-beet.io:60556';
let LOCAL_HOST = 'ws://localhost:60555';
let _allowFallback = false;

let getWebSocketConnection = function (onopen = null, onmessage = null, onclose = null, onerror = null) {
    let host = SSL_HOST;
    let next = LOCAL_HOST;

    let _connect = function (host, next) {
        return new Promise((resolve, reject) => {
            let socket = new WebSocket(host);
            socket.onerror = function (event) {
                // only fallback for an error on first initialisation
                if (allowFallback && event.timeStamp < 2000 && next !== null) {
                    event.stopPropagation();
                    event.preventDefault();
                    console.log("Falling back to localhost socket", event);
                    _connect(next, null).then(socket => {
                        resolve(socket);
                    }).catch(reject);
                } else if (onerror != null) {
                    onerror(event, socket);
                }
            };
            socket.onopen = function (event) {
                resolve(socket);
                if (onopen !== null) {
                    onopen(event, socket);
                }
            };
            socket.onclose = function (event) {
                if (onclose !== null) {
                    onclose(event, socket);
                }
            };
            socket.onmessage = function (event) {
                if (onmessage !== null) {
                    onmessage(event, socket);
                }
            };
        });
    };
    return _connect(host, next);
};

let allowFallback = function () {
    _allowFallback = true;
};

export {getWebSocketConnection, allowFallback};