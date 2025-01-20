import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignupView from '../views/SignupView.vue';
import DashboardView from '../views/DashboardView.vue';
import CallbackView from '../views/CallbackView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupView
        },
        {
            path: '/callback',
            name: 'callback',
            component: CallbackView
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardView,
            beforeEnter: (to, from, next) => {
                const accessToken = localStorage.getItem(
                    'spotify_access_token'
                );
                if (accessToken) {
                    next();
                } else {
                    next('/');
                }
            }
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        }
    ]
});

export default router;
