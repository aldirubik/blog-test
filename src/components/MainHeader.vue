<script setup lang="ts">
import { computed } from 'vue'
import { store } from '../store'
import { useRoute, useRouter } from 'vue-router'

const userId = computed(() => store.user)

const router = useRouter()
const route = useRoute()

const onLoginModal = () => {
  store.showLoginModal = true
}

const forwardPanel = () => {
  router.push('/panel')
}
</script>

<template>
  <v-toolbar>
    <v-toolbar-title>Leaderboard Test App</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      v-if="!userId"
      prepend-icon="mdi-account"
      class="text-white"
      color="blue-darken-4"
      rounded="4"
      variant="flat"
      @click="onLoginModal"
    >
      Login
    </v-btn>
    <v-btn
      v-else-if="userId && route.path !== '/panel'"
      prepend-icon="mdi-view-dashboard-outline"
      class="text-white"
      color="blue-darken-4"
      rounded="4"
      variant="flat"
      @click="forwardPanel"
    >
      Panel
    </v-btn>
    <v-btn
      v-else
      prepend-icon="mdi-view-dashboard-outline"
      class="text-white"
      color="blue-darken-4"
      rounded="4"
      variant="flat"
      @click="router.push('/')"
    >
      Home
    </v-btn>
  </v-toolbar>
</template>
