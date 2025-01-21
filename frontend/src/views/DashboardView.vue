<script lang="ts">
import DashboardHeader from '../components/DashboardHeader.vue';
import DashboardBread from '../components/DashboardBread.vue';
import DashboardSidebar from '../components/DashboardSidebar.vue';
import { ref } from 'vue';

export default {
    components: {
        DashboardSidebar,
        DashboardHeader,
        DashboardBread
    },
    setup() {
        const isSidebarVisible = ref(false);
        const isSmallScreen = ref(window.innerWidth < 768);

        const toggleSidebar = () => {
            isSidebarVisible.value = !isSidebarVisible.value;
        };

        return {
            isSidebarVisible,
            toggleSidebar
        };
    }
};
</script>

<template>
    <div class="flex pt-6">
        <DashboardSidebar :isVisible="isSidebarVisible" class="sidebar" />

        <div
            class="flex flex-col flex-grow main-content"
            :class="{ 'ml-0': !isSidebarVisible, 'ml-64': isSidebarVisible }"
        >
            <div class="fixed top-0 left-0 right-0 z-30 bg-white sm:static">
                <DashboardHeader @toggle-sidebar="toggleSidebar" />
            </div>
            <div class="">
                <DashboardBread />
            </div>
        </div>
    </div>
</template>

<style>
:root {
    --transition-duration: 300ms;
    --sidebar-width: 16rem;
}

.sidebar {
    width: var(--sidebar-width);
    transform: translateX(0);
    transition: transform var(--transition-duration) ease-in-out;
    position: fixed; 
    top: 0;
    bottom: 0;
    z-index: 10;
}

.sidebar.hidden {
    transform: translateX(-100%);
}

.main-content {
    transition: margin-left var(--transition-duration) ease-in-out;
    
}

@media (max-width: 767px) {
    .main-content {
        margin-left: 0;
    }

    .sidebar.hidden {
        transform: translateX(-100%);
    }
}
</style>
