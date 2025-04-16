<script setup lang="ts">
  const { t } = useTranslation()
  useHead({
    title: t('contact.myName') + ' | ' + t('home.title'),
    meta: [
      {
        name: 'description',
        content: t('home.description'),
      },
      {
        name: 'keywords',
        content: 'software, developer, web applications, Vue, React, Nuxt.js, Next.js',
      },
      {
        property: 'og:title',
        content: t('contact.myName') + ' | ' + t('home.title'),
      },
      {
        property: 'og:description',
        content: t('home.description'),
      },
    ],
  })
</script>

<template>
  <div>
    <Hero />
    <hr class="border-t border-gray-200">
    <Project />
    <hr class="border-t border-gray-200">
    <Skills />
    <hr class="border-t border-gray-200">
    <Contact />
    <hr class="border-t border-gray-200">
  </div>
</template>
