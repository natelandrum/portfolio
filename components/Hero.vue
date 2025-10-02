<script setup lang="ts">
  const hydrated = ref(false)

  onMounted(() => {
    hydrated.value = true
  })

  const { t } = useTranslation()
</script>

<template>
  <section class="relative flex justify-center mt-12">
    <div class="container max-w-[90%] mb-8 flex flex-col md:flex-row md:items-center">
      <div class="inner-container md:w-1/2 opacity-0 transition-opacity duration-[1.2s] transform"
      :class="{ 'opacity-100': hydrated }"
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
        class="md:w-1/2 flex relative text-gray-500 text-wrap font-bold justify-center opacity-0 transition-opacity duration-[1.2s] transform"
        :class="{ 'opacity-100': hydrated }"
      >
        <GradientBackground />
        <img
      src="https://res.cloudinary.com/dhqwefv7s/image/upload/c_crop,ar_1:1/v1759211591/IMG_0098_vuwcjn.jpg"
      :alt="`${t('contact.myName')} Profile`"
      class="min-w-auto min-h-[300px] max-w-auto max-h-[300px] brightness-75"
        />
      </div>
    </div>
  </section>
</template>
