<script setup lang="ts">

const { t } = useTranslation()

type Props = {
  title: string
  galleryImages?: string[]
  mainImage?: string
}

const props = defineProps<Props>()

// State for carousel and modal
const currentVisibleStart = ref(0)
const isModalOpen = ref(false)
const modalCurrentIndex = ref(0)
const VISIBLE_COUNT = 2

// Generate images array with fallbacks
const images = computed(() => {
  const galleryImages = props.galleryImages || []
  const mainImage = props.mainImage

  // If we have gallery images, use them
  if (galleryImages.length > 0) {
    // If main image exists and isn't in gallery, add it at the beginning
    if (mainImage && !galleryImages.includes(mainImage)) {
      return [mainImage, ...galleryImages]
    }
    return galleryImages
  }

  // If we only have main image, use it
  if (mainImage) {
    return [mainImage]
  }

  // No images available
  return []
})

// Placeholder data for when no images are available
const placeholderImages = [
  { label: 'Main Interface', alt: 'Main application interface' },
  { label: 'Dashboard View', alt: 'Dashboard overview' }
]

// Display images (either real images or placeholders up to 2)
const displayImages = computed(() => {
  if (images.value.length === 0) {
    return placeholderImages
  }
  
  if (images.value.length === 1) {
    return [
      { src: images.value[0], alt: `${props.title} - Main View` },
      { label: 'Coming Soon', alt: 'Additional views coming soon' }
    ]
  }
  
  // For 2+ images, show current window
  return images.value.slice(currentVisibleStart.value, currentVisibleStart.value + VISIBLE_COUNT).map((src, index) => ({
    src,
    alt: `${props.title} - View ${currentVisibleStart.value + index + 1}`
  }))
})

const canScrollUp = computed(() => currentVisibleStart.value > 0)
const canScrollDown = computed(() => images.value.length > VISIBLE_COUNT && currentVisibleStart.value < images.value.length - VISIBLE_COUNT)

const scrollUp = () => {
  if (canScrollUp.value) {
    currentVisibleStart.value = Math.max(0, currentVisibleStart.value - 1)
  }
}

const scrollDown = () => {
  if (canScrollDown.value) {
    currentVisibleStart.value = Math.min(images.value.length - VISIBLE_COUNT, currentVisibleStart.value + 1)
  }
}

const openModal = (index: number) => {
  if (images.value.length > 0) {
    modalCurrentIndex.value = index
    isModalOpen.value = true
  }
}

const closeModal = () => {
  isModalOpen.value = false
}

const updateModalIndex = (index: number) => {
  modalCurrentIndex.value = index
}
</script>

<template>
  <div class="bg-gradient-to-br flex flex-col items-center from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
    <div class="mb-4 self-start">
      <h3 class="text-xl font-bold text-white flex items-center">
        <svg class="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        {{ t('projects.gallery') }}
      </h3>
    </div>

    <!-- Scroll Up Button -->
    <div v-if="images.length > VISIBLE_COUNT" class="flex justify-center mb-3">
      <button
        :disabled="!canScrollUp"
        :class="[
          'inline-flex items-center px-3 py-2 rounded-lg transition-all duration-300 border',
          canScrollUp 
            ? 'bg-gray-800/50 hover:bg-gray-700 text-white border-gray-600/50 hover:border-primary/50 hover:scale-105 cursor-pointer' 
            : 'bg-gray-900/50 text-gray-600 border-gray-700/30 cursor-not-allowed'
        ]"
        @click="scrollUp"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
        </svg>
      </button>
    </div>

    <!-- Carousel Container with Overflow Hidden -->
    <div class="relative overflow-hidden w-[18rem] sm:w-sm md:w-md lg:w-auto h-[332px]">
      <div 
        class="transition-transform duration-500 ease-in-out flex flex-col gap-3"
        :style="{ transform: `translateY(-${currentVisibleStart * 172}px)` }"
      >
        <!-- Show all images in a scrollable container -->
        <template v-if="images.length === 0">
          <!-- No images - show placeholders -->
          <div
            v-for="(placeholder, index) in placeholderImages"
            :key="`placeholder-${index}`"
            class="rounded-lg h-[160px] overflow-hidden bg-gray-700/50 aspect-video flex items-center justify-center transition-all duration-300 flex-shrink-0"
          >
            <div class="text-center">
              <span class="text-gray-400 text-sm">{{ placeholder.label }}</span>
            </div>
          </div>
        </template>
        
        <template v-else-if="images.length === 1">
          <!-- One image + coming soon -->
          <div
            class="rounded-lg h-[160px] overflow-hidden bg-gray-700/50 aspect-video flex items-center justify-center transition-all duration-300 flex-shrink-0 hover:scale-105 cursor-pointer group"
            @click="openModal(0)"
          >
            <img
              :src="images[0]"
              :alt="`${title} - Main View`"
              class="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
            />
          </div>
          <div
            class="rounded-lg h-[160px] overflow-hidden bg-gray-700/50 aspect-video flex items-center justify-center transition-all duration-300 flex-shrink-0"
          >
            <div class="text-center">
              <span class="text-gray-400 text-sm">Coming Soon</span>
              <div class="mt-1 text-xs text-gray-500">
                More views coming
              </div>
            </div>
          </div>
        </template>
        
        <template v-else>
          <!-- Multiple images -->
          <div
            v-for="(image, index) in images"
            :key="`image-${index}`"
            class="rounded-lg h-[160px] overflow-hidden bg-gray-700/50 aspect-video flex items-center justify-center transition-all duration-300 flex-shrink-0 hover:scale-105 cursor-pointer group"
            @click="openModal(index)"
          >
            <img
              :src="image"
              :alt="`${title} - View ${index + 1}`"
              class="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
            />
          </div>
        </template>
      </div>
    </div>

    <!-- Scroll Down Button -->
    <div v-if="images.length > VISIBLE_COUNT" class="flex justify-center mt-3">
      <button
        :disabled="!canScrollDown"
        :class="[
          'inline-flex items-center px-3 py-2 rounded-lg transition-all duration-300 border',
          canScrollDown 
            ? 'bg-gray-800/50 hover:bg-gray-700 text-white border-gray-600/50 hover:border-primary/50 hover:scale-105 cursor-pointer' 
            : 'bg-gray-900/50 text-gray-600 border-gray-700/30 cursor-not-allowed'
        ]"
        @click="scrollDown"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
    </div>

    <!-- Image Modal -->
    <ImageModal
      v-if="images.length > 0"
      :images="images"
      :current-index="modalCurrentIndex"
      :is-open="isModalOpen"
      @close="closeModal"
      @update-index="updateModalIndex"
    />
  </div>
</template>