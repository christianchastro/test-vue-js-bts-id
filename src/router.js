import Vue from 'vue';
import Router from 'vue-router';
import store from './store/store.js';

import Login from './views/Login.vue';
import Signup from './views/Signup.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/login',
            component: Login,
            meta: {
                requiresAuth: false,
            }
        },
        {
            path: '/register',
            component: Signup,
            meta: {
                requiresAuth: false,
            }
        }
    ]
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
        }
        else {
            next('/login')
        }
    } else {
        next()
    }
});
export default router;