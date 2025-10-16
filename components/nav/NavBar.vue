<script setup lang="ts">
  import { watch } from 'vue'
  import { useRoute } from 'vue-router'
  
  const isMenuOpen = ref(false)
  const { t } = useTranslation()
  const route = useRoute()

  // Refs for the elements
  const mobileMenuButton = ref<any>(null)
  const navMenu = ref<any>(null)

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const closeMenu = () => {
    isMenuOpen.value = false
  }

  const handleClickOutside = (event: Event) => {
    if (!isMenuOpen.value) return

    const target = event.target as Node
    
    // Get the actual DOM elements from component refs
    const buttonElement = mobileMenuButton.value?.$el || mobileMenuButton.value
    const menuElement = navMenu.value?.$el || navMenu.value

    // Check if click is outside both button and menu
    if (
      buttonElement && !buttonElement.contains(target) &&
      menuElement && !menuElement.contains(target)
    ) {
      isMenuOpen.value = false
    }
  }

  // Use swipe gesture composable
  useSwipeGesture(isMenuOpen)

  // Watch for menu changes to handle body scroll
  watch(isMenuOpen, (newValue) => {
    if (import.meta.client) {
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
    // Add click outside listener
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    // Remove click outside listener
    document.removeEventListener('click', handleClickOutside)
    
    // Reset body styles
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  })
</script>

<template>
  <nav id="nav" class="px-6 py-4 w-full max-w-[90%] rounded-xl border border-gray-200 mt-4 z-10">
    <div class="flex items-center justify-between w-full">
      <!-- Logo -->
       <router-link to="/">
         <div class="flex items-center cursor-pointer">
            <img src="/assets/logo.png" alt="logo" class="w-14 h-auto rounded-full mr-4 py-0" />
            <div class="text-xl font-bold uppercase">{{ t('contact.myName') }}</div>
         </div>
       </router-link>

      <!-- Navigation Menu -->
      <NavMenu 
        ref="navMenu"
        :is-menu-open="isMenuOpen" 
        :route="route"
        @close="closeMenu"
      />

      <!-- Mobile Menu Button -->
      <NavMenuButton 
        ref="mobileMenuButton"
        :is-menu-open="isMenuOpen"
        @toggle="toggleMenu"
      />
    </div>
  </nav>

  <!-- Scroll to top button -->
  <NavScrollToTop />
</template>