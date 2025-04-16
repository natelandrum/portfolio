import { ref, onMounted, onUnmounted } from 'vue'

export function useScroll() {
  const showScrollTop = ref(false)

  // Scroll to section method
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      return true
    }
    return false
  }

  // Handle scroll event
  const handleScroll = () => {
    showScrollTop.value = window.scrollY > 400
  }

  // Setup scroll event listeners
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    showScrollTop,
    scrollToSection
  }
}
