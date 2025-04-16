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
  }

  // Reactive array to track which projects are visible
  const visibleProjects = ref<number[]>([])
  
  // Animation delay between each card (in milliseconds)
  const animationDelay = 200
  const minBatchSize = 3 // Minimum number of cards to show at once on mobile

  // Computed updates on state changes
  const projects = computed(() => {
    return t('projects.list') as unknown as Project[]
  })

  onMounted(() => {
    // Set up Intersection Observer to detect when project cards enter the viewport
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px', // Detect a bit before fully visible
      threshold: 0.1
    }

    // Check if on mobile
    const isMobile = window.innerWidth < 768

    const observer = new IntersectionObserver((entries) => {
      const newlyVisibleProjects: number[] = []

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Get project id from data attribute
          const projectId = Number(entry.target.getAttribute('data-project-id'))
          
          if (!visibleProjects.value.includes(projectId)) {
            newlyVisibleProjects.push(projectId)
          }
          
          // Once animation is triggered, no need to observe anymore
          observer.unobserve(entry.target)
        }
      })

      if (newlyVisibleProjects.length > 0) {
        // On mobile, show cards in larger batches to avoid partial row animations
        if (isMobile && newlyVisibleProjects.length < minBatchSize) {
          // If we have fewer cards than the minimum batch size, find more nearby
          const allProjectIds = projects.value.map(p => p.id)
          const nextIds = allProjectIds.filter(id => 
            !visibleProjects.value.includes(id) && 
            !newlyVisibleProjects.includes(id)
          ).slice(0, minBatchSize - newlyVisibleProjects.length)
          
          newlyVisibleProjects.push(...nextIds)
        }

        // Add all newly visible projects with staggered timing
        newlyVisibleProjects.forEach((id, index) => {
          setTimeout(() => {
            visibleProjects.value.push(id)
          }, index * animationDelay)
        })
      }
    }, observerOptions)

    // Wait for DOM to be ready then observe all project cards
    nextTick(() => {
      const projectCards = document.querySelectorAll('.project-card')
      projectCards.forEach(card => {
        observer.observe(card)
      })
    })
  })

  // Check if a project is visible
  const isProjectVisible = (projectId: number) => {
    return visibleProjects.value.includes(projectId)
  }
</script>

<template>
  <section id="projects" class="projects-section px-6 py-20">
    <div class="container mx-auto max-w-[90%]">
      <h2 class="mb-12 text-3xl font-bold text-center md:text-4xl">
        {{ t('projects.title') }}
      </h2>
      <p class="mx-auto mb-12 max-w-2xl text-center text-gray-400">
        {{ t('projects.description') }}
      </p>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div 
          v-for="project in projects"
          :key="project.id"
          :data-project-id="project.id"
          class="project-card transition-all duration-700 transform"
          :class="isProjectVisible(project.id) ? 'opacity-100' : 'opacity-0'"
        >
          <ProjectCard
            :title="project.title"
            :description="project.description"
            :image="project.image"
            :technologies="project.technologies"
            :github-link="project.githubLink"
            :demo-link="project.demoLink"
          />
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
