<script setup lang="ts">
import GithubIcon from '@/assets/icons/github.svg'
import LinkIcon from '@/assets/icons/link.svg'

const { t } = useTranslation()
const { isMobile, isDesktop } = useDevice()

defineProps<{
  title: string
  description: string
  image?: string
  technologies: string[]
  githubLink?: string
  demoLink?: string
}>()

const isExpanded = ref(false)
const toggleExpanded = () => (isExpanded.value = !isExpanded.value)

</script>


<template>
  <div
    class="bg-[var(--color-background)] rounded-lg overflow-hidden shadow-lg transition-all duration-300 border border-gray-200 h-full flex flex-col relative group"
    @click="(isMobile && !isDesktop) ? toggleExpanded() : null"
  >
    <!-- Description overlay that animates based on hover (desktop) or tap (mobile) -->
    <div 
      class="absolute inset-0 bg-black bg-opacity-90 flex justify-center p-6 transition-transform duration-300 transform" 
      :class="[
        isMobile ? (isExpanded ? 'translate-y-0' : '-translate-y-full') : 'group-hover:translate-y-0 -translate-y-full'
      ]"
    >
      <div class="text-center max-h-[calc(100%-100px)] overflow-auto w-full">
        <p class="text-white font-bold text-lg tracking-wide description-text">{{ description }}</p>
      </div>
    </div>
    
    <!-- Mobile indicator dot to show there's more info -->
    <div 
      v-if="isMobile && !isExpanded" 
      class="absolute top-3 right-3 w-3 h-3 bg-blue-500 rounded-full animate-pulse"
      aria-hidden="true"
    ></div>
    
    <!-- Project Image -->
    <div class="h-48 bg-gradient-to-r from-gray-800 to-gray-700 flex justify-center">
      <img v-if="image" :src="image" :alt="title" class="w-full h-full object-cover" />
      <div v-else class="text-light text-xl font-bold px-4 text-center">{{ title }}</div>
    </div>

    <!-- Project Content -->
    <div class="flex-grow flex flex-col">
      <h3 class="text-xl p-6 font-bold text-light">{{ title }}</h3>

      <!-- Technologies -->
      <div class="p-6 pt-0">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tech in technologies"
            :key="tech"
            class="px-3 py-1 bg-gray-800 text-primary text-sm rounded-full hover:bg-gray-700 transition-colors"
          >
            {{ tech }}
          </span>
        </div>
      </div>
      
      <!-- Links - Moved to be above the absolute overlay -->
      <div class="relative z-10 flex flex-wrap justify-center gap-3 px-4 pb-4 mt-auto">
        <a
          v-if="githubLink"
          :href="githubLink"
          target="_blank"
          rel="noopener noreferrer"
          class="green"
          @click.stop
        >
          <span class="flex items-center">
            <GithubIcon class="h-5 w-5 mr-1" />
            {{ t('projects.viewCode') }}
          </span>
        </a>
        <a
          v-if="demoLink"
          :href="demoLink"
          target="_blank"
          rel="noopener noreferrer"
          class="green"
          @click.stop
        >
          <span class="flex items-center">
            <LinkIcon class="h-5 w-5 mr-1" />
            {{ t('projects.viewProject') }}
          </span>
        </a>
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
    opacity: 1;
  }
  50% {
    opacity: 0.5;
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
