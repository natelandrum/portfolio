<script setup lang="ts">
const { t } = useTranslation()

// SEO Meta
useSeoMeta({
  title: 'About Me - Nathan Landrum',
  description: 'Learn about Nathan Landrum\'s journey from Aeronautical Engineering to Software Development, his passion for building scalable applications, and his experience with modern web technologies.'
})

interface AboutSection {
  icon: string
  title: string
  content: string
}

const aboutData = computed(() => t('about') as unknown as {
  title: string
  subtitle: string
  sections: AboutSection[]
})

// Animation states
const headerVisible = ref(false)
const visibleSections = ref<number[]>([])
const animationDelay = 150

onMounted(() => {
  // Set up Intersection Observer for header
  const headerObserverOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.3
  }

  const headerObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setTimeout(() => {
        headerVisible.value = true
      }, 100)
      
      headerObserver.disconnect()
    }
  }, headerObserverOptions)

  // Set up Intersection Observer for story sections
  const sectionObserverOptions = {
    root: null,
    rootMargin: '0px 0px -15% 0px',
    threshold: 0.2
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    const newlyVisibleSections: number[] = []

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionIndex = Number(entry.target.getAttribute('data-section-index'))
        
        if (!visibleSections.value.includes(sectionIndex)) {
          newlyVisibleSections.push(sectionIndex)
        }
        
        sectionObserver.unobserve(entry.target)
      }
    })

    if (newlyVisibleSections.length > 0) {
      // Sort by index to animate in order
      newlyVisibleSections.sort((a, b) => a - b)
      
      newlyVisibleSections.forEach((sectionIndex, arrayIndex) => {
        setTimeout(() => {
          visibleSections.value.push(sectionIndex)
        }, arrayIndex * animationDelay)
      })
    }
  }, sectionObserverOptions)

  // Observe elements
  nextTick(() => {
    const headerElement = document.querySelector('#about-header')
    if (headerElement) {
      headerObserver.observe(headerElement)
    }

    const sectionElements = document.querySelectorAll('[data-section-index]')
    sectionElements.forEach(element => {
      sectionObserver.observe(element)
    })
  })
})
</script>

<template>
  <div class="container max-w-[90%] mx-auto px-4 py-16">
    
    <!-- Header Section -->
    <div 
      id="about-header"
      class="text-center mb-16 opacity-0 transform translate-y-8 transition-all duration-800 ease-out"
      :class="{ 'opacity-100 translate-y-0': headerVisible }"
    >
      <h1 class="text-4xl md:text-5xl font-bold mb-4">
        {{ aboutData.title }}
      </h1>
      <p class="text-xl text-gray-400 max-w-2xl mx-auto">
        {{ aboutData.subtitle }}
      </p>
    </div>

    <!-- Story Sections -->
    <div class="space-y-8 mb-20">
      <div 
        v-for="(section, index) in aboutData.sections" 
        :key="index"
        :data-section-index="index"
        class="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 opacity-0 transform translate-y-8"
        :class="{ 
          'opacity-100 translate-y-0': visibleSections.includes(index),
          'transition-all duration-700 ease-out': visibleSections.includes(index)
        }"
      >
        <!-- Desktop Layout -->
        <div class="hidden sm:flex items-start gap-4">
          <!-- Icon -->
          <div class="text-2xl flex-shrink-0 mt-1">
            {{ section.icon }}
          </div>
          
          <!-- Content -->
          <div class="flex-1">
            <h3 class="text-xl font-semibold mb-3">
              {{ section.title }}
            </h3>
            <p class="text-gray-400 leading-relaxed">
              {{ section.content }}
            </p>
          </div>
        </div>

        <!-- Mobile Layout -->
        <div class="sm:hidden text-center">
          <!-- Icon and Title -->
          <div class="flex flex-col items-center mb-4">
            <div class="text-3xl mb-2">
              {{ section.icon }}
            </div>
            <h3 class="text-xl font-semibold">
              {{ section.title }}
            </h3>
          </div>
          
          <!-- Content -->
          <p class="text-gray-400 leading-relaxed text-left">
            {{ section.content }}
          </p>
        </div>
      </div>
    </div>

  </div>
  
  <!-- Full-width HR -->
  <hr class="border-t border-gray-200">
  
  <!-- Contact Section -->
  <Contact />
</template>