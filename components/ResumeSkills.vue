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
  <div class="px-8 py-2">
    <!-- Title -->
    <h2 class="text-lg font-bold text-gray-900 mb-4">
      {{ skills.title}}
    </h2>
    
    <!-- Skills Categories -->
    <div >
      <div 
        v-for="(skillList, category) in skills.skillCategories" 
        :key="category"
        class="flex p-2 rounded hover:bg-gray-100 transition-colors"
      >
        <!-- Category Name -->
        <div class="w-25 flex-shrink-0">
          <span class="text-sm font-medium text-gray-900 capitalize">{{ category }}:</span>
        </div>
        
        <!-- Skills List -->
        <div class="flex-1">
          <span class="text-sm text-gray-700">{{ Array.from(skillList).join(', ') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>