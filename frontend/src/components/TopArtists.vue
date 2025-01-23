<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { PlayCircle } from 'lucide-vue-next';
import { SpotifyService } from '../services/spotify';

interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}

interface SpotifyArtist {
    id: string;
    name: string;
    images: SpotifyImage[];
}

const timeRange = ref('long_term');
const topArtists = ref<SpotifyArtist[]>([]);

const spotify = new SpotifyService(
    localStorage.getItem('spotify_access_token') || ''
);

const fetchData = async () => {
    try {
        console.log('fetching data..');
        const [artistsData] = await Promise.all([
            spotify.getTopArtists(timeRange.value)
        ]);

        console.log('Artists Data:', artistsData);

        topArtists.value = artistsData.items;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

onMounted(fetchData);
</script>
<template>
    <div
        id="topartists"
        class="md:grid min-h-screen w-full px-5 md:grid-cols-3 gap-5 mb-3"
    >
        <div class="space-y-4 mt-5">
            <div class="relative group rounded-sm overflow-hidden">
                <img
                    v-if="topArtists[0]?.images[0]?.url"
                    :src="topArtists[0].images[0].url"
                    :alt="topArtists[0].name"
                    class="w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                />
                <div
                    class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white"
                >
                    <div class="text-sm font-medium mb-2">Top Artists</div>
                    <h2 class="text-3xl font-bold mb-4">
                        {{ topArtists[0]?.name || 'Loading...' }}
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
                    v-for="(artist, index) in topArtists.slice(1, 4)"
                    :key="artist.id"
                    class="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg group"
                >
                    <div class="flex items-center gap-4">
                        <span class="text-lg font-medium text-gray-500">{{
                            index + 2
                        }}</span>
                        <img
                            v-if="artist.images[0]?.url"
                            :src="artist.images[0].url"
                            alt="artist.name"
                            class="w-12 h-12 rounded"
                        />
                        <div class="overflow-hidden">
                            <h3
                                class="font-medium truncate max-w-[150px] md:max-w-[250px]"
                            >
                                {{ artist.name }}
                            </h3>
                            <p
                                class="text-gray-500 truncate max-w-[150px] md:max-w-[250px]"
                            >
                                Artist
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
            <button
                class="text-white flex justify-center bg-[#15161E] w-full rounded-md py-2"
            >
                See All Top Artists
            </button>
        </div>
    </div>
</template>
