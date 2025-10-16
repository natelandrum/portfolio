<script setup lang="ts">
interface Props {
  isMenuOpen: boolean
}

defineProps<Props>()
defineEmits<{
  toggle: []
}>()
</script>

<template>
  <button
    class="lg:hidden cursor-pointer focus:outline-none transition-all duration-300 ease-in-out"
    :class="isMenuOpen ? 'z-[60] text-white' : 'relative z-[60] text-light'"
    @click="$emit('toggle')"
  >
    <div class="w-6 h-6 flex flex-col justify-center items-center">
      <!-- Top line -->
      <span
        class="block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out"
        :class="isMenuOpen ? 'rotate-45 translate-y-0.5' : 'rotate-0 translate-y-0 mb-1'"
      ></span>
      <!-- Middle line -->
      <span
        class="block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out"
        :class="isMenuOpen ? 'opacity-0' : 'opacity-100 mb-1'"
      ></span>
      <!-- Bottom line -->
      <span
        class="block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out"
        :class="isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'rotate-0 translate-y-0'"
      ></span>
    </div>
  </button>
</template>