import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
export const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


export * from './modules/user'
export * from './modules/global'