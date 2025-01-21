<template>
    <div class="py-5 px-3 bg-white">
        <div class="flex justify-between items-center">
            <div class="flex items-center gap-4">
                <div
                    class="p-2 rounded-full hover:bg-gray-100"
                    @click="$emit('toggle-sidebar')"
                >
                    <svg
                        class="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4 6H20M4 12H20M4 18H20"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                        />
                    </svg>
                </div>
                <h1 class="text-lg font-medium sm:font-bold sm:text-2xl">
                    Your music streaming stats
                </h1>
            </div>
            <div class="flex items-center gap-4">
                <select
                    v-model="timeRange"
                    @change="fetchData"
                    class="px-4 py-2 border rounded-lg text-sm bg-white"
                >
                    <option value="long_term">All time</option>
                    <option value="medium_term">This Month</option>
                    <option value="short_term">This Year</option>
                </select>
            </div>
            <div>
                <button
                    class="bg-black text-white px-7 py-2 sm:px-7 sm:py-2 rounded text-sm w-fit mt-2 hover:bg-[#FECA11] hover:text-black"
                    @click="logout"
                >
                    Logout
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { PlayCircle } from 'lucide-vue-next';
import { SpotifyService } from '../services/spotify';
import { useRouter } from 'vue-router';

const timeRange = ref('long_term');
const topArtists = ref([]);
const topTracks = ref([]);
const recentTracks = ref([]);

const spotify = new SpotifyService(
    localStorage.getItem('spotify_access_token') || ''
);

const router = useRouter();

const fetchData = async () => {
    try {
        const [artistsData, tracksData, recentData] = await Promise.all([
            spotify.getTopArtists(timeRange.value),
            spotify.getTopTracks(timeRange.value),
            spotify.getRecentlyPlayed()
        ]);

        topArtists.value = artistsData.items;
        topTracks.value = tracksData.items;
        recentTracks.value = recentData.items;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const logout = () => {
    localStorage.removeItem('spotify_access_token');

    router.push('/');
};

onMounted(fetchData);
</script>
