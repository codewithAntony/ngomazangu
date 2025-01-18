<script lang="ts">
import { ref } from 'vue';
import { PlayCircle } from 'lucide-vue-next';

export default {
    name: 'Sidebar',
    components: {
        PlayCircle
    },
    setup() {
        const selectedTimeRange = ref('all');

        return {
            selectedTimeRange
        };
    }
};
</script>

<template>
    <div class="p-8 bg-white">
        <!-- Top Title Section -->
        <div class="flex justify-between items-center mb-8">
            <div class="flex items-center gap-4">
                <div class="p-2 rounded-full hover:bg-gray-100">
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
                <h1 class="text-2xl font-bold">Your music streaming stats</h1>
            </div>
            <div class="flex items-center gap-4">
                <select
                    v-model="selectedTimeRange"
                    class="px-4 py-2 border rounded-lg text-sm bg-white"
                >
                    <option value="all">All time</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                </select>
                <div class="w-10 h-10 rounded-full bg-gray-200"></div>
            </div>
        </div>

        <!-- Content Grid -->
        <div class="grid grid-cols-3 gap-6">
            <!-- Top Artists Section -->
            <div class="space-y-4">
                <div class="relative group rounded-lg overflow-hidden">
                    <img
                        src=""
                        alt="Artist"
                        class="w-full h-[400px] object-cover"
                    />
                    <div
                        class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white"
                    >
                        <div class="text-sm font-medium mb-2">Top Artists</div>
                        <h2 class="text-3xl font-bold mb-4">Future</h2>
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
                        v-for="num in 3"
                        :key="`artist-${num}`"
                        class="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg group"
                    >
                        <div class="flex items-center gap-4">
                            <span class="text-lg font-medium text-gray-500">{{
                                num
                            }}</span>
                            <img
                                src=""
                                alt="Artist"
                                class="w-12 h-12 rounded"
                            />
                            <div>
                                <h3 class="font-medium">Future</h3>
                                <p class="text-gray-500">1.2M plays</p>
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

            <!-- Top Tracks Section -->
            <div class="space-y-4">
                <div class="relative group rounded-lg overflow-hidden">
                    <img
                        src=""
                        alt="Track"
                        class="w-full h-[400px] object-cover"
                    />
                    <div
                        class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white"
                    >
                        <div class="text-sm font-medium mb-2">Top Tracks</div>
                        <h2 class="text-3xl font-bold mb-2">south to west</h2>
                        <p class="text-lg">Gunna</p>
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
                        v-for="num in 3"
                        :key="`track-${num}`"
                        class="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg group"
                    >
                        <div class="flex items-center gap-4">
                            <span class="text-lg font-medium text-gray-500">{{
                                num
                            }}</span>
                            <img src="" alt="Track" class="w-12 h-12 rounded" />
                            <div>
                                <h3 class="font-medium">south to west</h3>
                                <p class="text-gray-500">Gunna</p>
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

            <!-- Top Discover Section -->
            <div class="space-y-4">
                <div class="relative group rounded-lg overflow-hidden">
                    <img
                        src=""
                        alt="Discover"
                        class="w-full h-[400px] object-cover"
                    />
                    <div
                        class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white"
                    >
                        <div class="text-sm font-medium mb-2">Top Discover</div>
                        <h2 class="text-3xl font-bold mb-2">Fall Back</h2>
                        <p class="text-lg">Lithe</p>
                        <button
                            class="opacity-0 group-hover:opacity-100 transition-opacity absolute right-6 bottom-6"
                        >
                            <PlayCircle :size="48" class="text-white" />
                        </button>
                    </div>
                </div>

                <!-- Discover List -->
                <div class="space-y-2">
                    <div
                        v-for="num in 3"
                        :key="`discover-${num}`"
                        class="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg group"
                    >
                        <div class="flex items-center gap-4">
                            <span class="text-lg font-medium text-gray-500">{{
                                num
                            }}</span>
                            <img
                                src=""
                                alt="Discover"
                                class="w-12 h-12 rounded"
                            />
                            <div>
                                <h3 class="font-medium">Fall Back</h3>
                                <p class="text-gray-500">Lithe</p>
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
</template>
<style></style>
