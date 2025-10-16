<script setup lang="ts">
  const { t } = useTranslation()
  
  const hydrated = ref(false)
  const textVisible = ref(false)
  const imageVisible = ref(false)

  onMounted(() => {
    // Immediate hydration
    hydrated.value = true
    
    // Staggered animation
    setTimeout(() => {
      textVisible.value = true
    }, 200)
    
    setTimeout(() => {
      imageVisible.value = true
    }, 600)
  })
</script>

<template>
  <section class="mx-auto relative flex justify-center mt-12">
    <div class="container max-w-[90%] mb-8 flex flex-col md:flex-row md:items-center">
      <div 
        class="inner-container md:w-1/2 transform transition-all duration-1000 ease-out"
        :class="textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <h1 class="mb-4 font-bold text-4xl md:text-5xl lg:text-6xl">
          {{ t('hero.title') }}
          <span class="text-blue-500">{{ t('hero.titleName') }}</span>
          <span>.</span>
        </h1>
        <p class="max-w-lg mx-auto mb-4 ml-0 text-lg text-gray-400">
          {{ t('hero.description') }}
        </p>
      </div>
      <div 
        class="md:w-1/2 flex relative text-gray-500 text-wrap font-bold justify-center transform transition-all duration-1000 ease-out"
        :class="imageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <UiGradientBackground />
        <img
      src="assets/profile.jpg"
      :alt="`${t('contact.myName')} Profile`"
      class="mt-4 min-w-auto min-h-[300px] max-w-auto max-h-[300px] brightness-100"
        />
      </div>
    </div>
  </section>
</template>
