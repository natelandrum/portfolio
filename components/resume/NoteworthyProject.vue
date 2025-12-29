<script setup lang="ts">
const { t } = useTranslation()

type NoteworthyProject = {
    sectionTitle: string
    projectTitle: string
    description: string
    link?: string
    featuresTitle?: string
    features?: string[]
}

// Ensure your translation file returns an object for 'resume.noteworthyProject' that matches NoteworthyProject
const noteworthyProject = computed<NoteworthyProject>(() => t('resume.noteworthyProject') as unknown as NoteworthyProject)
</script>
<template>
    <div
        v-if="noteworthyProject"
        class="px-4 mb-8 sm:px-8 py-2"
    >
        <!-- Title -->
        <h2 class="text-lg font-bold text-gray-900 mb-3">
            {{ noteworthyProject.sectionTitle }}
        </h2>
        
        <!-- Summary Points -->
        <div 
            class="text-gray-700 text-sm"
        >
            <div class="flex items-center mb-2">
                <span class="ml-5 font-semibold text-base">{{ noteworthyProject.projectTitle }}</span>
            </div>
            <div class="flex flex-col ml-5">
                <div class="mb-1">
                    {{ noteworthyProject.description }}
                </div>
                <template v-if="noteworthyProject.features && noteworthyProject.features.length">
                    <div class="mt-2">
                        <span class="font-semibold">{{ noteworthyProject.featuresTitle }}</span>
                        <ul class="list-disc list-inside ml-4 space-y-1">
                            <li v-for="(feature, fIdx) in noteworthyProject.features" :key="fIdx">{{ feature }}</li>
                        </ul>
                    </div>
                </template>
                <template v-if="noteworthyProject.link">
                    <a :href="noteworthyProject.link" target="_blank" rel="noopener" class="mt-2 text-blue-600 underline break-all">
                        {{ noteworthyProject.link }}
                    </a>
                </template>
            </div>
        </div>
    </div>
</template>