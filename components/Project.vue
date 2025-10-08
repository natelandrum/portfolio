<script setup lang="ts">
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

  const showAllProjects = ref(false)
  
  const visibleFeaturedProjects = ref<number[]>([])
  const visibleOtherProjects = ref<number[]>([])
  
  const animationDelay = 200

  const allProjects = computed(() => {
    return t('projects.list') as unknown as Project[]
  })

  const featuredProjectIds = computed(() => {
    return t('projects.featuredProjects') as unknown as { id: number }[]
  })

  const featuredProjects = computed(() => {
    return allProjects.value.filter(project => 
      featuredProjectIds.value.some(featured => featured.id === project.id)
    )
  })

  const otherProjects = computed(() => {
    return allProjects.value.filter(project => 
      !featuredProjectIds.value.some(featured => featured.id === project.id)
    )
  })

  const toggleOtherProjects = () => {
    showAllProjects.value = !showAllProjects.value
    
    if (showAllProjects.value) {
      // Animate other projects when expanded
      otherProjects.value.forEach((project, index) => {
        setTimeout(() => {
          visibleOtherProjects.value.push(project.id)
        }, index * animationDelay)
      })
    } else {
      visibleOtherProjects.value = []
    }
  }

  onMounted(() => {
    // Set up Intersection Observer for featured projects
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      const newlyVisibleProjects: number[] = []

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const projectId = Number(entry.target.getAttribute('data-project-id'))
          
          if (!visibleFeaturedProjects.value.includes(projectId)) {
            newlyVisibleProjects.push(projectId)
          }
          
          observer.unobserve(entry.target)
        }
      })

      if (newlyVisibleProjects.length > 0) {
        newlyVisibleProjects.forEach((id, index) => {
          setTimeout(() => {
            visibleFeaturedProjects.value.push(id)
          }, index * animationDelay)
        })
      }
    }, observerOptions)

    // Observe featured project cards when mounted
    nextTick(() => {
      const featuredCards = document.querySelectorAll('.featured-project-card')
      featuredCards.forEach(card => {
        observer.observe(card)
      })
    })
  })

  // Check if a featured project is visible
  const isFeaturedProjectVisible = (projectId: number) => {
    return visibleFeaturedProjects.value.includes(projectId)
  }

  // Check if an other project is visible
  const isOtherProjectVisible = (projectId: number) => {
    return visibleOtherProjects.value.includes(projectId)
  }

  // Seo Meta
  useSeoMeta({
  title: 'Projects - Nathan Landrum',
  description: 'Professional portfolio of Nathan Landrum - Software Developer specializing in frontend and full-stack development with React, Vue, and modern web technologies.'
  })
</script>

<template>
  <section id="projects" class="projects-section px-6 py-20">
    <div class="container mx-auto max-w-[90%]">
      
      <!-- Featured Projects Section -->
      <div class="mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
          {{ t('projects.featuredTitle') }}
        </h2>
        
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div 
            v-for="project in featuredProjects"
            :key="project.id"
            :data-project-id="project.id"
            class="featured-project-card transition-all duration-700 transform"
            :class="isFeaturedProjectVisible(project.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          >
            <ProjectCard
              :id="project.id"
              :title="project.title"
              :description="project.description"
              :image="project.image"
            />
          </div>
        </div>
      </div>

      <!-- Other Projects Section -->
      <div v-if="otherProjects.length > 0" class="mt-16">
        <div class="text-center mb-8">
          <button
            @click="toggleOtherProjects"
            class="px-6 py-3 border-2 hover:scale-105 hover:cursor-pointer transition-all duration-300 rounded-lg font-semibold"
          >
            {{ showAllProjects ? t('projects.hideOtherProjects') : t('projects.showOtherProjects') }}
          </button>
        </div>

        <div 
          class="overflow-hidden transition-all duration-700 ease-in-out"
          :style="{
            maxHeight: showAllProjects ? '2000px' : '0px',
            opacity: showAllProjects ? 1 : 0,
            marginTop: showAllProjects ? '0px' : '-32px'
          }"
        >
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 pb-8">
            <div 
              v-for="project in otherProjects"
              :key="project.id"
              class="other-project-card transition-all duration-1000 transform"
              :class="isOtherProjectVisible(project.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            >
              <ProjectCard
                :id="project.id"
                :title="project.title"
                :description="project.description"
                :image="project.image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  background-color: var(--color-background);
  background-image: url('@/assets/background.png');
  background-repeat: repeat;
  position: relative;
}

/* Optional overlay to ensure text readability over the background image */
.projects-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.projects-section > .container {
  position: relative;
  z-index: 2; /* Ensure content appears above the overlay */
}
</style>
