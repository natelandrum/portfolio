import { ref, onMounted, onUnmounted } from 'vue'

interface SwipeGestureOptions {
  edgeThreshold?: number
  swipeThreshold?: number
  onOpen?: () => void
  onClose?: () => void
}

export function useSwipeGesture(
  isMenuOpen: Ref<boolean>,
  options: SwipeGestureOptions = {}
) {
  const {
    edgeThreshold = 20,
    swipeThreshold = 100,
    onOpen,
    onClose
  } = options

  // Swipe gesture variables
  const swipeStartX = ref(0)
  const swipeStartY = ref(0)
  const swipeCurrentX = ref(0)
  const isSwipeActive = ref(false)
  const swipeType = ref<'open' | 'close' | null>(null)

  const handleTouchStart = (event: TouchEvent) => {
    // Only detect touches on mobile screens
    if (window.innerWidth >= 1024) return
    
    const touch = event.touches[0]
    const screenWidth = window.innerWidth
    
    // Swipe to open: start from right edge when menu is closed
    if (!isMenuOpen.value && touch.clientX >= screenWidth - edgeThreshold) {
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
      if (swipeDistance >= swipeThreshold && verticalDistance < 100) {
        isMenuOpen.value = true
        onOpen?.()
      }
    } else if (swipeType.value === 'close') {
      // Swipe right to close (from anywhere toward right)
      const swipeDistance = swipeCurrentX.value - swipeStartX.value
      if (swipeDistance >= swipeThreshold / 2 && verticalDistance < 100) {
        isMenuOpen.value = false
        onClose?.()
      }
    }
    
    // Reset swipe state
    isSwipeActive.value = false
    swipeType.value = null
    swipeStartX.value = 0
    swipeStartY.value = 0
    swipeCurrentX.value = 0
  }

  onMounted(() => {
    document.addEventListener('touchstart', handleTouchStart, { passive: false })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)
  })

  onUnmounted(() => {
    document.removeEventListener('touchstart', handleTouchStart)
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
  })

  return {
    isSwipeActive: readonly(isSwipeActive),
    swipeType: readonly(swipeType)
  }
}