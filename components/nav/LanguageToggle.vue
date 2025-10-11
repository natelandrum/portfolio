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
          class="flex ml-2 items-center rounded-xl p-1 cursor-pointer w-[75px] h-[30px] relative overflow-hidden"
          @click="toggleLanguage"
        >
          <!-- Gradient border using pseudo-element -->
          <div class="absolute inset-0 rounded-2xl p-[2px] overflow-hidden">
            <div
              class="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-green-500"
            ></div>
            <div class="absolute inset-[3px] rounded-2xl bg-[var(--color-background)]"></div>
          </div>
          <!-- ENG text on left -->
          <span
            class="px-1 py-1 text-xs font-bold transition-all duration-300 absolute left-2 z-0"
            v-if="hydrated"
            :class="language === 'ENG' ? 'text-blue-500 opacity-100' : 'opacity-0'"
          >
            ENG
          </span>

          
          <div
            class="w-6 h-8 rounded-full flex items-center justify-center transition-all duration-300 transform absolute"
            v-if="hydrated"
            :class="language === 'ENG' ? 'right-[3px]' : 'left-[3px]'"
          >
            <GlobeIcon 
            class="h-5 w-5 color-white"
            />
          </div>

          <!-- SPA text on right -->
          <span
            class="px-1 py-1 text-xs font-bold transition-all duration-300 absolute right-2 z-0"
            v-if="hydrated"
            :class="language === 'SPA' ? 'text-green-500 opacity-100' : 'opacity-0'"
          >
            SPA
          </span>
        </div>
  </div>
</template>
