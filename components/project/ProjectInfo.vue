<script setup lang="ts">
const { t } = useTranslation()

type Props = {
  status?: 'active' | 'inactive' | undefined
  type: string
  platform: string
}

defineProps<Props>()
</script>

<template>
  <div class="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
    <h3 class="text-xl font-bold text-white mb-4 flex items-center">
      <svg class="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
      {{ t('projects.info') }}
    </h3>
    <div class="space-y-3">
      <div class="flex justify-between items-center">
        <span class="text-gray-400">{{ t('projects.status') }}</span>
        <span class="font-medium"
        :class="{ 'text-green-400': status === 'active', 
        'text-red-400': status === 'inactive', 
        'text-gray-400': !status }">
        {{ status && t(`projects.statuses.${status}`) !== `projects.statuses.${status}` ? 
        t(`projects.statuses.${status}`) : 
        t('projects.statuses.inactive') }}
        </span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-400">{{ t('projects.type') }}</span>
        <span class="text-white">
        {{ type && t(`projects.types.${type}` as any) !== `projects.types.${type}` ? 
        t(`projects.types.${type}` as any) : 
        type || t('projects.types.other') }}
        </span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-400">{{ t('projects.platform') }}</span>
        <span class="text-white">
        {{ platform && t(`projects.platforms.${platform}` as any) !== `projects.platforms.${platform}` ? 
        t(`projects.platforms.${platform}` as any) : 
        platform || t('projects.platforms.other') }}
        </span>
      </div>
    </div>
  </div>
</template>