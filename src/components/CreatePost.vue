<script setup>
import { store } from '../store'
import { reactive, ref, computed } from 'vue'
import { useNotification } from '@kyvg/vue3-notification'
import { groupPostsByUser } from '@/utils/helpers'
const { notify } = useNotification()
const loading = ref(false)

const userId = computed(() => store.user)
const createdPosts = computed({
  get: () => store.createdPosts,
  set: (value) => {
    store.createdPosts = value
  },
})

const posts = computed({
  get: () => store.posts,
  set: (value) => {
    store.posts = value
  },
})

const postForm = reactive({
  title: '',
  body: '',
})

const titleRule = [
  (value) => {
    if (value) return true

    return 'You must enter a title.'
  },
]
const bodyRule = [
  (value) => {
    if (value) return true

    return 'You must enter a body.'
  },
]

const getUserPosition = () => {
  const positions = groupPostsByUser(store.posts)
  const index = positions.findIndex((pos) => pos.userId === userId.value)
  return index + 1
}
const onCreatePost = async (event) => {
  try {
    const { valid } = await event
    if (!valid) return
    loading.value = true
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: postForm.title,
        body: postForm.body,
        userId: userId.value,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    const data = await response.json()
    createdPosts.value.push(data)
    posts.value.push(data)
    notify({
      title: 'Post created successfully!',
      text: `Post with title: ${postForm.title} was created successfully!`,
    })
    if (getUserPosition() < 3) {
      notify({
        type: 'success',
        title: 'Congratulations!',
        text: `You're now ${getUserPosition()} on the leaderboard chart!`,
      })
    }
  } catch (error) {
    console.log('❤️‍🔥 error onCreatePost', error)
  } finally {
    loading.value = false
    postForm.body = ''
    postForm.title = ''
  }
}
</script>
<template>
  <h4 class="header">Create a new post</h4>
  <v-row>
    <v-col>
      <v-form validate-on="submit" @submit.prevent="onCreatePost">
        <v-text-field
          v-model="postForm.title"
          :rules="titleRule"
          label="Post Title"
        ></v-text-field>

        <v-textarea
          label="Post Body"
          v-model="postForm.body"
          :rules="bodyRule"
        ></v-textarea>
        <v-btn
          class="mt-2"
          :loading="loading"
          type="submit"
          color="blue"
          size="large"
          variant="tonal"
          >Create new post</v-btn
        >
      </v-form>
    </v-col>
  </v-row>
  <v-snackbar v-model="snackbar">
    {{ text }}

    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<style scoped>
.header {
  margin-bottom: 16px;
}
</style>
