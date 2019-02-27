import axios from 'axios'

const config = {
    timeout: 5000,
    // baseURL: 'http://121.196.192.183:3000/'
};
const instance = axios.create(config);
instance.interceptors.request.use(req => {
    // req.headers['token'] = 'admin';
    return req;
}, error => {
    Promise.reject(error);
});
instance.interceptors.response.use(res => res.data, err => Promise.reject(err));

export default instance;