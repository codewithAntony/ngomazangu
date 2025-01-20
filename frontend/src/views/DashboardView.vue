<script lang="ts">
import DashboardHeader from '../components/DashboardHeader.vue';
import DashboardBread from '../components/DashboardBread.vue';
// import { useRouter } from 'vue-router';

export default {
    components: {
        DashboardHeader,
        DashboardBread
    }
    // setup() {
    //     const router = useRouter();

    //     const logout = () => {
    //         localStorage.removeItem('spotify_access_token');
    //         localStorage.removeItem('spotify_refresh_token');
    //         router.push('/');
    //     };
    // }
};
</script>

<template>
    <div class="">
        <!-- <div>
            <h1>Welcome to Your Dashboard</h1>
            <button @click="logout">Logout</button>
        </div> -->
        <div class="flex flex-col">
            <div class="">
                <DashboardHeader />
            </div>
            <div>
                <DashboardBread />
            </div>
        </div>
    </div>
</template>
<script></script>
