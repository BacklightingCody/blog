<template>
  <div class="user-meta">
    <div class="user-meta__avatar">
      <Avatar :src="avatar" :size="avatarSize" :rainbow="false" />
    </div>
    <div class="user-meta__content">
      <div class="user-meta__info">
        <div class="user-meta__name-badges">
          <span class="user-meta__name">{{ nickname }}</span>
          <slot name="badges"></slot>
        </div>
        <p v-if="bio" class="user-meta__bio">{{ bio }}</p>
      </div>
      <div class="user-meta__main">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from '@/components/Avatar.vue'

defineProps({
  avatar: { type: String, required: true },
  nickname: { type: String, required: true },
  bio: { type: String, default: '' },
  avatarSize: { 
    type: [String, Number], 
    default: 'middle'
  }
})
</script>

<style scoped lang="scss">
.user-meta {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  &__avatar {
    flex-shrink: 0;
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__info {
    margin-bottom: 0.25rem;
  }

  &__name-badges {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  &__name {
    color: #FB7299;
    font-weight: 500;
  }

  &__bio {
    font-size: 0.875rem;
    color: #666;
    margin: 0.25rem 0 0;
  }

  &__main {
    font-size: 0.875rem;
  }
}
</style>