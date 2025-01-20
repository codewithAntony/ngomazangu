<script setup lang="ts">
import { onMounted } from 'vue';
import { getAccessTokenFromUrl } from '../utils/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
    console.log('Callbackview mounted');
    const token = getAccessTokenFromUrl();
    console.log('Token from url:', token);
    if (token) {
        localStorage.setItem('spotify_access_token', token);
        console.log('Token stored in local localStorage');
        router.push('/dashboard');
    } else {
        console.error('No token found, redirecting to homepage');
        router.push('/');
    }
});
</script>

<template>
    <div>Loading...</div>
</template>
