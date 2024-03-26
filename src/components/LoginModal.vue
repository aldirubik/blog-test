<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'
const router = useRouter()

const model = defineModel()
const visible = ref(false)
const loading = ref(false)

const form = reactive({
  userId: null,
  password: '',
})

const userRules = [
  (value: string) => {
    if (!value) return 'Please enter a user id!'
    else if (isNaN(Number(value))) return 'Please add a number'
    else if (Number(value) < 1 || Number(value) > 10)
      return 'Please enter a number between 1 and 10'
    else return true
  },
]

const passwordRules = [
  (value: string) => {
    if (value.length < 6) return 'Password must be at least 6 characters long!'
    else return true
  },
]

const onDoLogin = async (event: any) => {
  try {
    const { valid } = await event
    if (!valid) return
    loading.value = true
    store.user = Number(form.userId)
    setTimeout(() => {
      model.value = false
      loading.value = false
      router.push('/panel')
    }, 750)
  } catch (error) {
    console.log('❤️‍🔥 error on doLogin', error)
  }
}
</script>
<template>
  <v-dialog v-model="model" max-width="500">
    <v-card
      class="mx-auto pa-12 pb-8"
      width="500"
      style="max-width: 100% !important"
      rounded="lg"
    >
      <h4 class="login-header">Login</h4>
      <v-form validate-on="submit" @submit.prevent="onDoLogin">
        <div class="text-subtitle-1 text-medium-emphasis">User Id</div>

        <v-text-field
          density="compact"
          placeholder="Username (Number from 1 - 10)"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          type="number"
          v-model="form.userId"
          :rules="userRules"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Dummy Password
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          v-model="form.password"
          :rules="passwordRules"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn
          :loading="loading"
          color="blue"
          size="large"
          variant="tonal"
          type="submit"
          block
        >
          Log In
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<style scoped>
.login-header {
  margin-bottom: 15px;
  text-align: center;
  font-size: 20px;
}
</style>
