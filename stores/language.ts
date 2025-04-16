import { defineStore } from 'pinia'

export type Language = 'ENG' | 'SPA'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    language: 'ENG' as Language,
  }),
  actions: {
    toggleLanguage() {
      this.language = this.language === 'ENG' ? 'SPA' : 'ENG'
    },
  },
  persist: true,
})
