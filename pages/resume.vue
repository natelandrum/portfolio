<script setup lang="ts">
const { t } = useTranslation()

// SEO Meta
useSeoMeta({
  title: 'Resume - Nathan Landrum',
  description: 'Professional resume of Nathan Landrum - Software Developer specializing in frontend and full-stack development with React, Vue, and modern web technologies.'
})
</script>

<template>
    <div class="container mx-auto px-4 my-8 max-w-3xl">
      <!-- PDF-like Container -->
      <div class="bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200">
        <!-- Resume Header -->
        <ResumeHeader />
        
        <!-- Resume Divider -->
        <div class="border-t border-gray-400 mx-8"></div>
        
        <!-- Professional Summary -->
        <ResumeSummary />

        <!-- Resume Divider -->
        <div class="border-t border-gray-400 mx-8 mt-2"></div>
        
        <!-- Skills Section -->
        <ResumeSkills />
        
        <!-- Resume Divider -->
        <div class="border-t border-gray-400 mx-8 mt-2"></div>
        
        <!-- Education Section (Expandable) -->
        <ResumeEducation />

        <!-- Resume Divider -->
        <div class="border-t border-gray-400 mx-8 mt-2"></div>
        
        <!-- Experience Section (Expandable) -->
        <ResumeExperience />
      </div>
    </div>
</template>