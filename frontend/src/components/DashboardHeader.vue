<template>
    <header class="p-4 bg-white shadow">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold">Your Music Dashboard</h1>
            <div class="flex gap-4">
                <button
                    v-for="range in ['short_term', 'medium_term', 'long_term']"
                    :key="range"
                    @click="handleTimeRangeChange(range)"
                    :class="[
                        'px-4 py-2 rounded',
                        initialTimeRange === range
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                    ]"
                >
                    {{ range.replace('_', ' ').replace('term', '') }}
                </button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    initialTimeRange: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['time-range-change']);

const handleTimeRangeChange = (range: string) => {
    emit('time-range-change', range);
};
</script>
