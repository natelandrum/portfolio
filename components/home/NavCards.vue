<script setup lang="ts">

  const { t } = useTranslation()
    import ProjectIcon from '@/assets/icons/project.svg'
    import ResumeIcon from '@/assets/icons/resume.svg'
    import AboutIcon from '@/assets/icons/about.svg'

  type NavCard = {
    cardTitle: string
    cardDescription: string
    cardLink: string
    cardLinkText: string
  }

  const navCards = computed(() => t('navCards') as unknown as NavCard[])
  
  // Animation states
  const visibleCards = ref<number[]>([])
  const animationDelay = 200

  function getIconComponent(linkText: string) {
    switch (linkText) {
      case '/projects':
        return ProjectIcon
      case '/resume':
        return ResumeIcon
      case '/about':
        return AboutIcon
      default:
        return null
    }
  }

  onMounted(() => {
    // Set up Intersection Observer for nav cards
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      const newlyVisibleCards: number[] = []

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cardIndex = Number(entry.target.getAttribute('data-card-index'))
          
          if (!visibleCards.value.includes(cardIndex)) {
            newlyVisibleCards.push(cardIndex)
          }
          
          observer.unobserve(entry.target)
        }
      })

      if (newlyVisibleCards.length > 0) {
        // Sort by index to animate in order
        newlyVisibleCards.sort((a, b) => a - b)
        
        newlyVisibleCards.forEach((cardIndex, arrayIndex) => {
          setTimeout(() => {
            visibleCards.value.push(cardIndex)
          }, arrayIndex * animationDelay)
        })
      }
    }, observerOptions)

    // Observe all nav cards
    nextTick(() => {
      const cardElements = document.querySelectorAll('[data-card-index]')
      cardElements.forEach(element => {
        observer.observe(element)
      })
    })
  })
</script>

<template>
  <section class="container mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-12 lg:my-16">
    <div class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      <!-- Navigation Card -->
      <router-link 
        v-for="(card, index) in navCards" 
        :key="index"
        :to="card.cardLink" 
        :data-card-index="index"
        class="group relative my-3 p-4 sm:p-6 lg:p-8 border border-gray-200 rounded-xl bg-transparent hover:border-gray-300 hover:translate-y-0 active:scale-95 transition-all duration-300 ease-out no-underline opacity-0 transform translate-y-8 w-full min-h-[200px] sm:min-h-[240px] lg:min-h-[280px] flex flex-col items-center justify-center text-center backdrop-blur-sm"
        :class="{ 
          'opacity-100 translate-y-0': visibleCards.includes(index),
          'transition-all duration-700 ease-out': visibleCards.includes(index)
        }"
      >
        
        <!-- SVG Icon -->
        <div class="relative z-10 mb-3 sm:mb-4 lg:mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
          <component :is="getIconComponent(card.cardLink)" class="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
        </div>
        
        <!-- Card Title -->
        <h2 class="relative z-10 text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4 text-white leading-tight">
          {{ card.cardTitle }}
        </h2>
        
        <!-- Card Description -->
        <p class="relative z-10 text-sm sm:text-base lg:text-lg text-gray-500 leading-relaxed max-w-xs sm:max-w-sm lg:max-w-md">
          {{ card.cardDescription }}
        </p>
        
        <!-- Subtle arrow indicator -->
        <div class="relative z-10 mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </router-link>
    </div>
  </section>
</template>
