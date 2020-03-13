import VueRouter from 'vue-router';
import HomePage from './page/Home';
import SearchPage from './page/Search';

const router = new VueRouter({
    mode:'history',
    routes: [{
        path: '/',
        redirect: '/home'
    },{
        path: '/home',
        component: HomePage
    }, {
        path: '/search',
        component: SearchPage
    }]
})

export default router;