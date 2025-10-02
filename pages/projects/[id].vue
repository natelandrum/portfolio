<script setup lang="ts">
const route = useRoute()
const { t } = useTranslation()

type Project = {
  id: number
  title: string
  description: string
  image?: string
  technologies: string[]
  githubLink?: string
  demoLink?: string
  touchIconClass?: "dark" | "light"
}

const projectId = computed(() => Number(route.params.id))

const allProjects = computed(() => {
  return t('projects.list') as unknown as Project[]
})

const project = computed(() => {
  return allProjects.value.find(p => p.id === projectId.value)
})

// Check if project exists, if not redirect or show error
watchEffect(() => {
  if (allProjects.value.length > 0 && !project.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Project not found'
    })
  }
})

// SEO Meta
useSeoMeta({
  title: computed(() => project.value ? `${project.value.title} - Nathan Landrum` : 'Project - Nathan Landrum'),
  description: computed(() => project.value?.description || 'Project details')
})
</script>

<template>
  <div class="min-h-screen bg-dark">
    <!-- Loading state -->
    <div v-if="!project && allProjects.length === 0" class="container mx-auto px-6 py-20 max-w-4xl">
      <div class="flex justify-center items-center h-64">
        <div class="text-white text-xl">Loading...</div>
      </div>
    </div>

    <!-- Project not found -->
    <div v-else-if="!project && allProjects.length > 0" class="container mx-auto px-6 py-20 max-w-4xl">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-white mb-4">Project Not Found</h1>
        <p class="text-gray-300 mb-8">The project you're looking for doesn't exist.</p>
        <router-link 
          to="/projects" 
          class="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/80 text-dark rounded-lg transition-all duration-300 font-medium"
        >
          ← Back to Projects
        </router-link>
      </div>
    </div>

    <!-- Project content -->
    <div v-else-if="project" class="container mx-auto px-6 py-12 max-w-6xl">
      <!-- Enhanced Back button -->
      <div class="mb-12">
        <router-link 
          to="/projects" 
          class="group inline-flex items-center px-4 py-2 bg-gray-800/50 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 hover:scale-105 border border-gray-600/50 hover:border-primary/50"
        >
          <svg class="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to Projects
        </router-link>
      </div>

      <div class="space-y-12">
        <!-- Project Header with Hero Image -->
        <div class="relative">
          <!-- Smaller Hero Image -->
          <div class="rounded-2xl overflow-hidden shadow-2xl mb-8">
            <img 
              v-if="project.image" 
              :src="project.image" 
              :alt="project.title"
              class="w-full h-48 md:h-64 object-cover"
            />
            <div 
              v-else 
              class="w-full h-48 md:h-64 bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-center"
            >
              <h2 class="text-white text-2xl font-bold">{{ project.title }}</h2>
            </div>
          </div>

          <!-- Project Title -->
          <div class="text-center mb-8">
            <h1 class="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {{ project.title }}
            </h1>
          </div>

          <!-- Action Buttons - More Prominent -->
          <div class="flex flex-wrap justify-center gap-6 mb-12">
            <a
              v-if="project.demoLink"
              :href="project.demoLink"
              target="_blank"
              rel="noopener noreferrer"
              class="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-dark rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-primary/25"
            >
              <svg class="w-6 h-6 mr-3 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              {{ t('projects.viewProject') }}
              <div class="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            <a
              v-if="project.githubLink"
              :href="project.githubLink"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-gray-600 hover:border-gray-500"
            >
              <svg class="w-6 h-6 mr-3 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"/>
              </svg>
              {{ t('projects.viewCode') }}
            </a>
          </div>
        </div>

        <!-- Grid Layout for Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Project Overview -->
            <div class="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h2 class="text-3xl font-bold text-white mb-6 flex items-center">
                <svg class="w-8 h-8 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Project Overview
              </h2>
              <p class="text-gray-300 text-lg leading-relaxed">
                {{ project.description }}
              </p>
            </div>

            <!-- Key Features Section -->
            <div class="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h2 class="text-3xl font-bold text-white mb-6 flex items-center">
                <svg class="w-8 h-8 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Key Features & Functionality
              </h2>
              <div class="space-y-4">
                <div class="flex items-start space-x-3">
                  <div class="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 class="text-white font-semibold mb-1">User Authentication</h3>
                    <p class="text-gray-400">Secure user login and registration system with session management.</p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 class="text-white font-semibold mb-1">Responsive Design</h3>
                    <p class="text-gray-400">Fully responsive interface that works seamlessly across all devices.</p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 class="text-white font-semibold mb-1">Real-time Updates</h3>
                    <p class="text-gray-400">Live data synchronization and real-time user interactions.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Project Gallery -->
            <div class="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h2 class="text-3xl font-bold text-white mb-6 flex items-center">
                <svg class="w-8 h-8 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                Project Gallery
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="rounded-lg overflow-hidden bg-gray-700/50 aspect-video flex items-center justify-center">
                  <img 
                    v-if="project.image" 
                    :src="project.image" 
                    :alt="`${project.title} - Main View`"
                    class="w-full h-full object-cover"
                  />
                  <span v-else class="text-gray-400">Main Interface</span>
                </div>
                <div class="rounded-lg overflow-hidden bg-gray-700/50 aspect-video flex items-center justify-center">
                  <span class="text-gray-400">Additional Screenshots Coming Soon</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-8">
            <!-- Technologies Used -->
            <div class="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h3 class="text-xl font-bold text-white mb-4 flex items-center">
                <svg class="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Tech Stack
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-3 py-2 bg-primary/20 text-primary border border-primary/30 rounded-lg text-sm font-medium hover:bg-primary/30 transition-colors cursor-default"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Project Stats -->
            <div class="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h3 class="text-xl font-bold text-white mb-4 flex items-center">
                <svg class="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                Project Info
              </h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-gray-400">Status</span>
                  <span class="text-green-400 font-medium">Active</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-400">Type</span>
                  <span class="text-white">Web Application</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-400">Platform</span>
                  <span class="text-white">Web</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>