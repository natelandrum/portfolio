<script setup lang="ts">
const { t } = useTranslation()

const summary = computed(() => t('resume.summary') as unknown as object & { points: string[] })
</script>

<template>
  <div class="px-8 py-2">
    <!-- Title -->
    <h2 class="text-lg font-bold text-gray-900 mb-3">
      {{ t('resume.summary.title') }}
    </h2>
    
    <!-- Summary Points -->
    <ul class="space-y-1">
      <li 
        v-for="(point, index) in summary.points" 
        :key="index"
        class="flex items-start text-gray-700 text-sm"
      >
        <span class="mr-2 mt-1.5 w-1.5 h-1.5 bg-gray-900 rounded-full flex-shrink-0"></span>
        <span>{{ point }}</span>
      </li>
    </ul>
  </div>
</template>