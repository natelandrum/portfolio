<script setup lang="ts">
  import TopIcon from '@/assets/icons/top.svg'
  const isMenuOpen = ref(false)
  const { t } = useTranslation()
  const { showScrollTop, scrollToSection } = useScroll()

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const navigateToSection = (id: string) => {
    scrollToSection(id)
    isMenuOpen.value = false
  }
</script>

<template>
  <nav id="nav" class="px-6 py-4 w-full max-w-[90%] rounded-xl border border-gray-200 mt-4 z-10">
    <div class="container flex items-center justify-between mx-auto">
      <!-- Logo -->
       <div class="flex items-center cursor-pointer" @click="navigateToSection('nav')">
          <img src="/assets/logo.png" alt="logo" class="w-14 h-auto rounded-full mr-4 py-0" />
          <div class="text-xl font-bold uppercase">{{ t('contact.myName') }}</div>
       </div>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center">
        <div
          class="px-3 py-2 green border-0!"
          @click="navigateToSection('nav')"
          >{{ t('navbar.home') }}
        </div>
        <div
          class="px-3 py-2 green border-0!"
          @click="navigateToSection('projects')"
          >{{ t('navbar.projects') }}
        </div>
        <div
          class="px-3 py-2 green border-0!"
          @click="navigateToSection('skills')"
          >{{ t('navbar.skills') }}
        </div>
        <div
          class="px-3 py-2 green border-0!"
          @click="navigateToSection('contact')"
          >{{ t('navbar.contact') }}
        </div>

        <LanguageToggle />
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMenu"
        class="md:hidden cursor-pointer text-light focus:outline-none relative z-[60]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            v-if="!isMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Sidebar -->
    <div
      class="fixed top-0 right-0 bg-black h-full w-64 shadow-lg z-[50] md:hidden transform transition-transform duration-300 ease-in-out"
      :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="flex flex-col pt-20 px-6">
        <LanguageToggle />
        <div
          class="px-3 py-3 rounded-lg green border-0!"
          @click="navigateToSection('home')"
          >{{ t('navbar.home') }}</div
        >
        <div
          class="px-3 py-3 rounded-lg green border-0!"
          @click="navigateToSection('projects')"
          >{{ t('navbar.projects') }}</div
        >
        <div
          class="px-3 py-3 rounded-lg green border-0!"
          @click="navigateToSection('skills')"
          >{{ t('navbar.skills') }}</div
        >
        <div
          class="px-3 py-3 rounded-lg green border-0!"
          @click="navigateToSection('contact')"
          >{{ t('navbar.contact') }}</div
        >
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
