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
</script>

<template>
  <section class="container my-12">
    <div class="max-w-[90%] justify-items-center mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Navigation Card -->
      <router-link 
        v-for="(card, index) in navCards" 
        :key="index"
        :to="card.cardLink" 
        class="p-6 border hover:scale-105 hover:cursor-pointer min-w-80 max-w-[80%] border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 block no-underline"
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
