import axios from 'axios'
import { getItem } from "@/utils/storage";
import { Message } from "element-ui"

const config = {
    timeout: 5000,
    // baseURL: 'http://121.196.192.183:3000/'
};
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