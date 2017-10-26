import socket from './socket';
import { consts } from './socket';

const someReducer = (type, data) => {
    switch (type) {
        case consts.MSG_ON_CONNECT: {
            console.log('Yahooo, socket is connected');
        }

        // place for other actions
    }
}

const otherOneReducer = (type, data) => {
    switch (type) {
        case consts.MSG_ON_DISCONNECT: {
            console.log('F*ck, socket is disconnected');
        }

        // place for other actions
    }
}

// To connect use one of
socket.use(someReducer);
socket.use(otherOneReducer);

// or

socket.use([someReducer, otherOneReducer]);

// or
socket.use(someReducer, otherOneReducer);

socket.connect({
    // place for params
});

// at last, when app done.
socket.disconnect(true);