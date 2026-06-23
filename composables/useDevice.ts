import { ref, onMounted } from 'vue'
import { useNuxtApp } from 'nuxt/app'

export function useDevice() {
  const isMobile = ref(false)
  const isTouchDevice = ref(false)
  const isDesktop = ref(false)

  const detectFromUserAgent = () => {
    const nuxtApp = useNuxtApp()
    const ua = nuxtApp.ssrContext?.event?.node?.req?.headers?.['user-agent'] || ''
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
  }

  const updateDeviceState = () => {
    if (typeof window === 'undefined') return

    const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const smallScreen = window.innerWidth < 768
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches

    isTouchDevice.value = touchSupport
    isMobile.value = touchSupport && smallScreen && coarsePointer
    isDesktop.value = !isMobile.value && !coarsePointer
  }

  if (import.meta.server) {
    isMobile.value = detectFromUserAgent()
    isDesktop.value = !isMobile.value
  }

  onMounted(() => {
    updateDeviceState()
    window.addEventListener('resize', updateDeviceState)
  })

  return {
    isMobile,
    isTouchDevice,
    isDesktop
  }
}
