import socket from './socket';

var EVENTS = {};

socket.on("userJoin", user => {
    emitEvt("userJoin", user);
});

socket.on("userLeave", user => {
    emitEvt("userLeave", user);
});

socket.on("roomUsers", users => {
    emitEvt("roomUsers", users);
});

socket.on("message", message => {
    emitEvt("message", message);
});

export function onEvt(name, fun) {
    EVENTS[name] = fun;
}

function emitEvt(name, args) {
    if (EVENTS[name] && typeof EVENTS[name] === 'function') {
        EVENTS[name](args);
    }
}

export function offEvt(name) {
    if (EVENTS[name]) {
        EVENTS[name] = false;
    }

}

