import io from 'socket.io-client';

import connector from './connectror';
import * as consts from './consts';

const proxyCall = (msg, data) => {
    // place for log socket call stack
    let type = null;
    
    // sadly we have to normalize arguments
    if (typeof msg === "string") {
        type = msg;
    } 
    else {
        ({ type = consts.MSG_DEFAULT_TYPE, ...data } = msg);
    }

    connector.call(type, data)
}

const onConnect = (socket) => {
    // place for subscriptions
    proxyCall(consts.MSG_ON_CONNECT);

    socket.on(consts.MSG_DATA_CHANGE, proxyCall);
}

const onDisconnect = (reason) => {
    if (this.socket.io.connecting.indexOf(this.socket) === -1) {
        // you should renew token or do another important things before reconnecting
        proxyCall(consts.MSG_ON_DISCONNECT, reason);

        // maybe we doesn't need it.
        if (!this.forseStop) { 
            this.socket.connect();
        }
    }
}

const connect = (params) => {
    // place for settings
    disconnect();

    this.socket = io.connect(consts.SOCKET_URL, Object.assign({
        usePeerConnection: true,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 99999
    }, params));


    this.socket.on('connect', onConnect);
    this.socket.on('disconnect', onDisconnect);
}

const disconnect = (forseStop) => {
    this.forseStop = forseStop;

    if (this.socket) {
        this.socket.disconnect(true);
        this.socket.destroy();

        delete this.socket;
        this.socket = null;
    }
}

const emit = (type, data)=> {
    // needs to log here all outputs
    this.socket.emit(type, data);
}

export {
    connector,
    consts
}

export default {
    connect,
    disconnect,
    emit,
    use: connector.use,
    unuse: connector.unuse,
}