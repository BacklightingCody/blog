<template>
  <div class="reply-list ml-12 mt-4 space-y-4 border-l-2 border-gray-100 pl-4">
    <div
      v-for="reply in replies"
      :key="reply.id"
    >
      <UserMeta
        :avatar="reply.user.avatar"
        :nickname="reply.user.nickname"
        size="small"
      >
        <template #badges>
          <span v-if="reply.replyTo" class="text-gray-500 text-sm">
            回复 <span class="text-[#FB7299]">@{{ reply.replyTo }}</span>
          </span>
        </template>
        <template #default>
          <p class="mt-1 text-gray-900">{{ reply.content }}</p>
          <div class="mt-2 flex items-center gap-6 text-sm text-gray-500">
            <span>{{ reply.time }}</span>
            <div class="flex items-center gap-6">
              <button
                class="flex items-center gap-1 hover:text-[#FB7299]"
                @click="$emit('like', reply)"
              >
                <ThumbsUpIcon class="w-4 h-4" />
                <span>{{ reply.likes }}</span>
              </button>
              <button
                class="hover:text-[#FB7299]"
                @click="$emit('reply', reply.user.nickname)"
              >
                回复
              </button>
            </div>
          </div>
        </template>
      </UserMeta>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Reply } from "@/interface/Comment";
import { ThumbsUpIcon } from "lucide-vue-next";

const props = defineProps<{
  replies: Reply[];
}>();

const emit = defineEmits<{
  (e: "like", reply: Reply): void;
  (e: "reply", nickname: string): void;
}>();
</script>

<style scoped>
.reply-list {
  padding-left: 1rem;
}
</style>
