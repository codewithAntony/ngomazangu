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

interface SpotifyTrack {
    id: string;
    name: string;
    artists: SpotifyArtist[];
    album: {
        images: SpotifyImage[];
    };
}

interface RecentlyPlayedItem {
    track: SpotifyTrack;
    played_at: string;
}

const timeRange = ref('long_term');
const topArtists = ref<SpotifyArtist[]>([]);
const topTracks = ref<SpotifyTrack[]>([]);
const recentTracks = ref<RecentlyPlayedItem[]>([]);

const spotify = new SpotifyService(
    localStorage.getItem('spotify_access_token') || ''
);

const fetchData = async () => {
    try {
        console.log('fetching data..');
        const [artistsData, tracksData, recentData] = await Promise.all([
            spotify.getTopArtists(timeRange.value),
            spotify.getTopTracks(timeRange.value),
            spotify.getRecentlyPlayed()
        ]);

        console.log('Artists Data:', artistsData);
        console.log('Tracks Data:', tracksData);
        console.log('Recently Played Data:', recentData);

        topArtists.value = artistsData.items;
        topTracks.value = tracksData.items;
        recentTracks.value = recentData.items;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

onMounted(fetchData);
</script>
<template>
    <div class="flex flex-col px-5 mb-3">
        <h1 class="text-2xl font-bold my-3">Recently Played Tracks</h1>
        <div class="space-y-2">
            <div
                v-for="(item, index) in recentTracks.slice(1, 4)"
                :key="item.track.id"
                class="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg group"
            >
                <div class="flex items-center gap-4">
                    <span class="text-lg font-medium text-gray-500">{{
                        index + 2
                    }}</span>
                    <img
                        v-if="item.track.album.images[0]?.url"
                        :src="item.track.album.images[0].url"
                        :alt="item.track.name"
                        class="w-12 h-12 rounded"
                    />
                    <div class="">
                        <h3 class="font-medium">
                            {{ item.track.name }}
                        </h3>
                        <p class="text-gray-500">
                            {{ item.track.artists[0].name }}
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
            class="text-white flex justify-center bg-black w-full rounded-md py-2"
        >
            See All Recently Played Tracks
        </button>
    </div>
</template>
