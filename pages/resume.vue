<script setup lang="ts">
const { t } = useTranslation()

// SEO Meta
useSeoMeta({
  title: 'Resume - Nathan Landrum',
  description: 'Professional resume of Nathan Landrum - Software Developer specializing in frontend and full-stack development with React, Vue, and modern web technologies.'
})

// Animation state
const resumeVisible = ref(false)

onMounted(() => {
  // Set up Intersection Observer for resume
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -5% 0px',
    threshold: 0.1
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setTimeout(() => {
        resumeVisible.value = true
      }, 100)
      
      observer.disconnect()
    }
  }, observerOptions)

  // Observe the resume container
  nextTick(() => {
    const resumeElement = document.querySelector('#resume-container')
    if (resumeElement) {
      observer.observe(resumeElement)
    }
  })
})
</script>

<template>
    <div class="container mx-auto px-2 sm:px-4 my-4 sm:my-8 max-w-3xl">
      <!-- PDF-like Container -->
      <div 
        id="resume-container"
        class="bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
        :class="{ 'opacity-100 translate-y-0': resumeVisible }"
      >
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