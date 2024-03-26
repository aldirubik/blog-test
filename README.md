# Leaderboard app test

### Requirements

```
Node v20 or newer
```

```
npm install
```
### Run the project locally


```
npm run dev
```
### Build the project & run live


```
npm run build
```
```
npm run preview
```

### About this project

this is a simple leaderboard project that gets 100 posts from ```https://jsonplaceholder.typicode.com/posts``` and groups them by users to display an leaderboard. You can create an fake account with an user id from 1 to 10 and after that you will be redirected to the panel section where you can see your panel and crete new posts.Since the jsonplaceholder api isnt a real api with auth and real data, after the first initial load of the posts everything gets handled by the vue state from login to new posts and leaderboard.