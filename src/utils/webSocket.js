class Web_Socket {
    wsurl = 'ws:www.lovepean.xyz:3001';
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