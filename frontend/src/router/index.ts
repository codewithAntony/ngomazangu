import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignupView from '../views/SignupView.vue';
import DashboardView from '../views/DashboardView.vue';
import CallbackView from '../views/CallbackView.vue';
import TopArtists from '../views/TopArtistsView.vue';
import RecentlyPlayed from '../components/RecentBread.vue';

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
            path: '/top-artists',
            name: 'topArtists',
            component: TopArtists
        },
        {
            path: '/recently-played',
            name: 'recentlyPlayed',
            component: RecentlyPlayed
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
        }
    ]
});

export default router;
