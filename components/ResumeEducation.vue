<script setup lang="ts">
const { t } = useTranslation()

type EducationItem = {
    title: string;
    degrees: {
        degree: string;
        school: string;
        date: string;
        gpa?: string;
        details: string[];
    }[];
    certificates: {
        title: string;
        details: string[];
    }
}

const education = computed(() => t('resume.education') as unknown as EducationItem)
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
      {{ education.title }}
    </h2>
    
    <!-- Education Items -->
    <div class="space-y-4">
      <div 
        v-for="(item, index) in education.degrees" 
        :key="index"
        class="border-l-2 border-gray-200 pl-4"
      >
      <!-- Main Info (Always Visible) -->
      <div class="flex justify-between items-start mb-2 rounded p-2 hover:bg-gray-100 transition-colors">
          <div class="flex-1">
              <h3 class="text-sm font-semibold text-gray-900">{{ item.degree }}</h3>
              <p class="text-sm text-gray-700">
                {{ item.school }} | 
                <!-- GPA (if available) -->
                <span v-if="item.gpa" class="text-sm text-gray-600">{{ item.gpa }}</span>

              </p>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">{{ item.date }}</span>
            <button
              @click="toggleExpanded(index)"
              class="w-5 h-5 flex items-center justify-center rounded text-gray-500 hover:text-gray-700 transition-colors"
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
            <ul class="mt-2">
              <li 
                v-for="(detail, detailIndex) in item.details" 
                :key="detailIndex"
                class="flex items-start text-sm text-gray-600"
              >
                <span class="mr-2 mt-1.5 w-1 h-1 bg-gray-500 rounded-full flex-shrink-0"></span>
                <span>{{ detail }}</span>
              </li>
            </ul>
          </div>
        </transition>

      </div>
    </div>

    <!-- Certificates Section (after all degrees) -->
    <div v-if="education.certificates && education.certificates.details.length > 0" class="mt-2 pt-4">
      <h4 class="text-sm font-medium text-gray-800 mb-3">{{ education.certificates.title }}</h4>
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="(certificate, certIndex) in education.certificates.details" 
          :key="certIndex"
          class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded border border-gray-200"
        >
          {{ certificate }}
        </span>
      </div>
    </div>
  </div>
</template>