<script setup lang="ts">
import HomeIcon from '@/assets/icons/home.svg'
import ProjectIcon from '@/assets/icons/project.svg'
import ResumeIcon from '@/assets/icons/resume.svg'
import AboutIcon from '@/assets/icons/about.svg'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

interface Props {
  isMenuOpen: boolean
  route: RouteLocationNormalizedLoaded
}

defineProps<Props>()
defineEmits<{
  close: []
}>()

const { t } = useTranslation()

// Prevent transitions during resize
const isResizing = ref(false)
let resizeTimeout: ReturnType<typeof setTimeout>

const handleResize = () => {
  isResizing.value = true
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    isResizing.value = false
  }, 150)
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  clearTimeout(resizeTimeout)
})
</script>

<template>
  <nav
    :class="[
      // Conditional transitions - disabled during resize
      !isResizing && 'transition-all duration-300 ease-in-out',
      
      // Desktop: horizontal layout, always visible, no mobile transforms
      'lg:flex lg:flex-row lg:items-center lg:relative lg:bg-transparent lg:shadow-none lg:w-auto lg:h-auto lg:pt-0 lg:px-0 lg:translate-x-0 lg:transform-none',
      
      // Mobile: vertical sidebar layout, only show when menu is open
      'fixed top-0 right-0 bg-black h-[100vh] w-64 shadow-lg z-[50] flex-col pt-16 px-6',
      
      // Mobile visibility and transform - only apply on mobile
      {
        'flex translate-x-0': isMenuOpen,
        'translate-x-full': !isMenuOpen
      }
    ]"
  >
    <!-- Language Toggle - appears at top on mobile, end on desktop -->
    <div class="lg:order-last lg:ml-4 mb-4 lg:mb-0">
      <NavLanguageToggle />
    </div>

    <!-- Navigation Links -->
    <router-link to="/" @click="$emit('close')" class="block">
      <div
        class="blue flex border-0! transition-all duration-200"
        :class="[
          // Desktop styling
          'lg:px-3 lg:py-2',
          // Mobile styling  
          'px-3 py-3 mb-2 lg:mb-0 rounded-lg lg:rounded-none',
          // Active state
          { 'active' : route.path === '/' }
        ]"
      >
        <HomeIcon class="mr-2 h-6 w-5"/>
        {{ t('navbar.home') }}
      </div>
    </router-link>

    <router-link to="/projects" @click="$emit('close')" class="block">
      <div
        class="blue flex border-0! transition-all duration-200"
        :class="[
          // Desktop styling
          'lg:px-3 lg:py-2',
          // Mobile styling
          'px-3 py-3 mb-2 lg:mb-0 rounded-lg lg:rounded-none',
          // Active state
          { 'active' : route.path === '/projects' }
        ]"
      >
        <ProjectIcon class="mr-2 h-6 w-5"/>
        {{ t('navbar.projects') }}
      </div>
    </router-link>

    <router-link to="/resume" @click="$emit('close')" class="block">
      <div
        class="blue flex border-0! transition-all duration-200"
        :class="[
          // Desktop styling
          'lg:px-3 lg:py-2',
          // Mobile styling
          'px-3 py-3 mb-2 lg:mb-0 rounded-lg lg:rounded-none',
          // Active state
          { 'active' : route.path === '/resume' }
        ]"
      >
        <ResumeIcon class="mr-2 h-6 w-5"/>
        {{ t('navbar.resume') }}
      </div>
    </router-link>

    <router-link to="/about" @click="$emit('close')" class="block">
      <div
        class="blue flex border-0! transition-all duration-200"
        :class="[
          // Desktop styling
          'lg:px-3 lg:py-2',
          // Mobile styling
          'px-3 py-3 mb-2 lg:mb-0 rounded-lg lg:rounded-none',
          // Active state
          { 'active' : route.path === '/about' }
        ]"
      >
        <AboutIcon class="mr-2 h-6 w-5"/>
        {{ t('navbar.about') }}
      </div>
    </router-link>
  </nav>
</template>