<script setup lang="ts">
  import TopIcon from '@/assets/icons/top.svg'
  import HomeIcon from '@/assets/icons/home.svg'
  import ProjectIcon from '@/assets/icons/project.svg'
  import ResumeIcon from '@/assets/icons/resume.svg'
  import AboutIcon from '@/assets/icons/about.svg'
  import { watch, onUnmounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  const isMenuOpen = ref(false)
  const { t } = useTranslation()
  const { showScrollTop } = useScroll()
  const route = useRoute()

  // Refs for the elements
  const mobileMenuButton = ref<HTMLElement | null>(null)
  const mobileSidebar = ref<HTMLElement | null>(null)

  // Swipe gesture variables
  const swipeStartX = ref(0)
  const swipeStartY = ref(0)
  const swipeCurrentX = ref(0)
  const isSwipeActive = ref(false)
  const swipeType = ref<'open' | 'close' | null>(null)
  const EDGE_THRESHOLD = 20 // pixels from right edge to start swipe
  const SWIPE_THRESHOLD = 100 // minimum swipe distance to open/close menu

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  function scrollToSection(id: string) {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleClickOutside = (event: Event) => {
    if (!isMenuOpen.value) return

    const target = event.target as Node
    const button = mobileMenuButton.value
    const sidebar = mobileSidebar.value

    if (
      button && !button.contains(target) &&
      sidebar && !sidebar.contains(target)
    ) {
      isMenuOpen.value = false
    }
  }

  // Swipe gesture handlers
  const handleTouchStart = (event: TouchEvent) => {
    // Only detect touches on mobile screens
    if (window.innerWidth >= 768) return
    
    const touch = event.touches[0]
    const screenWidth = window.innerWidth
    
    // Swipe to open: start from right edge when menu is closed
    if (!isMenuOpen.value && touch.clientX >= screenWidth - EDGE_THRESHOLD) {
      isSwipeActive.value = true
      swipeType.value = 'open'
      swipeStartX.value = touch.clientX
      swipeStartY.value = touch.clientY
      swipeCurrentX.value = touch.clientX
    }
    // Swipe to close: start from anywhere when menu is open
    else if (isMenuOpen.value) {
      isSwipeActive.value = true
      swipeType.value = 'close'
      swipeStartX.value = touch.clientX
      swipeStartY.value = touch.clientY
      swipeCurrentX.value = touch.clientX
    }
  }

  const handleTouchMove = (event: TouchEvent) => {
    if (!isSwipeActive.value) return
    
    const touch = event.touches[0]
    swipeCurrentX.value = touch.clientX
    
    // Calculate swipe distance
    const swipeDistance = swipeStartX.value - touch.clientX
    const verticalDistance = Math.abs(touch.clientY - swipeStartY.value)
    
    // Ensure it's a horizontal swipe (not vertical scroll)
    if (verticalDistance > 50) {
      isSwipeActive.value = false
      return
    }
    
    // Prevent default scrolling if we're in a valid swipe
    if (swipeDistance > 20) {
      event.preventDefault()
    }
  }

  const handleTouchEnd = (event: TouchEvent) => {
    if (!isSwipeActive.value) return
    
    const verticalDistance = Math.abs(event.changedTouches[0].clientY - swipeStartY.value)
    
    if (swipeType.value === 'open') {
      // Swipe left to open (from right edge toward left)
      const swipeDistance = swipeStartX.value - swipeCurrentX.value
      if (swipeDistance >= SWIPE_THRESHOLD && verticalDistance < 100) {
        isMenuOpen.value = true
      }
    } else if (swipeType.value === 'close') {
      // Swipe right to close (from anywhere toward right)
      const swipeDistance = swipeCurrentX.value - swipeStartX.value
      if (swipeDistance >= SWIPE_THRESHOLD / 2 && verticalDistance < 100) {
        isMenuOpen.value = false
      }
    }
    
    // Reset swipe state
    isSwipeActive.value = false
    swipeType.value = null
    swipeStartX.value = 0
    swipeStartY.value = 0
    swipeCurrentX.value = 0
  }

  // Watch for menu changes to handle body scroll
  watch(isMenuOpen, (newValue) => {
    if (process.client) {
      if (newValue) {
        // Prevent body scroll when menu is open
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = `${scrollBarWidth}px`
      } else {
        // Restore body scroll when menu is closed
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }
    }
  })

  onMounted(() => {
    // Add event listeners
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('touchstart', handleTouchStart, { passive: false })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)
  })

  onUnmounted(() => {
    // Remove all event listeners
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('touchstart', handleTouchStart)
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
    
    // Reset body styles
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  })
</script>

<template>
  <nav id="nav" class="px-6 py-4 w-full max-w-[90%] rounded-xl border border-gray-200 mt-4 z-10">
    <div class="container flex items-center justify-between mx-auto">
      <!-- Logo -->
       <router-link to="/">
         <div class="flex items-center cursor-pointer">
            <img src="/assets/logo.png" alt="logo" class="w-14 h-auto rounded-full mr-4 py-0" />
            <div class="text-xl font-bold uppercase">{{ t('contact.myName') }}</div>
         </div>
       </router-link>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center">
        <router-link to="/">
          <div
            class="px-3 py-2 blue flex border-0!"
            :class="{ 'active' : route.path === '/' }"
            >
            <HomeIcon class="mr-2 h-6 w-5"/>
            {{ t('navbar.home') }}
          </div>
        </router-link>
        <router-link to="/projects">
          <div
            class="px-3 py-2 flex blue border-0!"
            :class="{ 'active' : route.path === '/projects' }"
            >
            <ProjectIcon class="mr-2 h-6 w-5"/>
            {{ t('navbar.projects') }}
          </div>
        </router-link>
        <router-link to="/resume">
          <div
            class="px-3 py-2 blue flex border-0!"
            :class="{ 'active' : route.path === '/resume' }"
            >
            <ResumeIcon class="mr-1 h-6 w-5"/>
            {{ t('navbar.resume') }}
          </div>
        </router-link>
        <router-link to="/about">
          <div
            class="px-3 py-2 blue flex border-0!"
            :class="{ 'active' : route.path === '/about' }"
            >
            <AboutIcon class="mr-1 h-6 w-5"/>
            {{ t('navbar.about') }}
          </div>
        </router-link>

        <LanguageToggle />
      </div>

      <!-- Mobile Menu Button (only show when menu is closed) -->
      <button
        v-show="!isMenuOpen"
        ref="mobileMenuButton"
        @click="toggleMenu"
        class="md:hidden cursor-pointer text-light focus:outline-none relative z-[60] transition-all duration-300 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 transition-all duration-300 ease-in-out"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
            class="transition-all duration-300 ease-in-out"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Sidebar -->
    <div
      ref="mobileSidebar"
      class="mobile-sidebar fixed top-0 right-0 bg-black h-[100vh] w-64 shadow-lg z-[50] md:hidden transform transition-transform duration-300 ease-in-out"
      :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <!-- Close button inside menu -->
      <div class="flex justify-end mr-[10%] mt-[2rem] p-4">
        <button
          @click="toggleMenu"
          class="cursor-pointer text-white focus:outline-none transition-all duration-300 ease-in-out hover:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 transition-all duration-300 ease-in-out"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
              class="transition-all duration-300 ease-in-out"
            />
          </svg>
        </button>
      </div>
      
      <div class="flex flex-col pt-4 px-6 mb-4">
        <LanguageToggle />
        <router-link to="/" @click="isMenuOpen = false">
          <div
            class="px-3 py-3 mt-4 flex rounded-lg blue border-0!"
            :class="{ 'active' : route.path === '/' }"
            >
            <HomeIcon class="mr-2 h-6 w-5"/>
            {{ t('navbar.home') }}
          </div>
        </router-link>
        <router-link to="/projects" @click="isMenuOpen = false">
          <div
            class="px-3 py-3 flex rounded-lg blue border-0!"
            :class="{ 'active' : route.path === '/projects' }"
            >
            <ProjectIcon class="mr-2 h-6 w-5"/>
            {{ t('navbar.projects') }}
          </div>
        </router-link>
        <router-link to="/resume" @click="isMenuOpen = false">
          <div
            class="px-3 py-3 flex rounded-lg blue border-0!"
            :class="{ 'active' : route.path === '/resume' }"
            >
            <ResumeIcon class="mr-2 h-6 w-5"/>
            {{ t('navbar.resume') }}
          </div>
        </router-link>
        <router-link to="/about" @click="isMenuOpen = false">
          <div
            class="px-3 py-3 flex rounded-lg blue border-0!"
            :class="{ 'active' : route.path === '/about' }"
            >
            <AboutIcon class="mr-2 h-6 w-5"/>
            {{ t('navbar.about') }}
          </div>
        </router-link>
      </div>
    </div>
  </nav>

  <!-- Scroll to top button -->
  <div
    v-show="showScrollTop"
    @click="scrollToSection('nav')"
    class="fixed bottom-6 right-6 bg-gray-800 hover:bg-gray-700 text-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 z-50"
    title="Scroll to top"
  >
    <TopIcon class="w-6 h-6" />
  </div>
</template>