<script setup lang="ts">
const { t } = useTranslation()

const skills = computed(() => {
    const skillsData = t('resume.skills') as unknown as 
    { title: string } & { [key: string]: string[] }
    const { title, ...skillCategories } = skillsData
    return { title, skillCategories }
})
</script>

<template>
  <div class="px-4 sm:px-8 py-2">
    <!-- Title -->
    <h2 class="text-lg font-bold text-gray-900 mb-4">
      {{ skills.title}}
    </h2>
    
    <!-- Skills Categories -->
    <div class="space-y-3">
      <div 
        v-for="(skillList, category) in skills.skillCategories" 
        :key="category"
        class="p-2 rounded hover:bg-gray-50 transition-colors"
      >
        <!-- Desktop Layout -->
        <div class="hidden sm:flex">
          <!-- Category Name -->
          <div class="w-32 flex-shrink-0">
            <span class="text-sm font-medium text-gray-900 capitalize">{{ category }}:</span>
          </div>
          
          <!-- Skills List -->
          <div class="flex-1">
            <span class="text-sm text-gray-700">{{ Array.from(skillList).join(', ') }}</span>
          </div>
        </div>

        <!-- Mobile Layout -->
        <div class="sm:hidden">
          <!-- Category Name (Top) -->
          <div class="mb-1">
            <span class="text-sm font-medium text-gray-900 capitalize">{{ category }}:</span>
          </div>
          
          <!-- Skills List (Bottom) -->
          <div class="pl-2">
            <span class="text-sm text-gray-700">{{ Array.from(skillList).join(', ') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>