import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue'),
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/users',
        name: 'Users',
        component: () => import('../views/Users.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/accounts',
        name: 'Accounts',
        component: () => import('../views/Accounts.vue'),
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, _, next) => {
    const authStore = useAuthStore();
    console.log("Auth Store : ", authStore.isAuthenticated)
    // Check if auth needs to be restored from storage
    // if (!authStore.isAuthenticated && localStorage.getItem('token')) {
    //     try {
    //         // Wait for auth to be restored before proceeding
    //         await authStore.restoreAuth();
    //     } catch (error) {
    //         console.error('Failed to restore authentication:', error);
    //     }
    // }
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ name: 'Login' });
    } else  if(to.name === 'Login' && authStore.isAuthenticated){
        next({name: 'Dashboard'})
    }
    {
        next();
    }
});

export default router;