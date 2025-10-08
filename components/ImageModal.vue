<script setup lang="ts">
type Props = {
  images: string[]
  currentIndex: number
  isOpen: boolean
}

type Emits = {
  close: []
  updateIndex: [index: number]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const currentImageIndex = ref(props.currentIndex)

watch(() => props.currentIndex, (newIndex) => {
  currentImageIndex.value = newIndex
})

const nextImage = () => {
  if (currentImageIndex.value < props.images.length - 1) {
    currentImageIndex.value++
    emit('updateIndex', currentImageIndex.value)
  }
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
    emit('updateIndex', currentImageIndex.value)
  }
}

const goToImage = (index: number) => {
  currentImageIndex.value = index
  emit('updateIndex', index)
}

const closeModal = () => {
  emit('close')
}

// Handle keyboard navigation
const handleKeydown = (e: KeyboardEvent) => {
  if (!props.isOpen) return
  
  switch (e.key) {
    case 'Escape':
      closeModal()
      break
    case 'ArrowLeft':
      prevImage()
      break
    case 'ArrowRight':
      nextImage()
      break
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// Prevent body scroll when modal is open
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        @click="closeModal"
      >
        <div class="relative w-full h-full flex items-center justify-center p-4" @click.stop>
          <!-- Close Button -->
          <button
            class="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 hover:scale-110"
            @click="closeModal"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- Previous Button -->
          <button
            v-if="images.length > 1 && currentImageIndex > 0"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 hover:scale-110"
            @click="prevImage"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <!-- Next Button -->
          <button
            v-if="images.length > 1 && currentImageIndex < images.length - 1"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 hover:scale-110"
            @click="nextImage"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <!-- Image -->
          <div class="relative max-w-full max-h-full">
            <img
              :src="images[currentImageIndex]"
              :alt="`Gallery image ${currentImageIndex + 1}`"
              class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            
            <!-- Image Counter -->
            <div
              v-if="images.length > 1"
              class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              {{ currentImageIndex + 1 }} / {{ images.length }}
            </div>
          </div>

          <!-- Thumbnail Navigation -->
          <div
            v-if="images.length > 1"
            class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/70 p-3 rounded-xl"
          >
            <button
              v-for="(image, index) in images"
              :key="index"
              class="w-12 h-8 rounded overflow-hidden transition-all duration-300"
              :class="[
                index === currentImageIndex 
                  ? 'ring-2 ring-primary scale-110' 
                  : 'opacity-60 hover:opacity-100 hover:scale-105'
              ]"
              @click="goToImage(index)"
            >
              <img
                :src="image"
                :alt="`Thumbnail ${index + 1}`"
                class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>