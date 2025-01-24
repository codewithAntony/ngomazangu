<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { PlayCircle } from 'lucide-vue-next';
import { SpotifyService } from '../services/spotify';
import RecentBread from '../components/RecentBread.vue';

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
    <div class="flex flex-col">
        <div class="md:grid min-h-screen w-full px-5 md:grid-cols-3 gap-5 mb-3">
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
                <RouterLink to="/top-artists">
                    <button
                        class="text-white flex justify-center bg-[#15161E] w-full rounded-md py-2"
                    >
                        See All Top Artists
                    </button>
                </RouterLink>
            </div>

            <!-- Top Tracks Section -->
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
                        <div class="text-sm font-medium mb-2">Top Tracks</div>
                        <h2 class="text-3xl font-bold mb-2">
                            {{ topTracks[0]?.name || 'Loading...' }}
                        </h2>
                        <p class="text-lg" v-if="topTracks[0]?.artists[0]">
                            {{ topTracks[0].artists[0].name }}
                        </p>
                        <button
                            class="opacity-0 group-hover:opacity-100 transition-opacity absolute right-6 bottom-6"
                        >
                            <PlayCircle :size="48" class="text-white" />
                        </button>
                    </div>
                </div>

                <!-- Tracks List -->
                <div class="space-y-2">
                    <div
                        v-for="(track, index) in topTracks.slice(1, 4)"
                        :key="track.id"
                        class="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg group"
                    >
                        <div class="flex items-center gap-4">
                            <span class="text-lg font-medium text-gray-500">{{
                                index + 2
                            }}</span>
                            <img
                                v-if="track.album.images[0]?.url"
                                :src="track.album.images[0].url"
                                :alt="track.name"
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
                <RouterLink to="/top-tracks">
                    <button
                        class="text-white flex justify-center bg-[#15161E] w-full rounded-md py-2"
                    >
                        See All Top Tracks
                    </button>
                </RouterLink>
            </div>

            <!-- recent -->
            <div class="space-y-4 mt-5">
                <div class="relative group rounded-sm overflow-hidden">
                    <img
                        v-if="recentTracks[0]?.track?.album?.images[0]?.url"
                        :src="recentTracks[0].track.album.images[0].url"
                        :alt="recentTracks[0].track.name"
                        class="w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                    />
                    <div
                        class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white"
                    >
                        <div class="text-sm font-medium mb-2">
                            Recent Tracks
                        </div>
                        <h2 class="text-3xl font-bold mb-2">
                            {{ recentTracks[0]?.track?.name || 'Loading...' }}
                        </h2>
                        <p
                            class="text-lg"
                            v-if="recentTracks[0]?.track?.artists[0]"
                        >
                            {{ recentTracks[0].track.artists[0].name }}
                        </p>
                        <button
                            class="opacity-0 group-hover:opacity-100 transition-opacity absolute right-6 bottom-6"
                        >
                            <PlayCircle :size="48" class="text-white" />
                        </button>
                    </div>
                </div>

                <!-- Recent Tracks -->
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
                            <div class="overflow-hidden">
                                <h3
                                    class="font-medium truncate max-w-[150px] md:max-w-[250px]"
                                >
                                    {{ item.track.name }}
                                </h3>
                                <p
                                    class="text-gray-500 truncate max-w-[150px] md:max-w-[250px]"
                                >
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
                <RouterLink to="/recent-tracks">
                    <button
                        class="text-white flex justify-center bg-[#15161E] w-full rounded-md py-2"
                    >
                        Recent Tracks
                    </button>
                </RouterLink>
            </div>
        </div>
        <!-- <div>
            <RecentBread />
        </div> -->
    </div>
</template>
