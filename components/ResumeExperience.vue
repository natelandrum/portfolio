<script setup lang="ts">
const { t } = useTranslation()

type ExperienceItem = {
  title: string;
  jobs: {
    title: string;
    company: string;
    date: string;
    details: string[];
  }[];
}

const experience = computed(() => t('resume.experience') as unknown as ExperienceItem)
const expandedItems = ref<Set<number>>(new Set())

const toggleExpanded = (index: number) => {
  if (expandedItems.value.has(index)) {
    expandedItems.value.delete(index)
  } else {
    expandedItems.value.add(index)
  }
}

const isExpanded = (index: number) => expandedItems.value.has(index)
</script>

<template>
  <div class="px-8 py-2">
    <!-- Title -->
    <h2 class="text-lg font-bold text-gray-900 mb-4">
      {{ experience.title }}
    </h2>
    
    <!-- Experience Items -->
    <div class="space-y-4">
      <div 
        v-for="(item, index) in experience.jobs" 
        :key="index"
        class="border-l-2 border-gray-200 pl-4"
      >
        <!-- Main Info (Always Visible) -->
        <div class="flex justify-between items-start mb-2 rounded p-2 hover:bg-gray-100 cursor-pointer transition-colors"
          @click="toggleExpanded(index)"
          >
          <div class="flex-1">
            <h3 class="text-sm font-semibold text-gray-900">{{ item.title }}</h3>
            <p class="text-sm text-gray-700">{{ item.company }}</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">{{ item.date }}</span>
            <button
              class="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg 
                :class="{ 'rotate-180': isExpanded(index) }"
                class="w-4 h-4 transition-transform duration-200"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Expandable Details -->
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-96"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 max-h-96"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-if="isExpanded(index)" class="overflow-hidden">
            <ul class="mt-2 space-y-1">
              <li 
                v-for="(point, pointIndex) in item.details" 
                :key="pointIndex"
                class="flex items-start text-sm text-gray-600"
              >
                <span class="mr-2 mt-1.5 w-1 h-1 bg-gray-500 rounded-full flex-shrink-0"></span>
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>