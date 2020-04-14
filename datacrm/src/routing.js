import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from './page/login';
import Index from './page/index';
import AddReport from './page/addReport';
import ReportList from './page/reportList';
import ImpStore from './page/impStore';
import Home from './page/home';

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
        redirect: '/home',
        children: [{
            path: '/home',
            component: Home
        }, {
            path: '/addReport',
            component: AddReport
        }, {
            path: '/reportList',
            component: ReportList
        }, {
            path: '/impStore',
            component: ImpStore
        }]
    }]
})

Vue.use(VueRouter);
export default router;