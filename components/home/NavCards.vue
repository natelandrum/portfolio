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
  <section class="container max-w-[90%] mx-auto px-4">
    <div class="mx-auto align-items-center justify-items-center grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Navigation Card -->
      <router-link 
        v-for="(card, index) in navCards" 
        :key="index"
        :to="card.cardLink" 
        :data-card-index="index"
        class="group max-w-[80%] sm-max-w-[60%] lg:max-w-[100%] relative my-3 p-6 border border-gray-200 rounded-xl bg-transparent 
        hover:border-gray-300 hover:translate-y-0 active:scale-95 transition-all duration-300 ease-out no-underline 
        opacity-0 transform translate-y-8 w-full min-h-[250px] flex flex-col items-center justify-center text-center backdrop-blur-sm"
        :class="{ 
          'opacity-100 translate-y-0': visibleCards.includes(index),
          'transition-all duration-700 ease-out': visibleCards.includes(index)
        }"
      >
        
        <!-- SVG Icon -->
        <div class="relative z-10 mb-4 flex justify-center transform group-hover:scale-110 transition-transform duration-300" style="width: 20%; height: 20%;">
          <component :is="getIconComponent(card.cardLink)" class="w-full h-full text-gray-400 group-hover:text-blue-500 transition-colors duration-300" style="min-width: 48px; min-height: 48px; max-width: 80px; max-height: 80px;" />
        </div>
        
        <!-- Card Title -->
        <h2 class="relative z-10 font-bold mb-3 text-white leading-tight" style="font-size: clamp(1.125rem, 2.5vw, 1.5rem);">
          {{ card.cardTitle }}
        </h2>
        
        <!-- Card Description -->
        <p class="relative z-10 text-gray-500 leading-relaxed" style="font-size: clamp(0.875rem, 2vw, 1.125rem); max-width: 85%;">
          {{ card.cardDescription }}
        </p>
        
        <!-- Subtle arrow indicator -->
        <div class="relative z-10 mt-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <svg class="text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: clamp(16px, 1.5vw, 20px); height: clamp(16px, 1.5vw, 20px);">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </router-link>
    </div>
  </section>
</template>
