<script lang="ts">
import { defineComponent, ref } from 'vue';
import emailjs from 'emailjs-com';

export default defineComponent({
    name: 'EmailForm',
    setup() {
        const email = ref('');

        const sendEmail = async () => {
            if (!email.value) {
                alert('Please enter a valid email address');
                return;
            }

            try {
                await emailjs.send(
                    'service_vew7lve',
                    'template_asqnbtl',
                    {
                        to_email: email.value,
                        message:
                            'You have successfully subscribed to receive free monthly reports!'
                    },
                    'C4huoqoqXk3UaVF91'
                );

                alert('Email sent successfully');
                email.value = '';
            } catch (error) {
                alert('Failed to send email: ' + (error as Error).message);
            }
        };

        return {
            email,
            sendEmail
        };
    }
});
</script>
<template>
    <div class="bg-black mb-5 py-5 rounded-lg w-15 h-50">
        <div class="flex text-center space-y-7 flex-col">
            <h2 class="text-white font-bold text-lg">
                We send monthly reports, <br />
                right in your inbox.
            </h2>
            <p class="text-white font-sm text-sm">
                Some cool statistics regarding your music listening habits.
            </p>
            <div class="flex justify-center items-center gap-2">
                <input
                    v-model="email"
                    placeholder="Enter your email"
                    class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="email"
                />
                <button
                    @click="sendEmail"
                    class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Reports
                </button>
            </div>
        </div>
    </div>
</template>
