<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <header class="bg-[#FBE9F3]">
        <nav class="max-w-5xl mx-auto min-h-screen flex flex-col pt-4">
            <div class="flex justify-between">
                <div class="flex">
                    <router-link to="/">
                        <span
                            class="text-black font-bold text-1xl sm:text-3xl uppercase"
                            >ngoma</span
                        ><span
                            class="text-[#FECA11] font-bold text-1xl sm:text-3xl uppercase"
                            >Zangu</span
                        >
                    </router-link>
                </div>
                <div class="flex gap-3">
                    <router-link to="/signup">
                        <button
                            class="bg-black text-white px-11 py-2 rounded text-sm w-fit mt-2 hover:bg-[#FECA11] hover:text-black"
                        >
                            SignUp
                        </button>
                    </router-link>
                </div>
            </div>
            <div class="flex-1 flex items-center justify-center">
                <div
                    class="flex flex-row gap-8 items-center max-w-4xl mx-auto px-4"
                >
                    <div class="flex flex-col space-y-2">
                        <h2
                            class="text-[#4095C3] font-extrabold text-2xl pb-3 sm:text-4xl"
                        >
                            Discover your music streaming stats
                        </h2>
                        <p class="text-[#4095C3] font-medium text-1xl">
                            Get insights to your music listening habits with
                            <br />
                            top artists and tracks. Discover new music, create
                            <br />
                            playlists and get monthly reports.
                        </p>
                        <router-link to="/signup">
                            <button
                                class="bg-black text-white px-11 py-2 rounded text-sm w-fit mt-2 hover:bg-[#FECA11] hover:text-black"
                            >
                                SignUp
                            </button>
                        </router-link>
                    </div>
                    <div class="">
                        <img
                            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2xnNDZ4bHA2ZDYzbnRraXlrYTZ4NHk4eGd4b3A0dHNvbDVxa2JxdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5tiNlHkA1WdUh3jRDW/giphy.gif"
                            alt="Dancing Penguin"
                            class="rounded-full"
                            width="90%"
                        />
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <RouterView />
</template>

<style></style>
