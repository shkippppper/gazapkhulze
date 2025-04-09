<template>
<div class="w-full max-w-xl p-12 mx-auto rounded-lg shadow-xl dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg">
    <div class="flex items-center justify-between mb-4">
        <div class="space-y-1">
            <h2 class="text-xl font-semibold">Recent RSVPs</h2>
            <p class="text-sm text-gray-500">
                Fetched {{ rsvps?.length }} RSVPs in {{ duration }}ms
            </p>
        </div>
        <button class="hover:opacity-80" @click="refreshPage">
            Refresh
        </button>
    </div>
    <div class="divide-y divide-gray-900/5">
        <div v-for="rsvp in rsvps" :key="rsvp.id" class="py-3">
            <div class="flex justify-between mb-2">
                <span class="font-medium">RSVP #{{ rsvp.id }}</span>
                <span class="text-sm text-gray-500">{{ timeAgo(rsvp?.createdAt) }}</span>
            </div>
            <div class="grid grid-cols-2 gap-2 text-sm">
                <div><strong>Coming:</strong> {{ rsvp.coming }}</div>
                <div><strong>Food:</strong> {{ rsvp.food || 'N/A' }}</div>
                <div><strong>Drink:</strong> {{ rsvp.drink || 'N/A' }}</div>
                <div><strong>Music:</strong> {{ rsvp.music || 'N/A' }}</div>
                <div class="col-span-2"><strong>Extra:</strong> {{ rsvp.extra || 'N/A' }}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ms from 'ms'

export default {
    props: {
        rsvps: {
            type: Array,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
    },
    methods: {
        timeAgo(timestamp, timeOnly) {
            if (!timestamp) return 'never'
            return `${ms(Date.now() - new Date(timestamp).getTime())}${
                timeOnly ? '' : ' ago'
            }`
        },
        refreshPage() {
            location.reload()
        },
    },
}
</script>