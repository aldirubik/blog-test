import { reactive } from 'vue'
type Post = {
  id: number
  title: string
  body: string
  userId: number
}

type LeaderboardPost = {
  userId: number
  totalPosts: number
}
export const store = reactive<{
  showLoginModal: boolean
  loadingPosts: boolean
  user: number | null
  posts: Post[]
  createdPosts: Post[]
  leaderboardPosts: LeaderboardPost[]
}>({
  showLoginModal: false,
  loadingPosts: false,
  user: null,
  posts: [],
  createdPosts: [],
  leaderboardPosts: [],
})
