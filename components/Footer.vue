<script setup lang="ts">
  const { t } = useTranslation()
</script>

<template>
  <footer class="py-8 px-6">
        <p>&copy; {{ new Date().getFullYear() }} Nathan Landrum. {{ t('footer.rights') }}</p>
  </footer>
</template>
