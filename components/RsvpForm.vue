<template>
  <div class="w-full max-w-md mx-auto relative z-10">
    <div class="snow-canvas-wrapper">
      <canvas ref="snowCanvas"></canvas>
    </div>

    <div v-if="showTimer" class="mb-4 text-center">
        <div class="bg-red-400 text-white rounded-full py-2 px-4 inline-block shadow-lg">
            <p class="text-sm font-medium mb-1">ბალის ჩამოსვლამდე:</p>
            <p class="text-lg font-bold">{{ timeRemaining }}</p>
        </div>
    </div>
    <div class="relative overflow-hidden" style="height: 550px;">
        <!-- Step 1: Invitation -->

        <div
            class="absolute w-full bg-[#f8f8f8] rounded-[20px] shadow-lg transition-all duration-500 p-6 text-black"
            :style="{ transform: `translateX(${currentStep === 0 ? '0' : '-100%'})`, opacity: currentStep === 0 ? '1' : '0' }"
        >
            <div class="flex flex-col items-center text-center">
                <h1 class="text-2xl font-bold mb-4 text-black">გეპატიჟები</h1>
                <p class="text-xl font-bold mb-4 text-black">საახალწლო გაზაფხულზე</p>
                <p class="mb-2 text-black">1 იანვარი, 02:00 საათი</p>
                <p class="mb-6 text-black">გაზაფხულის ქუჩა №30</p>

                <img src="/mascot.png" alt="Mascot" class="w-48 h-auto mb-8" />

                <button
                    @click="nextStep"
                    class="w-full py-3 bg-cyan-400 text-white rounded-full font-medium hover:bg-cyan-500 transition-colors border "
                >
                    შემდეგი გვერდი
                </button>
            </div>
        </div>

        <div
            class="absolute w-full bg-[#f8f8f8] rounded-[20px] shadow-lg transition-all duration-500 p-6 text-black"
            :style="{ transform: `translateX(${currentStep === 1 ? '0' : currentStep < 1 ? '100%' : '-100%'})`, opacity: currentStep === 1 ? '1' : '0' }"
        >
            <div class="flex flex-col">
                <h2 class="text-xl font-bold mb-6 text-black">1. რომელი ხარ?</h2>

                <div class="w-full mb-4">
                    <input
                        v-model="form.name"
                        type="text"
                        placeholder="სახელი"
                        class="w-full p-3 mb-3 border border-gray-300 rounded-full text-black bg-[#f8f8f8]"
                    />
                    <input
                        v-model="form.surname"
                        type="text"
                        placeholder="გვარი"
                        class="w-full p-3 border border-gray-300 rounded-full text-black bg-[#f8f8f8]"
                    />
                </div>

                <div class="flex justify-between">
                    <button
                        @click="prevStep"
                        class="px-8 py-3 bg-gray-200 text-black rounded-full font-medium hover:bg-gray-300 transition-colors border "
                    >
                        დაბრუნება
                    </button>
                    <button
                        @click="nextStep"
                        class="px-8 py-3 bg-cyan-400 text-white rounded-full font-medium hover:bg-cyan-500 transition-colors border "
                        :disabled="!form.surname || !form.name"
                    >
                        შემდეგი
                    </button>
                </div>
            </div>
        </div>

        <!-- Step 2: Coming or not -->
        <div
            class="absolute w-full bg-[#f8f8f8] rounded-[20px] shadow-lg transition-all duration-500 p-6 text-black"
            :style="{ transform: `translateX(${currentStep === 2 ? '0' : currentStep < 2 ? '100%' : '-100%'})`, opacity: currentStep === 2 ? '1' : '0' }"
        >
            <div class="flex flex-col">
                <h2 class="text-xl font-bold mb-6 text-black">2. მოდიხარ თუ არა?</h2>

                <div class="space-y-3 mb-8">
                    <button
                        @click="selectOption('coming', 'კი')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.coming === 'კი' ? 'bg-red-500 text-white ' : 'bg-gray-200 text-black '"
                    >
                        კი
                    </button>
                    <button
                        @click="selectOption('coming', 'არა')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.coming === 'არა' ? 'bg-red-500 text-white ' : 'bg-gray-200 text-black '"
                    >
                        არა
                    </button>
                    <button
                        @click="selectOption('coming', 'კი, +1')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.coming === 'კი, +1' ? 'bg-red-500 text-white ' : 'bg-gray-200 text-black '"
                    >
                        კი, +1
                    </button>
                </div>

                <div class="flex justify-between">
                    <button
                        @click="prevStep"
                        class="px-8 py-3 bg-gray-200 text-black rounded-full font-medium hover:bg-gray-300 transition-colors border "
                    >
                        დაბრუნება
                    </button>
                    <button
                        @click="nextStep"
                        class="px-8 py-3 bg-red-400 text-white rounded-full font-medium hover:bg-red-500 transition-colors border "
                        :disabled="!form.coming"
                    >
                        შემდეგი
                    </button>
                </div>
            </div>
        </div>

        <!-- Step 2: Food preference -->
        <div
            class="absolute w-full bg-[#f8f8f8] rounded-[20px] shadow-lg transition-all duration-500 p-6 text-black"
            :style="{ transform: `translateX(${currentStep === 3 ? '0' : currentStep < 3 ? '100%' : '-100%'})`, opacity: currentStep === 3 ? '1' : '0' }"
        >
            <div class="flex flex-col">
                <h2 class="text-xl font-bold mb-6 text-black">3. რას ჭამ?</h2>

                <div class="space-y-3 mb-8">
                    <button
                        @click="selectOption('food', 'ყველაფერს')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.food === 'ყველაფერს' ? 'bg-red-500 text-white ' : 'bg-gray-200 text-black '"
                    >
                        ყველაფერს
                    </button>
                    <button
                        @click="selectOption('food', 'ვეგანი ვარ')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.food === 'ვეგანი ვარ' ? 'bg-red-500 text-white ' : 'bg-gray-200 text-black '"
                    >
                        ვეგანი ვარ
                    </button>
                    <button
                        @click="selectOption('food', 'ვეგეტარიანელი ვარ')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.food === 'ვეგეტარიანელი ვარ' ? 'bg-red-500 text-white ' : 'bg-gray-200 text-black '"
                    >
                        ვეგეტარიანელი ვარ
                    </button>
                    <button
                        @click="selectOption('food', 'მარხვაზე ვარ')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.food === 'მარხვაზე ვარ' ? 'bg-red-500 text-white ' : 'bg-gray-200 text-black '"
                    >
                        მარხვაზე ვარ
                    </button>
                </div>

                <div class="flex justify-between">
                    <button
                        @click="prevStep"
                        class="px-8 py-3 bg-gray-200 text-black rounded-full font-medium hover:bg-gray-300 transition-colors border "
                    >
                        დაბრუნება
                    </button>
                    <button
                        @click="nextStep"
                        class="px-8 py-3 bg-red-400 text-white rounded-full font-medium hover:bg-red-500 transition-colors border "
                        :disabled="!form.food"
                    >
                        შემდეგი
                    </button>
                </div>
            </div>
        </div>

        <!-- Step 3: Drink Preference -->
        <div
            class="absolute w-full bg-[#f8f8f8] rounded-[20px] shadow-lg transition-all duration-500 p-6 text-black"
            :style="{ transform: `translateX(${currentStep === 4 ? '0' : currentStep < 4 ? '100%' : '-100%'})`, opacity: currentStep === 4 ? '1' : '0' }"
        >
            <div class="flex flex-col">
                <h2 class="text-xl font-bold mb-6 text-black">4. რას დალევ?</h2>

                <div class="space-y-3 mb-8">
                    <button
                        @click="selectOption('drink', 'ღვინო')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.drink === 'ღვინო' ? 'bg-red-500 text-white ' : 'bg-gray-200 text-black '"
                    >
                        ღვინო
                    </button>
                    <button
                        @click="selectOption('drink', 'ლუდი')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.drink === 'ლუდი' ? 'bg-red-500 text-white ' : 'bg-gray-200 text-black '"
                    >
                        ლუდი
                    </button>
                    <button
                        @click="selectOption('drink', 'არაყი')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.drink === 'არაყი' ? 'bg-red-500 text-white ' : 'bg-gray-200 text-black '"
                    >
                        არაყი
                    </button>
                    <button
                        @click="selectOption('drink', 'არ ვსვავ')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.drink === 'არ ვსვავ' ? 'bg-red-500 text-white ' : 'bg-gray-200 text-black '"
                    >
                        არ ვსვავ
                    </button>
                    <button
                        @click="selectOption('drink', 'ჩემით მოვიტან')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.drink === 'ჩემით მოვიტან' ? 'bg-red-500 text-white ' : 'bg-gray-200 text-black '"
                    >
                        ჩემით მოვიტან
                    </button>
                </div>

                <div class="flex justify-between">
                    <button
                        @click="prevStep"
                        class="px-8 py-3 bg-gray-200 text-black rounded-full font-medium hover:bg-gray-300 transition-colors border "
                    >
                        დაბრუნება
                    </button>
                    <button
                        @click="nextStep"
                        class="px-8 py-3 bg-red-400 text-white rounded-full font-medium hover:bg-red-500 transition-colors border "
                        :disabled="!form.drink"
                    >
                        შემდეგი
                    </button>
                </div>
            </div>
        </div>

        <!-- Step 4: Music Preference -->
        <div
            class="absolute w-full bg-[#f8f8f8] rounded-[20px] shadow-lg transition-all duration-500 p-6 text-black"
            :style="{ transform: `translateX(${currentStep === 5 ? '0' : currentStep < 5 ? '100%' : '-100%'})`, opacity: currentStep === 5 ? '1' : '0' }"
        >
            <div class="flex flex-col">
                <h2 class="text-xl font-bold mb-6 text-black">5. მუსიკა?</h2>

                <div class="space-y-3 mb-8">
                    <button
                        @click="selectOption('music', 'ქართულები და ჩქარები')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.music === 'ქართულები და ჩქარები' ? 'bg-red-500 text-white ' : 'bg-gray-200 text-black '"
                    >
                        ქართულები და ჩქარები
                    </button>
                    <button
                        @click="selectOption('music', 'პოპი')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.music === 'პოპი' ? 'bg-red-500 text-white ' : 'bg-gray-200 text-black '"
                    >
                        პოპი
                    </button>
                    <button
                        @click="selectOption('music', 'ჰაუსი')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.music === 'ჰაუსი' ? 'bg-red-500 text-white ' : 'bg-gray-200 text-black '"
                    >
                        ჰაუსი
                    </button>
                    <button
                        @click="selectOption('music', 'დისკო')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.music === 'დისკო' ? 'bg-red-500 text-white ' : 'bg-gray-200 text-black '"
                    >
                        დისკო
                    </button>
                    <button
                        @click="selectOption('music', 'რეპი')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.music === 'რეპი' ? 'bg-red-500 text-white ' : 'bg-gray-200 text-black '"
                    >
                        რეპი
                    </button>
                    <button
                        @click="selectOption('music', 'სულერთია')"
                        class="w-full py-3 rounded-full font-medium text-center transition-colors border"
                        :class="form.music === 'სულერთია' ? 'bg-red-500 text-white ' : 'bg-gray-200 text-black '"
                    >
                        სულერთია
                    </button>
                </div>

                <div class="flex justify-between">
                    <button
                        @click="prevStep"
                        class="px-8 py-3 bg-gray-200 text-black rounded-full font-medium hover:bg-gray-300 transition-colors border "
                    >
                        დაბრუნება
                    </button>
                    <button
                        @click="nextStep"
                        class="px-8 py-3 bg-red-400 text-white rounded-full font-medium hover:bg-red-500 transition-colors border "
                        :disabled="!form.music"
                    >
                        შემდეგი
                    </button>
                </div>
            </div>
        </div>

        <!-- Step 5: Extra Comments -->
        <div
            class="absolute w-full bg-[#f8f8f8] rounded-[20px] shadow-lg transition-all duration-500 p-6 text-black"
            :style="{ transform: `translateX(${currentStep === 6 ? '0' : currentStep < 6 ? '100%' : '-100%'})`, opacity: currentStep === 6 ? '1' : '0' }"
        >
            <div class="flex flex-col">
                <h2 class="text-xl font-bold mb-6 text-black">6. შეკვეთა დიჯეისთან მთვრალზე</h2>

                <div class="mb-8">
            <textarea
                v-model="form.extra"
                class="w-full p-4 border  rounded-[20px] text-black bg-[#f8f8f8]"
                rows="5"
                placeholder="შეიყვანეთ მუსიკის ლინკი/სახელი"
            ></textarea>
                </div>

                <div class="flex justify-between">
                    <button
                        @click="prevStep"
                        class="px-8 py-3 bg-gray-200 text-black rounded-full font-medium hover:bg-gray-300 transition-colors border "
                    >
                        დაბრუნება
                    </button>
                    <button
                        @click="submitForm(false)"
                        class="px-8 py-3 bg-red-400 text-white rounded-full font-medium hover:bg-red-500 transition-colors border "
                        :disabled="isSubmitting"
                    >
                        {{ isSubmitting ? 'შენახვა...' : 'შენახვა' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Step 6: Confirmation -->
        <div
            class="absolute w-full bg-[#f8f8f8] rounded-[20px] shadow-lg transition-all duration-500 p-6 text-black"
            :style="{ transform: `translateX(${currentStep === 7 ? '0' : currentStep < 7 ? '100%' : '-100%'})`, opacity: currentStep === 7 ? '1' : '0' }"
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
            class="absolute w-full bg-[#f8f8f8] rounded-[20px] shadow-lg transition-all duration-500 p-6 text-black"
            :style="{ transform: `translateX(${currentStep === 8 ? '0' : currentStep < 8 ? '100%' : '-100%'})`, opacity: currentStep === 8 ? '1' : '0' }"
        >
            <div class="flex flex-col items-center text-center">
                <h1 class="text-2xl font-bold mb-4 text-black">გელოდები</h1>
                <p class="mb-2 text-black">1 იანვარი, 02:00 საათი</p>
                <p class="mb-6 text-black">გაზაფხულის ქუჩა №30</p>

                <img src="/mascot-smile.png" alt="Mascot" class="w-32 h-auto mb-8" />

                <!-- GIF that plays once then gets replaced -->

                <img
                    v-show="!gifFinished"
                    src="/mascot-animation.gif"
                    alt="Animation"
                    class="absolute h-auto stamp"
                    ref="gif"
                />

                <!-- Static image that replaces the GIF - with absolute positioning -->
                <img
                    v-show="gifLoaded && showStamp"
                    src="/mascot-red.png"
                    alt="Mascot"
                    class="absolute h-auto mascot-red"
                />
            </div>
        </div>

        <!-- No Step -->

        <div
            class="absolute w-full bg-[#f8f8f8] rounded-[20px] shadow-lg transition-all duration-500 p-6 text-black"
            :style="{ transform: `translateX(${currentStep === 9 ? '0' : currentStep < 9 ? '100%' : '-100%'})`, opacity: currentStep === 9 ? '1' : '0' }"
        >
            <div class="flex flex-col items-center text-center">
                <h1 class="text-2xl font-bold mb-4 text-black">რას ნიშნავს არ მოდიხარ?!</h1>

                <img src="/mascot-angry.png" alt="Mascot" class="w-48 h-auto mb-8" />

                <button
                    @click="goBackToForm"
                    class="w-full py-3 bg-red-400 text-white rounded-full font-medium hover:bg-red-500 transition-colors border "
                >
                    გადავიფიქრე
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
          snowflakes: [],
          snowCtx: null,
          snowWidth: 0,
          snowHeight: 0,
          snowAnimationId: null,
          windStrength: 0.6, // 🌬 stronger = more drift
          snowDensity: 120, // ❄️ increase / decrease snow amount

          currentStep: 0,
            gifLoaded: false,
            gifFinished: true,
            form: {
                name: '',
                surname: '',
                coming: '',
                food: '',
                drink: '',
                music: '',
                extra: ''
            },
            isSubmitting: false,
            showStamp: false,
            timeRemaining: '',
            showTimer: false,
            timerInterval: null
        }
    },
    mounted() {
      this.initSnow();
      window.addEventListener('resize', this.resizeSnowCanvas);
      this.updateTimer();
        this.timerInterval = setInterval(this.updateTimer, 1000);
    },
    beforeUnmount() {
      cancelAnimationFrame(this.snowAnimationId);
      window.removeEventListener('resize', this.resizeSnowCanvas);
      if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    },
    methods: {
        updateTimer() {
            const now = new Date();
            const targetDate = new Date('2025-10-08T05:00:00');
            
            const difference = targetDate - now;
            
            if (difference <= 0) {
                this.showTimer = false;
                if (this.timerInterval) {
                    clearInterval(this.timerInterval);
                }
                return;
            } else {
                this.showTimer = true
            }
            
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            this.timeRemaining = `${days} დღე ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        },
        nextStep() {
            if (this.form.coming === "არა" && this.currentStep === 2) {
                this.currentStep = 9
                this.submitForm(true)
                return
            }


          if (this.currentStep === 5 || this.currentStep === 6) {
            this.currentStep = 7
          }

            if (this.currentStep < 10) {
                this.currentStep++
            }
            if (this.currentStep === 8) {

                setTimeout(() => {
                    this.gifFinished = false;
                    this.gifLoaded = true

                    setTimeout(() => {
                        this.showStamp = true;
                    }, 450);

                    setTimeout(() => {
                        this.gifFinished = true;
                    }, 800);
                }, 700);
            }
        },
        prevStep() {
            if (this.currentStep > 0) {
                this.currentStep--
            }
        },
        goBackToForm() {
            this.currentStep = 2
        },
        selectOption(field, value) {
            this.form[field] = value
        },
        async submitForm(skipNextStep = false) {
            try {
                this.isSubmitting = true;

                // Prepare the data to send to the server
                const dataToSend = {
                    name: this.form.name || '',
                    surname: this.form.surname || '',
                    coming: this.form.coming,
                    food: this.form.food,
                    drink: this.form.drink || '',
                    music: this.form.music || '',
                    extra: this.form.extra || ''
                };

                console.log('Sending data to server:', JSON.stringify(dataToSend, null, 2));

                // Send the data to the server
                const response = await fetch('/api/submit-rsvp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                });

                const result = await response.json();
                console.log('Server response:', JSON.stringify(result, null, 2));

                if (result.success) {
                    console.log('RSVP submitted successfully with ID:', result.id);
                    if (!skipNextStep) this.nextStep();
                } else {
                    console.error('Error from server:', result.error);
                    // Still move to confirmation page even if there's an error
                    if (!skipNextStep) this.nextStep();
                }
            } catch (error) {
                console.error('Exception during submission:', error);
                console.error('Error message:', error.message);
                console.error('Error stack:', error.stack);
                // Still move to confirmation page even if there's an error
                if (!skipNextStep) this.nextStep();
            } finally {
                this.isSubmitting = false;
            }
        },
      initSnow() {
        const canvas = this.$refs.snowCanvas;
        this.snowCtx = canvas.getContext('2d');

        this.resizeSnowCanvas();

        // Create snowflakes
        this.snowflakes = Array.from({ length: this.snowDensity }, () =>
            this.createSnowflake()
        );

        this.animateSnow();
      },

      resizeSnowCanvas() {
        const canvas = this.$refs.snowCanvas;
        this.snowWidth = canvas.width = window.innerWidth;
        this.snowHeight = canvas.height = window.innerHeight;
      },

      createSnowflake() {
        return {
          x: Math.random() * this.snowWidth,
          y: Math.random() * this.snowHeight,
          radius: Math.random() * 2 + 1,
          speedY: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * this.windStrength,
          drift: Math.random() * 0.6 + 0.2
        };
      },

      animateSnow() {
        const ctx = this.snowCtx;
        ctx.clearRect(0, 0, this.snowWidth, this.snowHeight);

        for (const flake of this.snowflakes) {
          flake.y += flake.speedY;
          flake.x += flake.speedX + Math.sin(flake.y * 0.01) * flake.drift;

          if (flake.y > this.snowHeight) {
            Object.assign(flake, this.createSnowflake(), { y: -5 });
          }

          if (flake.x > this.snowWidth) flake.x = 0;
          if (flake.x < 0) flake.x = this.snowWidth;

          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.fill();
        }

        this.snowAnimationId = requestAnimationFrame(this.animateSnow);
      },

    }
}
</script>

<style scoped>
.snow-canvas-wrapper {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

canvas {
  width: 100%;
  height: 100%;
}
.relative {
  z-index: 1;
}

.mascot-red {
    width: 120px;
    top: 240px;
    right: 80px;
    z-index: 2;
    transform: rotate(17deg);
}

.stamp {
    width: 495px;
    top: 123px;
    right: -85px;
    z-index: 3;
}

@media (max-width: 435px) {
    .mascot-red {
        width: 112px;
        top: 226px;
        right: 59px;
    }
}

@media (max-width: 395px) {
    .stamp {
        top: 140px;
        right: -63px;
    }
}

</style>