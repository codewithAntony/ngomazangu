<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { PlayCircle } from 'lucide-vue-next';
import { SpotifyService } from '../services/spotify';
import DashboardHeader from '../components/DashboardHeader.vue';
import DashboardSidebar from '../components/DashboardSidebar.vue';

interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}

interface SpotifyArtist {
    id: string;
    name: string;
    images: SpotifyImage[];
    genres: string[];
}

const timeRange = ref('long_term');
const topTracks = ref<SpotifyTrack[]>([]);
const isSidebarVisible = ref(false);

const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value;
};
const spotify = new SpotifyService(
    localStorage.getItem('spotify_access_token') || ''
);

const fetchData = async () => {
    try {
        console.log('fetching data..');
        const tracksData = await spotify.getTopTracks(timeRange.value, 40);
        console.log('Artists Data:', tracksData);
        topTracks.value = tracksData.items;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

onMounted(fetchData);
watch(timeRange, fetchData);

const handleTimeRangeChange = (newTimeRange: string) => {
    timeRange.value = newTimeRange;
};
</script>

<template>
    <div class="flex pt-6">
        <div class="fixed top-0 left-0 right-0 z-30 bg-white">
            <DashboardHeader @toggle-sidebar="toggleSidebar" />
        </div>

        <DashboardSidebar :isVisible="isSidebarVisible" class="sidebar" />
        <div
            class="flex flex-col flex-grow main-content"
            :class="{ 'ml-0': !isSidebarVisible, 'ml-64': isSidebarVisible }"
        >
            <div class="mt-16">
                <div
                    id="topartists"
                    class="min-h-screen w-full px-5 gap-5 mb-3"
                >
                    <div class="space-y-4 mt-5">
                        <div class="relative group rounded-sm overflow-hidden">
                            <img
                                v-if="topTracks[0]?.album?.images[0]?.url"
                                :src="topTracks[0].album.images[0].url"
                                :alt="topTracks[0].name"
                                class="w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                            />
                            <div
                                class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white"
                            >
                                <div class="text-sm font-medium mb-2">
                                    Top Artists
                                </div>
                                <h2 class="text-3xl font-bold mb-4">
                                    {{ topTracks[0]?.name || 'Loading...' }}
                                </h2>
                                <button
                                    class="opacity-0 group-hover:opacity-100 transition-opacity absolute right-6 bottom-6"
                                >
                                    <PlayCircle :size="48" class="text-white" />
                                </button>
                            </div>
                        </div>

                        <!-- Artists List -->
                        <div class="space-y-2">
                            <div
                                v-for="(track, index) in topTracks.slice(0, 40)"
                                :key="track.id"
                                class="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg group"
                            >
                                <div class="flex items-center gap-4">
                                    <span
                                        class="text-lg font-medium text-gray-500"
                                        >{{ index + 1 }}</span
                                    >
                                    <img
                                        v-if="track.album.images[0]?.url"
                                        :src="track.album.images[0].url"
                                        alt="track.name"
                                        class="w-12 h-12 rounded"
                                    />
                                    <div class="overflow-hidden">
                                        <h3
                                            class="font-medium truncate max-w-[150px] md:max-w-[250px]"
                                        >
                                            {{ track.name }}
                                        </h3>
                                        <p
                                            class="text-gray-500 truncate max-w-[150px] md:max-w-[250px]"
                                        >
                                            {{ track.artists[0].name }}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    class="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <PlayCircle :size="32" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <Email />
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
    transform: translateX(-100%);
    transition: transform var(--transition-duration) ease-in-out;
    position: fixed;
    top: 64px;
    bottom: 0;
    z-index: 20;
    background-color: #15161e;
}

.sidebar.visible {
    transform: translateX(0);
}

.main-content {
    transition: margin-left var(--transition-duration) ease-in-out;
}

@media (max-width: 767px) {
    .main-content {
        margin-left: 0;
    }
}
</style>
