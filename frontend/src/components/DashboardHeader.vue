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
                    v-model="selectedTimeRange"
                    @change="handleTimeRangeChange"
                    class="px-4 hidden py-2 border rounded-lg text-sm bg-white sm:inline-flex"
                    :disabled="isLoading"
                >
                    <option v-if="isLoading" value="" disabled>
                        Loading...
                    </option>
                    <option
                        v-for="option in timeRangeOptions"
                        :key="option.value"
                        :value="option.value"
                    >
                        {{ option.label }}
                    </option>
                </select>
            </div>
            <div>
                <button
                    class="bg-blue-400 text-white px-7 py-2 sm:px-7 sm:py-2 rounded text-sm w-fit mt-2 hover:bg-blue-300 hover:text-black"
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

const emit = defineEmits(['toggle-sidebar', 'time-range-changed']);
const router = useRouter();

const timeRangeOptions = ref<{ value: string; label: string }[]>([
    { value: 'long_term', label: 'All time' },
    { value: 'medium_term', label: 'This Month' },
    { value: 'short_term', label: 'This Year' }
]);

const selectedTimeRange = ref('long_term');
const isLoading = ref(false);

const spotify = new SpotifyService(
    localStorage.getItem('spotify_access_token') || ''
);

const handleTimeRangeChange = () => {
    console.log('Selected time range:', selectedTimeRange.value);
    emit('time-range-changed', selectedTimeRange.value);
};

const logout = () => {
    localStorage.removeItem('spotify_access_token');
    router.push('/');
};

const fetchData = async () => {
    try {
        isLoading.value = true;
        const [artistsData, tracksData, recentData] = await Promise.all([
            spotify.getTopArtists(selectedTimeRange.value),
            spotify.getTopTracks(selectedTimeRange.value),
            spotify.getRecentlyPlayed()
        ]);

        console.log('Artists Data:', artistsData);
        console.log('Tracks Data:', tracksData);
        console.log('Recently Played Data:', recentData);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(fetchData);
</script>
