declare module '@quasar/extras/animate/animate-list.mjs' {
  import type { QuasarGeneralAnimations, QuasarInAnimations, QuasarOutAnimations } from 'quasar'
  export const generalAnimations: QuasarGeneralAnimations[]
  export const inAnimations: QuasarInAnimations[]
  export const outAnimations: QuasarOutAnimations[]
}

declare module '#build/quasar.config.mjs' {
  import type { QuasarLanguage, QuasarIconSet, AddressbarColor, Notify, Loading, LoadingBar } from 'quasar'

  export const componentsWithDefaults: Record<string, { props: Record<string, any> }>

  export const quasarNuxtConfig: {
    lang?: QuasarLanguage
    iconSet: QuasarIconSet
    config?: any
    components: { defaults?: Record<string, Record<string, any>> }
    plugins: { // Plugins with configurable defaults that are required to be explicity set
      AddressbarColor?: AddressbarColor
      Loading?: Loading
      LoadingBar?: LoadingBar
      Notify?: Notify
    }
  }

  export const appConfigKey: string
}

declare module 'quasar/src/composables/use-quasar.js' {
  import type { QVueGlobals } from 'quasar'
  const useQuasar: () => QVueGlobals
  export = useQuasar
}

declare module 'quasar/src/vue-plugin.js' {
  import type { Plugin } from 'vue'
  const Quasar: Plugin
  export = Quasar
}
