<script setup lang="ts">
  const { t } = useTranslation()
  const icons = t('skills.icons') as unknown as Record<string, string>
  
  // Reactive array to track which skills are visible
  const visibleSkills = ref<string[]>([])
  
  // Animation delay between each skill icon (in milliseconds)
  const animationDelay = 100
  const mobileAnimationDelay = 50 // Faster animation for mobile
  
  onMounted(() => {
    // Detect if on mobile
    const isMobile = window.innerWidth < 768
    const delay = isMobile ? mobileAnimationDelay : animationDelay
    
    // Set up Intersection Observer to detect when skills section enters the viewport
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // When skills section is visible, animate icons one by one
        // Use a shorter delay on mobile to make all icons appear quickly
        const skillNames = Object.keys(icons)
        
        // On mobile, we want to animate quicker with less delay between items
        skillNames.forEach((name, index) => {
          setTimeout(() => {
            visibleSkills.value.push(name)
          }, index * delay)
        })
        
        // Once animation is triggered, no need to observe anymore
        observer.disconnect()
      }
    }, observerOptions)

    // Observe the skills container
    const skillsSection = document.querySelector('#skills-container')
    if (skillsSection) {
      observer.observe(skillsSection)
    }
  })
  
  // Check if a skill is visible
  const isSkillVisible = (name: string) => {
    return visibleSkills.value.includes(name)
  }
</script>

<template>
  <section id="skills" class="py-20 px-6 bg-gray-900">
    <div class="container mx-auto md:max-w-[90%]">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">{{ t('skills.title') }}</h2>

      <div id="skills-container" class="flex flex-wrap relative justify-center md:w-[80%] mx-auto">
        <GradientBackground />
        <div
          v-for="(url, name) in icons"
          :key="name"
          class="p-6 transform transition-all duration-500"
          :class="[
            isSkillVisible(name) ? 'opacity-100 scale-100' : 'opacity-0 scale-50',
            isSkillVisible(name) ? 'animate-skill-pop' : ''
          ]"
        >
          <img
            :src="url"
            :alt="name"
            class="w-16 h-16 rounded-full"
            :class="{ 'p-1 filter invert': name === 'github' }"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes skill-pop {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  70% {
    transform: scale(1.5);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-skill-pop {
  animation: skill-pop 0.5s ease-out forwards;
}
</style>
