import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const avatar = ref('')

  const setAvatar = (useravatar: string) => {
    avatar.value = useravatar
  }
  return {
    avatar,
    setAvatar
  }
})
