<script setup lang="ts">
  import EmailIcon from '@/assets/icons/email.svg'
  import PhoneIcon from '@/assets/icons/phone.svg'
  import LocationIcon from '@/assets/icons/location.svg'
  import GithubIcon from '@/assets/icons/github.svg'
  import LinkedInIcon from '@/assets/icons/linkedin.svg'
  import CVIcon from '@/assets/icons/cv.svg'

  const { t } = useTranslation()

  const name = ref('')
  const email = ref('')
  const message = ref('')
  const isSubmitting = ref(false)
  const isSubmitted = ref(false)
  const errorMessage = ref('')
  
  // Animation states
  const infoVisible = ref(false)
  const formVisible = ref(false)
  
  onMounted(() => {
    // Detect if on mobile
    const isMobile = window.innerWidth < 768
    
    // Set up Intersection Observer to detect when contact section enters the viewport
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.25
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // On mobile, animate both sections with minimal delay
        if (isMobile) {
          // Show both parts with minimal delay
          infoVisible.value = true
          
          setTimeout(() => {
            formVisible.value = true
          }, 200) // Short delay for mobile
        } else {
          // Desktop animation with more staggered effect
          setTimeout(() => {
            infoVisible.value = true
          }, 100)
          
          setTimeout(() => {
            formVisible.value = true
          }, 500)
        }
        
        // Once animation is triggered, no need to observe anymore
        observer.disconnect()
      }
    }, observerOptions)

    // Observe the contact section
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      observer.observe(contactSection)
    }
  })

  const submitForm = async () => {
    // Reset states
    errorMessage.value = ''
    isSubmitting.value = true

    try {
       await $fetch('/api/contact', {
          method: 'POST',
          body: {
            name: name.value,
            email: email.value,
            message: message.value,
          },
        })

      // Reset form after successful submission
      name.value = ''
      email.value = ''
      message.value = ''
      isSubmitted.value = true
    } catch (error) {
      console.error('Error submitting form:', error)
      errorMessage.value = 'Something went wrong. Please try again.'
    } finally {
      isSubmitting.value = false
    }
  }
</script>

<template>
  <section id="contact" class="px-6 py-20 bg-dark overflow-hidden">
    <div class="container mx-auto max-w-[90%]">
      <h2 class="mb-12 text-3xl font-bold text-center md:text-4xl">
        {{ t('contact.title') }}
      </h2>

      <div class="grid grid-cols-1 gap-12 md:grid-cols-2">
        <!-- Contact Information -->
        <div 
          class="transition-all duration-700 transform"
          :class="infoVisible ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'"
        >
          <h3 class="mb-6 text-2xl font-bold text-primary">{{ t('contact.contactInfo') }}</h3>
          <p class="mb-8 text-gray-400 max-w-[500px]">
            {{ t('contact.reachOut') }}
          </p>

          <div class="space-y-4">
            <div class="flex items-start">
              <div class="absolute w-80 h-50 -z-10">
                <GradientBackground />
              </div>
              <div class="flex items-center py-2 hover:scale-110 transition-transform">
                <EmailIcon class="mr-3 w-6 h-6 flex-shrink-0" />
                <a :href="`mailto:${t('contact.myEmail')}`">{{ t('contact.myEmail') }}</a>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex items-center py-2 hover:scale-110 transition-transform">
                <PhoneIcon class="mr-3 w-6 h-6 flex-shrink-0" />
                <a :href="`tel:${t('contact.myPhone')}`">{{ t('contact.myPhone') }}</a>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex items-center py-2 hover:scale-110 transition-transform">
                <LocationIcon class="mr-3 w-6 h-6 flex-shrink-0" />
                <span class="inline-block">{{ t('contact.myLocation') }}</span>
              </div>
            </div>
            <div class="flex items-start">
              <a href="/Nathan Landrum resume.docx" download class="flex items-center hover:scale-110 transition-transform cursor-pointer py-2">
                <CVIcon class="mr-3 w-6 h-6 invert flex-shrink-0" />
                <span class="inline-block">{{ t('contact.myCV') }}</span>
              </a>
            </div>
          </div>

          <div class="mt-8 w-fit flex flex-col items-center">
            <h4 class="mb-4 text-xl font-bold">{{ t('contact.connectWithMe') }}</h4>
            <div class="flex space-x-4">
              <!-- Social media links -->
              <div class="h-8 w-8 flex justify-center items-center hover:scale-120 transition-transform">
                <a :href="t('contact.myGithub')" class="text-white! hover:bg-transparent!">
                <GithubIcon class="w-8 h-8" />
              </a>
              </div>
              <div class="bg-blue-500 h-8 w-8 flex justify-center items-center hover:scale-120 transition-transform">
                <a :href="t('contact.myLinkedIn')" class="text-white!">
                  <LinkedInIcon class="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div 
          class="transition-all duration-700 transform"
          :class="formVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'"
        >
          <div v-if="isSubmitted" class="p-6 bg-green-800 rounded-lg">
            <h3 class="mb-2 text-xl font-bold">{{ t('contact.thankYou') }}</h3>
            <p>{{ t('contact.getBack') }}</p>
            <button
              @click="isSubmitted = false"
              class="px-4 py-2 mt-4 font-bold text-white rounded transition-colors border-2 hover:bg-emerald-600"
            >
              {{ t('contact.sendAnother') }}
            </button>
          </div>

          <form v-else @submit.prevent="submitForm" class="space-y-6 border border-gray-200 rounded-xl p-4 flex flex-col">
            <div class="transition-all duration-500 delay-[100ms]" :class="formVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
              <label for="name" class="block mb-2">{{ t('contact.name') }}</label>
              <input
                type="text"
                id="name"
                v-model="name"
                required
                class="px-4 py-2 w-full bg-gray-800 rounded border border-gray-400 focus:border-blue-400 focus:outline-none"
              />
            </div>

            <div class="transition-all duration-500 delay-[200ms]" :class="formVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
              <label for="email" class="block mb-2">{{ t('contact.email') }}</label>
              <input
                type="email"
                id="email"
                v-model="email"
                required
                class="px-4 py-2 w-full bg-gray-800 rounded border border-gray-400 focus:border-blue-400 focus:outline-none"
              />
            </div>

            <div class="transition-all duration-500 delay-[300ms]" :class="formVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
              <label for="message" class="block mb-2">{{ t('contact.message') }}</label>
              <textarea
                id="message"
                v-model="message"
                rows="5"
                required
                class="px-4 py-2 w-full bg-gray-800 rounded border border-gray-400 focus:border-blue-400 focus:outline-none"
              ></textarea>
            </div>

            <div v-if="errorMessage" class="p-4 bg-red-800 rounded">
              {{ errorMessage }}
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="self-center px-6 py-3 w-full max-w-[300px] font-bold border-2 blue transition-all duration-500 delay-[400ms]"
              :class="formVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'"
            >
              <span v-if="isSubmitting">{{ t('contact.sending') }}</span>
              <span v-else>{{ t('contact.send') }}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
