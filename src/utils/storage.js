export function getItem(key, isLocal) {
    if (isLocal) {
        return JSON.parse(localStorage.getItem(key));
    } else {
        return JSON.parse(sessionStorage.getItem(key));
    }
}

export function setItem(key, value, isLocal) {
    value = JSON.stringify(value);
    if (isLocal) {
        localStorage.setItem(key, value);
    } else {
        sessionStorage.setItem(key, value)
    }
}

export function removeItem(key, isLocal) {
    if (isLocal) {
        localStorage.removeItem(key);
    } else {
        sessionStorage.removeItem(key);
    }
}

export function clear(isLocal) {
    if (isLocal) {
        localStorage.clear();
    } else {
        sessionStorage.clear();
    }
}