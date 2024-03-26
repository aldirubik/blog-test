<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { store } from '../store'
import { groupPostsByUser } from '@/utils/helpers'
//
import goldImage from '@/assets/images/gold.png'
import silverImage from '@/assets/images/silver.png'
import bronzeImage from '@/assets/images/bronze.png'

const posts = computed(() => store.posts)

const gold = ref(null)
const silver = ref(null)
const bronze = ref(null)

watch(
  () => store.posts,
  (posts) => {
    const users = groupPostsByUser(posts)
    gold.value = users[0]
    silver.value = users[1]
    bronze.value = users[2]
  },
  { deep: true }
)

onMounted(() => {
  if (posts.value.length !== 0) {
    const users = groupPostsByUser(posts.value)
    gold.value = users[0]
    silver.value = users[1]
    bronze.value = users[2]
  }
})
</script>
<template>
  <v-row>
    <v-col>
      <h4 class="winners-header">Today Winners</h4>
      <v-row>
        <v-col>
          <div class="first-place" v-if="gold">
            <img :src="goldImage" alt="winner" class="trophies" />

            <p>
              User <b>{{ gold.userId }}</b> is winning with
              <b>{{ gold.totalPosts }}</b> posts.
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          ><div class="second-place" v-if="gold">
            <img :src="silverImage" alt="silver" class="trophies" />
            <p>
              User <b>{{ silver.userId }}</b> is second with
              <b>{{ silver.totalPosts }}</b> posts.
            </p>
          </div></v-col
        >
        <v-col
          ><div class="third-place" v-if="gold">
            <img :src="bronzeImage" alt="bronze" class="trophies" />
            <p>
              User <b>{{ bronze.userId }}</b> is third with
              <b>{{ bronze.totalPosts }}</b> posts.
            </p>
          </div></v-col
        >
      </v-row>
    </v-col>
  </v-row>
</template>
<style lang="scss" scoped>
.winners-header {
  margin-bottom: 16px;
  text-align: center;
}
.trophies {
  width: 128px;
  height: 128px;
  object-fit: contain;
}
.first-place,
.second-place,
.third-place {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  gap: 1rem;
}
</style>
