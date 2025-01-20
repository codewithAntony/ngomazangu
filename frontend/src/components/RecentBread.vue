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

const recentTracks = ref<RecentlyPlayedItem[]>([]);

const spotify = new SpotifyService(
    localStorage.getItem('spotify_access_token') || ''
);

const fetchRecentlyPlayed = async () => {
    try {
        console.log('fetching recently played tracks..');
        const recentData = await spotify.getRecentlyPlayed(5);
        console.log('Recently played data:', recentData);

        recentTracks.value = recentData.items;
    } catch (error) {
        console.error('Error fetching recently played tracks:', error);
    }
};

onMounted(fetchRecentlyPlayed);
</script>

<template>
    <div class="flex flex-col px-5 mb-3">
        <h1 class="text-2xl font-bold my-3">Recently Played Tracks</h1>
        <div class="space-y-2">
            <div
                v-for="(item, index) in recentTracks"
                :key="item.track.id"
                class="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg group"
            >
                <div class="flex items-center gap-4">
                    <span class="text-lg font-medium text-gray-500">{{
                        index + 1
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
