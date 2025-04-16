import { computed } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { storeToRefs } from 'pinia'
import enTranslations from '@/locales/en.json'
import esTranslations from '@/locales/es.json'

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)]

type TranslationKey = NestedKeyOf<typeof enTranslations>

export function useTranslation() {
  const languageStore = useLanguageStore()
  const { language } = storeToRefs(languageStore) // 👈 make language reactive

  const t = computed(() => {
    return (key: TranslationKey): string => {
      const translations = language.value === 'ENG' ? enTranslations : esTranslations
      const keys = key.split('.')
      let result: any = translations

      for (const k of keys) {
        if (result[k as keyof typeof result]) {
          result = result[k as keyof typeof result]
        } else {
          console.warn(`Translation key not found: ${key}`)
          return key
        }
      }

      return result
    }
  })

  return {
    t: t.value,
    language, // stays reactive
    toggleLanguage: languageStore.toggleLanguage,
  }
}
