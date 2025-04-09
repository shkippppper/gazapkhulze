<template>
<div class="w-full max-w-xl p-12 mx-auto mt-8 rounded-lg shadow-xl dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg">
    <h2 class="mb-6 text-xl font-semibold">Submit RSVP</h2>

    <div v-if="message" :class="['p-4 mb-4 rounded', success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
        {{ message }}
    </div>

    <form @submit.prevent="submitRsvp" class="space-y-4">
        <div>
            <label class="block mb-2 text-sm font-medium">Are you coming?</label>
            <select v-model="form.coming" class="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700">
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
            </select>
        </div>

        <div>
            <label class="block mb-2 text-sm font-medium">Food Preference</label>
            <input type="text" v-model="form.food" class="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" placeholder="E.g., Vegetarian, Vegan, etc.">
        </div>

        <div>
            <label class="block mb-2 text-sm font-medium">Drink Preference</label>
            <input type="text" v-model="form.drink" class="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" placeholder="E.g., Wine, Beer, etc.">
        </div>

        <div>
            <label class="block mb-2 text-sm font-medium">Music Preference</label>
            <input type="text" v-model="form.music" class="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" placeholder="E.g., Rock, Jazz, etc.">
        </div>

        <div>
            <label class="block mb-2 text-sm font-medium">Extra Information</label>
            <textarea v-model="form.extra" class="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" rows="3" placeholder="Any additional information..."></textarea>
        </div>

        <button type="submit" class="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700" :disabled="isSubmitting">
            {{ isSubmitting ? 'Submitting...' : 'Submit RSVP' }}
        </button>
    </form>
</div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                coming: '',
                food: '',
                drink: '',
                music: '',
                extra: ''
            },
            isSubmitting: false,
            success: false,
            message: ''
        }
    },
    methods: {
        async submitRsvp() {
            if (!this.form.coming) {
                this.success = false
                this.message = 'Please indicate if you are coming'
                return
            }

            this.isSubmitting = true
            this.message = ''

            try {
                const response = await fetch('/api/submit-rsvp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.form)
                })

                const result = await response.json()

                if (result.success) {
                    this.success = true
                    this.message = 'RSVP submitted successfully!'
                    this.resetForm()
                    this.$emit('rsvp-submitted')
                } else {
                    this.success = false
                    this.message = result.error || 'Failed to submit RSVP'
                }
            } catch (error) {
                console.error('Error:', error)
                this.success = false
                this.message = 'An error occurred while submitting'
            } finally {
                this.isSubmitting = false
            }
        },
        resetForm() {
            this.form = {
                coming: '',
                food: '',
                drink: '',
                music: '',
                extra: ''
            }
        }
    }
}
</script>