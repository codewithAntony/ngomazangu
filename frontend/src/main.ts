import './assets/main.css';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiry = payload.exp;
        return Date.now() >= expiry * 1000;
    } catch (error) {
        console.error('Invalid token:', error);
        return true;
    }
}

async function refreshAccessToken(
    refreshToken: string
): Promise<string | null> {
    try {
        const response = await fetch('https://your-backend.com/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken })
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        const data = await response.json();
        return data.accessToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        return null;
    }
}

const app = createApp(App);

const accessToken = localStorage.getItem('spotify_access_token');
const refreshToken = localStorage.getItem('spotify_refresh_token');

if (accessToken && isTokenExpired(accessToken)) {
    if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);
        if (newAccessToken) {
            localStorage.setItem('spotify_access_token', newAccessToken);
            router.push('/dashboard');
        } else {
            localStorage.removeItem('spotify_access_token');
            localStorage.removeItem('spotify_refresh_token');
            router.push('/');
        }
    } else {
        localStorage.removeItem('spotify_access_token');
        router.push('/');
    }
} else if (accessToken) {
    router.push('/dashboard');
} else {
    router.push('/');
}
app.use(router);
app.mount('#app');
