import VueRouter from 'vue-router';
import ChartsPage from './page/Charts';
import HomePage from './page/Home';

const router = new VueRouter({
    mode:'history',
    routes: [{
        path: '/',
        redirect: '/home'
    },{
        path: '/home',
        component: HomePage
    }, {
        path: '/charts',
        component: ChartsPage
    }]
})

export default router;