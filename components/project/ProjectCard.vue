<script setup lang="ts">
const props = defineProps<{
  id: number
  title: string
  description: string
  image?: string
}>()

const navigateToProject = () => {
  // Navigate to project detail page
  navigateTo(`/projects/${props.id}`)
}

const { t } = useTranslation();
</script>


<template>
  <div
    class="bg-[var(--color-background)] rounded-lg overflow-hidden shadow-lg transition-all duration-300 border border-gray-200 h-full flex flex-col cursor-pointer hover:shadow-xl hover:scale-105"
    @click="navigateToProject"
  >
    <!-- Project Image -->
    <div class="h-48 bg-gradient-to-r from-gray-800 to-gray-700 flex justify-center">
      <img v-if="image" :src="image" :alt="title" class="w-full h-full object-cover" />
      <div v-else class="text-light text-xl font-bold px-4 text-center flex items-center">{{ title }}</div>
    </div>

    <!-- Project Content -->
    <div class="flex-grow flex flex-col p-6">
      <h3 class="text-xl font-bold text-light mb-3">{{ title }}</h3>
      <p class="text-gray-400 text-sm line-clamp-3 flex-grow">{{ description }}</p>
      
      <!-- Click to learn more indicator -->
      <div class="mt-4 text-center">
        <span class="text-primary text-sm font-medium">{{ t("projects.viewMore") }} →</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Prevent scrolling of the body when overlay is open on mobile */
:global(body.overlay-open) {
  overflow: hidden;
}

@keyframes pulse {
  0%, 100% {
    scale: 1.2;
  }
  50% {
    scale: 0.9;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.description-text {
  max-height: 60vh;
  overflow-y: auto;
  text-overflow: ellipsis;
  padding-right: 5px;
  scrollbar-width: thin;
  scrollbar-color: rgba(59, 130, 246, 0.5) transparent;
}

.description-text::-webkit-scrollbar {
  width: 4px;
}

.description-text::-webkit-scrollbar-track {
  background: transparent;
}

.description-text::-webkit-scrollbar-thumb {
  background-color: rgba(59, 130, 246, 0.5);
  border-radius: 6px;
}
</style>
