<script lang="ts">
import DashboardHeader from '../components/DashboardHeader.vue';
import DashboardBread from '../components/DashboardBread.vue';
import DashboardSidebar from '../components/DashboardSidebar.vue';
// import { useRouter } from 'vue-router';

export default {
    components: {
        DashboardSidebar,
        DashboardHeader,
        DashboardBread
    }
    // setup() {
    //     const router = useRouter();

    //     const logout = () => {
    //         localStorage.removeItem('spotify_access_token');

    //         router.push('/');
    //     };
    //     return {
    //         logout,
    //     }
    // }
};
</script>

<template>
    <div class="flex">
        <DashboardSidebar />
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
