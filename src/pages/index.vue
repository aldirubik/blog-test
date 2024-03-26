<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { store } from '../store'

const userId = computed(() => store.user)

const loading = computed({
  get: () => store.loadingPosts,
  set: (value: boolean) => {
    store.loadingPosts = value
  },
})

const getAllPosts = async () => {
  try {
    loading.value = true
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts?limit=50'
    )
    const data = await response.json()
    store.posts = data
  } catch (error) {
    console.error('Error on getAllPosts', error)
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 750)
  }
}
onMounted(async () => {
  if (!store.posts || store.posts.length === 0) await getAllPosts()
})
</script>

<template>
  <v-container class="custom-height">
    <v-row>
      <v-col cols="12">
        <div class="welcome-header">
          <h1>Welcome to Leaderboard app</h1>
          <p v-if="!userId">Please login to add a new post.</p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <winners />
      </v-col>
      <v-col cols="12" sm="6">
        <leaderboard />
      </v-col>
    </v-row>
  </v-container>
  <login-modal v-model="store.showLoginModal" />
</template>
<style scoped>
.custom-height {
  min-height: calc(100vh - 112px);
}
.welcome-header {
  text-align: center;
  padding-top: 4rem;
  padding-bottom: 2rem;
}
</style>
