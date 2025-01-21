<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
    const accessToken = localStorage.getItem('spotify_access_token');
    if (accessToken) {
        router.push('/dashboard');
    }
});
</script>

<template>
    <header class="bg-[#FBE9F3]">
        <nav class="max-w-5xl mx-auto min-h-screen flex flex-col px-2 pt-4">
            <div class="flex justify-between items-center">
                <div class="flex">
                    <RouterLink to="/">
                        <span
                            class="text-black font-normal text-2xl sm:text-3xl sm:font-bold uppercase"
                            >ngoma</span
                        ><span
                            class="text-[#FECA11] font-normal text-2xl sm:text-3xl sm:font-bold uppercase"
                            >Zangu</span
                        >
                    </RouterLink>
                </div>
                <div class="flex gap-3">
                    <RouterLink to="/signup">
                        <button
                            class="bg-blue-400 text-white px-7 py-2 sm:px-11 sm:py-2 rounded text-sm w-fit mt-2 hover:bg-blue-300 hover:text-black"
                        >
                            SignUp
                        </button>
                    </RouterLink>
                </div>
            </div>
            <div class="flex-1 flex items-center justify-center">
                <div
                    class="flex flex-col-reverse items-center max-w-4xl mx-auto px-4 sm:flex-row sm:gap-8"
                >
                    <div class="flex flex-col space-y-2">
                        <h2
                            class="text-[#4095C3] sm:font-extrabold text-lg font-semibold pb-3 sm:text-4xl"
                        >
                            Discover your music streaming stats
                        </h2>
                        <p
                            class="text-[#4095C3] text-sm sm:font-medium sm:text-1xl"
                        >
                            Get insights to your music listening habits with
                            <br />
                            top artists and tracks. Discover new music, create
                            <br />
                            playlists and get monthly reports.
                        </p>
                        <RouterLink to="/signup">
                            <button
                                class="bg-blue-400 text-white px-7 py-2 sm:px-11 sm:py-2 rounded text-sm w-fit mt-2 hover:bg-blue-300 hover:text-black"
                            >
                                SignUp
                            </button>
                        </RouterLink>
                    </div>
                    <div class="w-48 sm:w-auto mb-8 sm:mb-0">
                        <img
                            src="@/assets/images/penguin.gif"
                            alt="Dancing Penguin"
                            class="rounded-full w-full"
                        />
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<style></style>
