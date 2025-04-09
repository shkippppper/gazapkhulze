<template>
<div class="w-full max-w-md mx-auto">
    <div class="relative overflow-hidden" style="height: 600px;">
        <!-- Step 1: Invitation -->
        <div
            class="absolute w-full bg-white rounded-lg shadow-lg transition-all duration-500 p-6 text-black"
            :style="{ transform: `translateX(${currentStep === 0 ? '0' : '-100%'})`, opacity: currentStep === 0 ? '1' : '0' }"
        >
            <div class="flex flex-col items-center text-center">
                <h1 class="text-2xl font-bold mb-4 text-black">ვეპატიჟები</h1>
                <p class="mb-2 text-black">ვაჟაფშაველაზე ვაჟაფშაველაზე</p>
                <p class="mb-2 text-black">15 აპრილი, 19:00 საათი</p>
                <p class="mb-6 text-black">ვაჟაფშაველას ქუჩა №30</p>

                <img src="/mascot.png" alt="Mascot" class="w-48 h-auto mb-8" />

                <button
                    @click="nextStep"
                    class="w-full py-3 bg-red-400 text-white rounded-full font-medium hover:bg-red-500 transition-colors"
                >
                    შემდეგი
                </button>
            </div>
        </div>

        <!-- Step 2: Coming or not -->
        <div
            class="absolute w-full bg-white rounded-lg shadow-lg transition-all duration-500 p-6 text-black"
            :style="{ transform: `translateX(${currentStep === 1 ? '0' : currentStep < 1 ? '100%' : '-100%'})`, opacity: currentStep === 1 ? '1' : '0' }"
        >
            <div class="flex flex-col">
                <h2 class="text-xl font-bold mb-6 text-black">1. მოხვალთ თუ არა?</h2>

                <div class="space-y-3 mb-8">
                    <button
                        @click="selectOption('coming', 'კი')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors"
                        :class="form.coming === 'კი' ? 'bg-red-400 text-white' : 'bg-gray-200 text-black'"
                    >
                        კი
                    </button>
                    <button
                        @click="selectOption('coming', 'არა')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors"
                        :class="form.coming === 'არა' ? 'bg-red-400 text-white' : 'bg-gray-200 text-black'"
                    >
                        არა
                    </button>
                    <button
                        @click="selectOption('coming', 'კი, +1')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors"
                        :class="form.coming === 'კი, +1' ? 'bg-red-400 text-white' : 'bg-gray-200 text-black'"
                    >
                        კი, +1
                    </button>
                    <button
                        @click="selectOption('coming', 'კი, +მეტი')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors"
                        :class="form.coming === 'კი, +მეტი' ? 'bg-red-400 text-white' : 'bg-gray-200 text-black'"
                    >
                        კი, +მეტი
                    </button>
                </div>

                <div class="flex justify-between">
                    <button
                        @click="prevStep"
                        class="px-8 py-3 bg-gray-200 text-black rounded-full font-medium hover:bg-gray-300 transition-colors"
                    >
                        დაბრუნება
                    </button>
                    <button
                        @click="nextStep"
                        class="px-8 py-3 bg-red-400 text-white rounded-full font-medium hover:bg-red-500 transition-colors"
                        :disabled="!form.coming"
                    >
                        შემდეგი
                    </button>
                </div>
            </div>
        </div>

        <!-- Step 3: Food Preference -->
        <div
            class="absolute w-full bg-white rounded-lg shadow-lg transition-all duration-500 p-6 text-black"
            :style="{ transform: `translateX(${currentStep === 2 ? '0' : currentStep < 2 ? '100%' : '-100%'})`, opacity: currentStep === 2 ? '1' : '0' }"
        >
            <div class="flex flex-col">
                <h2 class="text-xl font-bold mb-6 text-black">2. რას ჭამ?</h2>

                <div class="space-y-3 mb-8">
                    <button
                        @click="selectOption('food', 'ყველაფერს')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors"
                        :class="form.food === 'ყველაფერს' ? 'bg-red-400 text-white' : 'bg-gray-200 text-black'"
                    >
                        ყველაფერს
                    </button>
                    <button
                        @click="selectOption('food', 'ხორცი არა')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors"
                        :class="form.food === 'ხორცი არა' ? 'bg-red-400 text-white' : 'bg-gray-200 text-black'"
                    >
                        ხორცი არა
                    </button>
                    <button
                        @click="selectOption('food', 'ვეგეტარიანული ვარ')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors"
                        :class="form.food === 'ვეგეტარიანული ვარ' ? 'bg-red-400 text-white' : 'bg-gray-200 text-black'"
                    >
                        ვეგეტარიანული ვარ
                    </button>
                    <button
                        @click="selectOption('food', 'მხოლოდ პურ')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors"
                        :class="form.food === 'მხოლოდ პურ' ? 'bg-red-400 text-white' : 'bg-gray-200 text-black'"
                    >
                        მხოლოდ პურ
                    </button>
                </div>

                <div class="flex justify-between">
                    <button
                        @click="prevStep"
                        class="px-8 py-3 bg-gray-200 text-black rounded-full font-medium hover:bg-gray-300 transition-colors"
                    >
                        დაბრუნება
                    </button>
                    <button
                        @click="submitForm"
                        class="px-8 py-3 bg-red-400 text-white rounded-full font-medium hover:bg-red-500 transition-colors"
                        :disabled="!form.food"
                    >
                        შემდეგი
                    </button>
                </div>
            </div>
        </div>

        <!-- Step 4: Confirmation -->
        <div
            class="absolute w-full bg-white rounded-lg shadow-lg transition-all duration-500 p-6 text-black"
            :style="{ transform: `translateX(${currentStep === 3 ? '0' : '100%'})`, opacity: currentStep === 3 ? '1' : '0' }"
        >
            <div class="flex flex-col items-center text-center">
                <h1 class="text-2xl font-bold mb-4 text-black">რეგისტრაცია!</h1>

                <img src="/mascot-head.png" alt="Mascot Head" class="w-48 h-auto mb-4" />

                <p class="mb-8 text-lg text-black">შემდეგ დღეს აიღე Dayoff-ი!</p>

                <button
                    @click="resetForm"
                    class="w-full py-3 bg-gray-200 text-black rounded-full font-medium hover:bg-gray-300 transition-colors"
                >
                    მთავარი გვერდზება
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            currentStep: 0,
            form: {
                coming: '',
                food: '',
                drink: '',
                music: '',
                extra: ''
            },
            isSubmitting: false
        }
    },
    methods: {
        nextStep() {
            if (this.currentStep < 3) {
                this.currentStep++
            }
        },
        prevStep() {
            if (this.currentStep > 0) {
                this.currentStep--
            }
        },
        selectOption(field, value) {
            this.form[field] = value
        },
        async submitForm() {
            try {
                // Store the selected options in localStorage instead of sending to server
                localStorage.setItem('rsvp-data', JSON.stringify(this.form))

                // For now, just move to the confirmation step
                this.nextStep()
            } catch (error) {
                console.error('Error:', error)
            }
        },
        resetForm() {
            this.currentStep = 0
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