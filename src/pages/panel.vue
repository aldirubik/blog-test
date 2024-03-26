<script setup>
import { computed, onMounted, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'
import { groupPostsByUser } from '@/utils/helpers'
const router = useRouter()
const userId = computed(() => store.user)
const posts = computed(() => store.posts)
const todayPosts = computed(() => store.createdPosts)
const totalPosts = ref(null)
const createdPosts = ref([])
const userPosition = ref(null)

const setupDashboard = () => {
  getTotalPosts()
  getTodayPosts()
  getUserPosition()
}

const getTotalPosts = () => {
  totalPosts.value = posts.value.reduce((total, post) => {
    const { userId } = post
    if (userId === Number(store.user)) {
      total++
    }
    return total
  }, 0)
}

const getTodayPosts = () => {
  createdPosts.value = todayPosts.value.length
}

watch(
  () => store.createdPosts,
  (posts) => {
    createdPosts.value = posts.length
  },
  { deep: true }
)

watch(
  () => store.posts,
  (posts) => {
    totalPosts.value = posts.reduce((total, post) => {
      const { userId } = post
      if (userId === Number(store.user)) {
        total++
      }
      return total
    }, 0)
    const positions = groupPostsByUser(posts)
    const index = positions.findIndex((pos) => pos.userId === userId.value)
    userPosition.value = index + 1
  },
  { deep: true }
)

const getUserPosition = () => {
  const positions = groupPostsByUser(store.posts)
  const index = positions.findIndex((pos) => pos.userId === userId.value)
  userPosition.value = index + 1
}

onMounted(async () => {
  if (!userId.value) await router.push('/')
  else setupDashboard()
})
</script>

<template>
  <v-container class="custom-height">
    <v-row>
      <v-col>
        <h3>Welcome user {{ userId }}</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="4">
        <v-card title="Your total posts">
          <v-card-text>
            <h4 class="card-text">{{ totalPosts }}</h4>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card title="Posts created today">
          <v-card-text>
            <h4 class="card-text">{{ createdPosts }}</h4>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card
          title="Your position"
          :class="[userPosition < 3 ? 'user-featured' : '']"
        >
          <v-card-text>
            <h4 class="card-text">
              {{ userPosition }}
            </h4>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <create-post />
      </v-col>
      <v-col cols="12" sm="6">
        <leaderboard />
      </v-col>
    </v-row>
  </v-container>
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
.card-text {
  font-size: 64px;
  line-height: 80px;
}
.user-featured {
  border: 1px solid #59b259 !important;
  background: rgba(89, 178, 89, 0.2078431373) !important;
}
</style>
