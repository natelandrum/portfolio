<script setup lang="ts">
  const hydrated = ref(false)
  const leftSideVisible = ref(false)
  const rightSideVisible = ref(false)

  onMounted(() => {
    hydrated.value = true
    
    // Use Intersection Observer to detect when elements are in view
    const observerOptions = {
      root: null,
      // Increase rootMargin to detect elements before they enter viewport
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    }

    // For mobile devices, we'll use a different approach - show both sides
    // when any part becomes visible to prevent partial animations
    const isMobile = window.innerWidth < 768
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries.some(entry => entry.isIntersecting)) {
        // On mobile, show both sides simultaneously when either side is visible
        if (isMobile) {
          leftSideVisible.value = true
          rightSideVisible.value = true
          leftObserver.disconnect()
          rightObserver.disconnect()
          return
        }
        
        // On desktop, handle each side separately
        entries.forEach(entry => {
          if (entry.target.classList.contains('hero-left-side')) {
            leftSideVisible.value = true
            leftObserver.disconnect()
          } else if (entry.target.classList.contains('hero-right-side')) {
            rightSideVisible.value = true
            rightObserver.disconnect()
          }
        })
      }
    }

    const leftObserver = new IntersectionObserver(handleIntersection, observerOptions)
    const rightObserver = new IntersectionObserver(handleIntersection, observerOptions)

    // Observe the elements
    const leftElement = document.querySelector('.hero-left-side')
    const rightElement = document.querySelector('.hero-right-side')
    
    if (leftElement) leftObserver.observe(leftElement)
    if (rightElement) rightObserver.observe(rightElement)
  })

  const { t, language } = useTranslation()
  const { scrollToSection } = useScroll()
</script>

<template>
  <section class="relative flex justify-center mt-16 mb-0"
  >
    <div class="max-w-[90%] flex flex-col items-center md:flex-row md:items-center">
      <div 
        class="hero-left-side mb-10 text-center md:w-1/2 md:text-center md:mb-0 transition-all duration-700 transform"
        :class="leftSideVisible ? 'translate-x-0 opacity-100' : 'translate-x-[-100px] opacity-0'"
      >
        <h1
          class="mb-2 font-bold text-transparent uppercase bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text"
          v-if="hydrated"
          :class="language === 'ENG' ? 'text-6xl lg:text-7xl xl:text-8xl' : 'text-4xl lg:text-5xl xl:text-6xl'"
        >
          {{ t('hero.title') }}
        </h1>
        <p class="max-w-lg mx-auto mb-8 text-lg text-gray-400">
          {{ t('hero.description') }}
        </p>
        <div class="flex justify-center">
          <div
          @click="scrollToSection('projects')"
          class="px-6 py-3 mr-4 green border-0!"
          >
            {{ t('hero.viewWork') }}
          </div>
          <div
          @click="scrollToSection('contact')"
          class="px-6 py-3 mr-4 green"
          >
            {{ t('hero.contactMe') }}
          </div>
        </div>
      </div>
      <div 
        class="hero-right-side md:w-1/2 flex relative text-gray-500 text-wrap font-bold justify-center transition-all duration-[1.6s] transform"
        :class="rightSideVisible ? 'translate-x-0 opacity-100' : 'translate-x-[100px] opacity-0'"
      >
        <GradientBackground />
        <p class="absolute top-[40%] right-[10%] opacity-50 z-[-1] text-[24px]">$ npm install</p>
        <p class="absolute top-[45%] left-[18%] opacity-50 z-[-1] text-[20px]">git commit -m "Add"</p>
        <p class="absolute top-[50%] right-[18%] opacity-50 z-[-1] text-[14px]">JSON.stringify()</p>
        <p class="absolute top-[55%] left-[23%] opacity-50 z-[-1] text-[22px]">console.log()</p>
        <p class="absolute top-[60%] right-[8%] opacity-50 z-[-1] text-[18px]">axios.get()</p>
        <p class="absolute top-[65%] left-[15%] opacity-50 z-[-1] text-[16px]">useEffect()</p>
        <p class="absolute top-[70%] right-[5%] opacity-50 z-[-1] text-[14px]">import React from 'react'</p>
        <p class="absolute top-[75%] left-[5%] opacity-50 z-[-1] text-[12px]">export default function</p>


        <img
      src="https://res.cloudinary.com/dhqwefv7s/image/upload/v1744568235/profile_c2w2ni.png"
      :alt="`${t('contact.myName')} Profile`"
      class="min-w-[400px] min-h-[400px] max-w-[400px] max-h-[400px] brightness-75"
        />
      </div>
    </div>
  </section>
</template>
