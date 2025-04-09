<template>
<div class="w-full max-w-md mx-auto">
    <div class="relative overflow-hidden" style="height: 600px;">
        <!-- Step 1: Invitation -->
        <div
            class="absolute w-full bg-white rounded-lg shadow-lg transition-all duration-500 p-6 text-black border border-gray-300"
            :style="{ transform: `translateX(${currentStep === 0 ? '0' : '-100%'})`, opacity: currentStep === 0 ? '1' : '0' }"
        >
            <div class="flex flex-col items-center text-center">
                <h1 class="text-2xl font-bold mb-4 text-black">გეპატიჟები</h1>
                <p class="mb-2 text-black">გაზაფხულზე გაზაფხულზე</p>
                <p class="mb-2 text-black">15 აპრილი, 20:00 საათი</p>
                <p class="mb-6 text-black">გაზაფხულის ქუჩა №30</p>

                <img src="/mascot.png" alt="Mascot" class="w-48 h-auto mb-8" />

                <button
                    @click="nextStep"
                    class="w-full py-3 bg-red-400 text-white rounded-full font-medium hover:bg-red-500 transition-colors border border-red-500"
                >
                    შემდეგი
                </button>
            </div>
        </div>

        <!-- Step 2: Coming or not -->
        <div
            class="absolute w-full bg-white rounded-lg shadow-lg transition-all duration-500 p-6 text-black border border-gray-300"
            :style="{ transform: `translateX(${currentStep === 1 ? '0' : currentStep < 1 ? '100%' : '-100%'})`, opacity: currentStep === 1 ? '1' : '0' }"
        >
            <div class="flex flex-col">
                <h2 class="text-xl font-bold mb-6 text-black">1. მოდიხართ თუ არა?</h2>

                <div class="space-y-3 mb-8">
                    <button
                        @click="selectOption('coming', 'კი')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.coming === 'კი' ? 'bg-red-400 text-white border-red-500' : 'bg-gray-200 text-black border-gray-300'"
                    >
                        კი
                    </button>
                    <button
                        @click="selectOption('coming', 'არა')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.coming === 'არა' ? 'bg-red-400 text-white border-red-500' : 'bg-gray-200 text-black border-gray-300'"
                    >
                        არა
                    </button>
                    <button
                        @click="selectOption('coming', 'კი, +1')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.coming === 'კი, +1' ? 'bg-red-400 text-white border-red-500' : 'bg-gray-200 text-black border-gray-300'"
                    >
                        კი, +1
                    </button>
                    <button
                        @click="selectOption('coming', 'კი, +მეტი')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.coming === 'კი, +მეტი' ? 'bg-red-400 text-white border-red-500' : 'bg-gray-200 text-black border-gray-300'"
                    >
                        კი, +მეტი
                    </button>
                </div>

                <div class="flex justify-between">
                    <button
                        @click="prevStep"
                        class="px-8 py-3 bg-gray-200 text-black rounded-full font-medium hover:bg-gray-300 transition-colors border border-gray-300"
                    >
                        დაბრუნება
                    </button>
                    <button
                        @click="nextStep"
                        class="px-8 py-3 bg-red-400 text-white rounded-full font-medium hover:bg-red-500 transition-colors border border-red-500"
                        :disabled="!form.coming"
                    >
                        შემდეგი
                    </button>
                </div>
            </div>
        </div>

        <!-- Step 2: Food preference -->
        <div
            class="absolute w-full bg-white rounded-lg shadow-lg transition-all duration-500 p-6 text-black border border-gray-300"
            :style="{ transform: `translateX(${currentStep === 2 ? '0' : currentStep < 2 ? '100%' : '-100%'})`, opacity: currentStep === 2 ? '1' : '0' }"
        >
            <div class="flex flex-col">
                <h2 class="text-xl font-bold mb-6 text-black">2. რას ჭამ?</h2>

                <div class="space-y-3 mb-8">
                    <button
                        @click="selectOption('food', 'ყველაფერს')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.food === 'ყველაფერს' ? 'bg-red-400 text-white border-red-500' : 'bg-gray-200 text-black border-gray-300'"
                    >
                        ყველაფერს
                    </button>
                    <button
                        @click="selectOption('food', 'ვეგანი ვარ')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.food === 'ვეგანი ვარ' ? 'bg-red-400 text-white border-red-500' : 'bg-gray-200 text-black border-gray-300'"
                    >
                        ვეგანი ვარ
                    </button>
                    <button
                        @click="selectOption('food', 'ვეგეტარიანელი ვარ')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.food === 'ვეგეტარიანელი ვარ' ? 'bg-red-400 text-white border-red-500' : 'bg-gray-200 text-black border-gray-300'"
                    >
                        ვეგეტარიანელი ვარ
                    </button>
                    <button
                        @click="selectOption('food', 'მარხვაზე ვარ')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.food === 'მარხვაზე ვარ' ? 'bg-red-400 text-white border-red-500' : 'bg-gray-200 text-black border-gray-300'"
                    >
                        მარხვაზე ვარ
                    </button>
                </div>

                <div class="flex justify-between">
                    <button
                        @click="prevStep"
                        class="px-8 py-3 bg-gray-200 text-black rounded-full font-medium hover:bg-gray-300 transition-colors border border-gray-300"
                    >
                        დაბრუნება
                    </button>
                    <button
                        @click="nextStep"
                        class="px-8 py-3 bg-red-400 text-white rounded-full font-medium hover:bg-red-500 transition-colors border border-red-500"
                        :disabled="!form.food"
                    >
                        შემდეგი
                    </button>
                </div>
            </div>
        </div>

        <!-- Step 3: Drink Preference -->
        <div
            class="absolute w-full bg-white rounded-lg shadow-lg transition-all duration-500 p-6 text-black border border-gray-300"
            :style="{ transform: `translateX(${currentStep === 3 ? '0' : currentStep < 3 ? '100%' : '-100%'})`, opacity: currentStep === 3 ? '1' : '0' }"
        >
            <div class="flex flex-col">
                <h2 class="text-xl font-bold mb-6 text-black">3. რას დალევ?</h2>

                <div class="space-y-3 mb-8">
                    <button
                        @click="selectOption('drink', 'ღვინო')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.drink === 'ღვინო' ? 'bg-red-400 text-white border-red-500' : 'bg-gray-200 text-black border-gray-300'"
                    >
                        ღვინო
                    </button>
                    <button
                        @click="selectOption('drink', 'ლუდი')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.drink === 'ლუდი' ? 'bg-red-400 text-white border-red-500' : 'bg-gray-200 text-black border-gray-300'"
                    >
                        ლუდი
                    </button>
                    <button
                        @click="selectOption('drink', 'არაყი')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.drink === 'არაყი' ? 'bg-red-400 text-white border-red-500' : 'bg-gray-200 text-black border-gray-300'"
                    >
                        არაყი
                    </button>
                    <button
                        @click="selectOption('drink', 'არ ვსვავ')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.drink === 'არ ვსვავ' ? 'bg-red-400 text-white border-red-500' : 'bg-gray-200 text-black border-gray-300'"
                    >
                        არ ვსვავ
                    </button>
                    <button
                        @click="selectOption('drink', 'სხვა')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.drink === 'სხვა' ? 'bg-red-400 text-white border-red-500' : 'bg-gray-200 text-black border-gray-300'"
                    >
                        სხვა
                    </button>
                    <button
                        @click="selectOption('drink', 'ჩემით მოვიტან')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.drink === 'ჩემით მოვიტან' ? 'bg-red-400 text-white border-red-500' : 'bg-gray-200 text-black border-gray-300'"
                    >
                        ჩემით მოვიტან
                    </button>
                </div>

                <div class="flex justify-between">
                    <button
                        @click="prevStep"
                        class="px-8 py-3 bg-gray-200 text-black rounded-full font-medium hover:bg-gray-300 transition-colors border border-gray-300"
                    >
                        დაბრუნება
                    </button>
                    <button
                        @click="nextStep"
                        class="px-8 py-3 bg-red-400 text-white rounded-full font-medium hover:bg-red-500 transition-colors border border-red-500"
                        :disabled="!form.drink"
                    >
                        შემდეგი
                    </button>
                </div>
            </div>
        </div>

        <!-- Step 4: Music Preference -->
        <div
            class="absolute w-full bg-white rounded-lg shadow-lg transition-all duration-500 p-6 text-black border border-gray-300"
            :style="{ transform: `translateX(${currentStep === 4 ? '0' : currentStep < 4 ? '100%' : '-100%'})`, opacity: currentStep === 4 ? '1' : '0' }"
        >
            <div class="flex flex-col">
                <h2 class="text-xl font-bold mb-6 text-black">4. მუსიკა?</h2>

                <div class="space-y-3 mb-8">
                    <button
                        @click="selectOption('music', 'ქართულები და ჩქარები')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.music === 'ქართულები და ჩქარები' ? 'bg-red-400 text-white border-red-500' : 'bg-gray-200 text-black border-gray-300'"
                    >
                        ქართულები და ჩქარები
                    </button>
                    <button
                        @click="selectOption('music', 'პოპი')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.music === 'პოპი' ? 'bg-red-400 text-white border-red-500' : 'bg-gray-200 text-black border-gray-300'"
                    >
                        პოპი
                    </button>
                    <button
                        @click="selectOption('music', 'ჰაუსი')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.music === 'ჰაუსი' ? 'bg-red-400 text-white border-red-500' : 'bg-gray-200 text-black border-gray-300'"
                    >
                        ჰაუსი
                    </button>
                    <button
                        @click="selectOption('music', 'კლასიკა')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.music === 'კლასიკა' ? 'bg-red-400 text-white border-red-500' : 'bg-gray-200 text-black border-gray-300'"
                    >
                        კლასიკა
                    </button>
                    <button
                        @click="selectOption('music', 'რეპი')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.music === 'რეპი' ? 'bg-red-400 text-white border-red-500' : 'bg-gray-200 text-black border-gray-300'"
                    >
                        რეპი
                    </button>
                    <button
                        @click="selectOption('music', 'სულერთია')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.music === 'სულერთია' ? 'bg-red-400 text-white border-red-500' : 'bg-gray-200 text-black border-gray-300'"
                    >
                        სულერთია
                    </button>
                </div>

                <div class="flex justify-between">
                    <button
                        @click="prevStep"
                        class="px-8 py-3 bg-gray-200 text-black rounded-full font-medium hover:bg-gray-300 transition-colors border border-gray-300"
                    >
                        დაბრუნება
                    </button>
                    <button
                        @click="nextStep"
                        class="px-8 py-3 bg-red-400 text-white rounded-full font-medium hover:bg-red-500 transition-colors border border-red-500"
                        :disabled="!form.music"
                    >
                        შემდეგი
                    </button>
                </div>
            </div>
        </div>

        <!-- Step 5: Extra Comments -->
        <div
            class="absolute w-full bg-white rounded-lg shadow-lg transition-all duration-500 p-6 text-black border border-gray-300"
            :style="{ transform: `translateX(${currentStep === 5 ? '0' : currentStep < 5 ? '100%' : '-100%'})`, opacity: currentStep === 5 ? '1' : '0' }"
        >
            <div class="flex flex-col">
                <h2 class="text-xl font-bold mb-6 text-black">5. შეკვეთა დიჯეისთან მთვრალზე</h2>

                <div class="mb-8">
            <textarea
                v-model="form.extra"
                class="w-full p-4 border border-gray-300 rounded-lg text-black bg-white"
                rows="5"
                placeholder="შეიყვანეთ მუსიკის ლინკი/სახელი"
            ></textarea>
                </div>

                <div class="flex justify-between">
                    <button
                        @click="prevStep"
                        class="px-8 py-3 bg-gray-200 text-black rounded-full font-medium hover:bg-gray-300 transition-colors border border-gray-300"
                    >
                        დაბრუნება
                    </button>
                    <button
                        @click="submitForm"
                        class="px-8 py-3 bg-red-400 text-white rounded-full font-medium hover:bg-red-500 transition-colors border border-red-500"
                        :disabled="isSubmitting"
                    >
                        {{ isSubmitting ? 'შენახვა...' : 'შენახვა' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Step 6: Confirmation -->
        <div
            class="absolute w-full bg-white rounded-lg shadow-lg transition-all duration-500 p-6 text-black border border-gray-300"
            :style="{ transform: `translateX(${currentStep === 6 ? '0' : currentStep < 6 ? '100%' : '-100%'})`, opacity: currentStep === 6 ? '1' : '0' }"
        >
            <div class="flex flex-col items-center text-center">
                <h1 class="text-2xl font-bold mb-4 text-black">რეკომენდაცია!</h1>

                <img src="/mascot-head.png" alt="Mascot Head" class="w-48 h-auto mb-4" />

                <p class="mb-8 text-lg text-black">შემდეგ დღეს აიღეთ Dayoff-ი!</p>

                <button
                    @click="nextStep"
                    class="w-full py-3 bg-gray-200 text-black rounded-full font-medium hover:bg-gray-300 transition-colors"
                >
                    შემდეგი
                </button>
            </div>
        </div>

        <!-- Last step: Finish -->
        <div
            class="absolute w-full bg-white rounded-lg shadow-lg transition-all duration-500 p-6 text-black border border-gray-300"
            :style="{ transform: `translateX(${currentStep === 7 ? '0' : currentStep < 7 ? '100%' : '-100%'})`, opacity: currentStep === 7 ? '1' : '0' }"
        >
            <div class="flex flex-col items-center text-center">
                <h1 class="text-2xl font-bold mb-4 text-black">გელოდები</h1>
                <p class="mb-2 text-black">15 აპრილი, 20:00 საათი</p>
                <p class="mb-6 text-black">გაზაფხულის ქუჩა №30</p>

                <img src="/mascot-smile.png" alt="Mascot" class="w-48 h-auto mb-8" />
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
            if (this.currentStep < 8) {
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
                this.isSubmitting = true;

                // Prepare the data to send to the server
                const dataToSend = {
                    coming: this.form.coming,
                    food: this.form.food,
                    drink: this.form.drink || '', // Using empty string as fallback
                    music: this.form.music || '', // Using empty string as fallback
                    extra: this.form.extra || ''  // Using empty string as fallback
                };

                // Send the data to the server
                const response = await fetch('/api/submit-rsvp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                });

                const result = await response.json();

                if (result.success) {
                    // Just move to the confirmation step on success
                    this.nextStep();
                } else {
                    console.error('Error submitting RSVP:', result.error);
                    // Still move to confirmation page even if there's an error
                    // You could add error handling here if needed
                    this.nextStep();
                }
            } catch (error) {
                console.error('Error:', error);
                // Still move to confirmation page even if there's an error
                this.nextStep();
            } finally {
                this.isSubmitting = false;
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