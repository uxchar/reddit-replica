<script setup>
import { ref } from "vue";
import FeedPostCard from "./FeedPostCard.vue";

const feedPosts = ref([]);

fetch("http://localhost:3000/")
  .then((response) => response.json())
  .then((data) => {
    feedPosts.value = data;
  });
</script>

<template>
  <div class="content-container">
    <div class="feed-container">
      <div class="feed-post-wrapper" v-for="post in feedPosts">
        <FeedPostCard :card="post" />
      </div>
    </div>
    <div class="search-ads-container">
      <input type="text" placeholder="search" />
      <RouterLink class="link-style" to="/create-post">
        <button class="create-post-btn">Submit New Post</button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.content-container {
  display: grid;
  grid-template-columns: 1fr 0.25fr;
}

.feed-container {
  margin: 10px 0 30px 50px;
}
.search-ads-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 60px 0 0;
}
.create-post-btn {
  color: rgb(51, 88, 141);
  background-color: rgb(237, 245, 255);
  font-size: 14px;
  font-weight: 700;
  border: solid 1px rgb(116, 140, 174);
  padding: 4px 31px;
}
</style>
