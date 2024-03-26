export const groupPostsByUser = (posts) => {
  const userPosts = {}

  if (!posts.length || posts.length === 0) return

  posts.forEach((post) => {
    if (!userPosts[post.userId]) {
      userPosts[post.userId] = 0
    }
    userPosts[post.userId]++
  })

  const usersArray = Object.entries(userPosts).map(([userId, postCount]) => ({
    userId: parseInt(userId),
    totalPosts: postCount,
  }))

  return usersArray.sort((a: any, b: any) => b.totalPosts - a.totalPosts)
}
