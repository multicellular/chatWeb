import http from '@/utils/axiosInstance'
// const url = 'http://www.tuling123.com/openapi/api?key=你申请的key&info=你要发的消息';
class Robot {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    chatTo(user) {
        user.sendMessageToRobot = function (message) {
            return http.get(`http://www.tuling123.com/openapi/api?key=${this.apiKey}&info=${message}`);
        }
    }
    receiveMessage(message) {
        return http.get(`http://www.tuling123.com/openapi/api?key=${this.apiKey}&info=${message}`);
    }
}

export default new Robot('ac7b6152eb2047a1b7e45678bca5b545');