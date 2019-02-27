export function getItem(key, isLocal) {
    if (isLocal) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (err) {
            return '';
        }

    } else {
        try {
            return JSON.parse(sessionStorage.getItem(key));
        } catch (err) {
            return '';
        }
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