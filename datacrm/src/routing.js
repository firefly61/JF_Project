import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from './page/login';
import Index from './page/index';
import AddReport from './page/addReport';
import ReportList from './page/reportList';

const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/index',
        component: Index,
        redirect: '/addReport',
        children: [{
            path: '/addReport',
            component: AddReport
        }, {
            path: '/reportList',
            component: ReportList
        }]
    }]
})

Vue.use(VueRouter);
export default router;