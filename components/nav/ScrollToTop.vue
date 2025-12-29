<script setup lang="ts">
import TopIcon from '@/assets/icons/top.svg'

const { showScrollTop } = useScroll()

function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div
    v-show="showScrollTop"
    @click="scrollToSection('nav')"
    class="group fixed bottom-6 right-6 bg-gray-600 hover:bg-gray-700 text-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 z-50 hover:text-blue-500 hover:scale-110"
    title="Scroll to top"
  >
    <TopIcon class="group-hover:scale-110 w-6 h-6" />
  </div>
</template>