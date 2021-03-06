import Vue from 'vue';
import axios from 'axios';

let service = axios.create({
    timeout: 5000,
    baseURL: '/api'
});

service.interceptors.request.use(
    config => {
        // 请求拦截器， 后续的token管理都在这
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

//响应拦截器
service.interceptors.response.use(
    async response => {
        // header config这里处理， 应用层只需要数据data
        let {data} = response;
        // if(data)
        return data;
    }
)

Vue.prototype.$http = service;
export default service;