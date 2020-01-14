class Web_Socket {
    wsurl = 'ws:49.235.114.14:8001';
    // wsurl = 'ws:localhost:3001';
    path;
    constructor(path) {
        this.path = path;
    }
    getWebSocket() {
        return new WebSocket(this.wsurl + this.path);
    }
}

export default Web_Socket;