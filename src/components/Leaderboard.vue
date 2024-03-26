<script setup>
import { computed, watch } from 'vue'
import { store } from '../store'
import { groupPostsByUser } from '@/utils/helpers'

const loading = computed(() => store.loadingPosts)

const leaderboardPosts = computed({
  get: () => store.leaderboardPosts,
  set: (value) => {
    store.leaderboardPosts = value
  },
})

watch(
  () => store.posts,
  (posts) => {
    leaderboardPosts.value = groupPostsByUser(posts)
  },
  { deep: true }
)
</script>
<template>
  <h4 class="leaderboard-header">Posts Leaderboard</h4>
  <div class="leaderboard-container">
    <div class="loading" v-for="i in 10" :key="i">
      <v-skeleton-loader
        v-if="loading"
        type="list-item-two-line"
      ></v-skeleton-loader>
    </div>
    <div class="users" v-for="(post, index) in leaderboardPosts" :key="index">
      <div class="user" :class="[index < 3 ? 'post-featured' : '']">
        User with id: <b>{{ post.userId }}</b> has
        <b>{{ post.totalPosts }}</b> total posts.
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.leaderboard-header {
  margin-bottom: 16px;
}
.leaderboard-container {
  max-height: 450px;
  overflow: auto;
  padding-right: 6px;
  .users {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    .user {
      padding: 10px 16px;
      width: 100%;
      background: #eee;
      margin-bottom: 12px;
      border-radius: 8px;
    }
    .user.post-featured {
      border: 1px solid #59b259;
      background: #59b25935 !important;
    }
  }
}
</style>
