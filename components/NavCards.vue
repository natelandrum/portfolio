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
  <section class="container my-12">
    <div class="max-w-[90%] justify-items-center mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Navigation Card -->
      <router-link 
        v-for="(card, index) in navCards" 
        :key="index"
        :to="card.cardLink" 
        :data-card-index="index"
        class="p-6 border hover:scale-105 hover:cursor-pointer min-w-80 max-w-[80%] border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 block no-underline opacity-0 transform translate-y-8"
        :class="{ 
          'opacity-100 translate-y-0': visibleCards.includes(index),
          'transition-all duration-700 ease-out': visibleCards.includes(index)
        }"
      >
        <!-- SVG Placeholder -->
        <div class="mb-4 flex justify-center">
            <component :is="getIconComponent(card.cardLink)" class="w-16 h-16 text-gray-400" />
        </div>
        
        <!-- Card Title -->
        <h2 class="text-2xl font-bold mb-4 text-center">{{ card.cardTitle }}</h2>
        
        <!-- Card Description -->
        <p class="text-gray-400 text-center mb-4">{{ card.cardDescription }}</p>
      </router-link>
    </div>
  </section>
</template>
