<script setup lang="ts">
const { t } = useTranslation()

type Props = {
  description: string
}

defineProps<Props>()
</script>

<template>
  <div class="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
    <h2 class="text-3xl font-bold text-white mb-6 flex items-center">
      <svg class="w-8 h-8 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      {{ t('projects.overview') }}
    </h2>
    <p class="text-gray-300 text-lg leading-relaxed">
      {{ description }}
    </p>
  </div>
</template>