<script setup lang="ts">
  import GlobeIcon from '@/assets/icons/globe.svg'
  
  const hydrated = ref(false)

  onMounted(() => {
    hydrated.value = true
  })

  const { toggleLanguage, language } = useTranslation()
</script>

<template>
  <div class="flex items-center">
    <!-- Language Toggle Switch -->
        <div
          class="flex ml-2 items-center rounded-xl p-1 cursor-pointer w-18.75 h-7.5 relative overflow-hidden"
          @click="toggleLanguage"
        >
          <!-- Gradient border using pseudo-element -->
          <div class="absolute inset-0 rounded-2xl p-0.5 overflow-hidden">
            <div
              class="absolute inset-0 rounded-2xl bg-linear-to-r from-blue-500 to-green-500"
            />
            <div class="absolute inset-0.75 rounded-2xl bg-(--color-background)"/>
          </div>
          <!-- ENG text on left -->
          <span
            v-if="hydrated"
            class="px-1 py-1 text-xs font-bold transition-all duration-300 absolute left-2 z-0"
            :class="language === 'ENG' ? 'text-blue-500 opacity-100' : 'opacity-0'"
          >
            ENG
          </span>

          
          <div
            v-if="hydrated"
            class="w-6 h-8 rounded-full flex items-center justify-center transition-all duration-300 transform absolute"
            :class="language === 'ENG' ? 'right-0.75' : 'left-0.75'"
          >
            <GlobeIcon 
            class="h-5 w-5 color-white"
            />
          </div>

          <!-- SPA text on right -->
          <span
            v-if="hydrated"
            class="px-1 py-1 text-xs font-bold transition-all duration-300 absolute right-2 z-0"
            :class="language === 'SPA' ? 'text-green-500 opacity-100' : 'opacity-0'"
          >
            SPA
          </span>
        </div>
  </div>
</template>
