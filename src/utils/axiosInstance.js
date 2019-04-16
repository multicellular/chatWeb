import axios from 'axios'
import { getItem, setItem } from "@/utils/storage";
import { Message } from "element-ui"
// 获取服务器设置的cookie
import * as cookies from "browser-cookies";

const config = {
    timeout: 5000,
    baseURL: '/api'
};
//本地存储token
if (cookies.get('oauth_token')) {
    setItem('my_token', cookies.get('oauth_token'), true)
}
const token = getItem("my_token", true);
const instance = axios.create(config);
instance.interceptors.request.use(req => {
    // req.headers['token'] = 'admin';
    if (req.secret && token) {
        req.headers['Authorization'] = 'Bearer ' + token;
    }
    return req;
}, error => {
    Promise.reject(error);
});
instance.interceptors.response.use(({ data }) => {
    if (data.code === 0) {
        return data;
    } else {
        Message({
            type: 'error',
            message: data.msg,
            showClose: true
        });
        return Promise.reject(data);
    }
}, err => Promise.reject(err));

export default instance;