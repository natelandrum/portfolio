<script setup lang="ts">
const { t } = useTranslation()
</script>

<template>
  <div class="p-8 pb-6">
    <!-- Name -->
    <h1 class="text-3xl font-bold text-center text-gray-900 mb-2">
      {{ t('resume.name') }}
    </h1>
    
    <!-- Contact Information -->
    <div class="text-center text-gray-700 text-sm leading-relaxed">
      <div class="flex flex-wrap justify-center items-center gap-1">
        <a :href="`mailto:${t('resume.email')}`">{{ t('resume.email') }}</a>
        <span class="mx-1">|</span>
        <a :href="`tel:${t('resume.phone')}`">{{ t('resume.phone') }}</a>
        <span class="mx-1">|</span>
        <a :href="t('resume.linkedin.url')">{{ t('resume.linkedin.text') }}</a>
        <span class="mx-1">|</span>
        <a :href="t('resume.portfolio.url')">{{ t('resume.portfolio.text') }}</a>
      </div>
    </div>
  </div>
</template>