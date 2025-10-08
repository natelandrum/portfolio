<script setup lang="ts">
const { t } = useTranslation()

type Feature = {
  title: string
  description: string
}

type Props = {
  features: Feature[]
}

defineProps<Props>()
</script>

<template>
  <div class="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
    <h2 class="text-3xl font-bold text-white mb-6 flex items-center">
      <svg class="w-8 h-8 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      {{ t('projects.keyFeatures') }}
    </h2>
    <div class="space-y-4">
      <div v-for="(feature, i) in features" :key="i" class="flex items-start space-x-3">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
        <div>
          <h3 class="text-white font-semibold mb-1">{{ feature.title }}</h3>
          <p class="text-gray-400">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>