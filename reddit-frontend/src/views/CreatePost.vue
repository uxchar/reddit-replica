<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const post_image = ref("");
const title = ref("");
const content = ref("");
const author = ref("");
const subreddit = ref("");
const upvotes = ref(0);

const router = useRouter();

function postData() {
  const formData = {
    post_image: post_image.value,
    title: title.value,
    content: content.value,
    author: author.value,
    subreddit: subreddit.value,
    upvotes: upvotes.value,
  };

  fetch("http://localhost:3000/create-post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      router.push("/");
    });
}
</script>
<template>
  <div class="wrapper">
    <form @submit.prevent="postData()">
      <div class="input">
        <label for="post_image">Post Image URL:</label>
        <input
          type="url"
          id="post_image"
          name="post_image"
          v-model="post_image"
        /><br /><br />
      </div>
      <div class="input">
        <label for="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          v-model="title"
        /><br /><br />
      </div>

      <div class="input">
        <label for="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          v-model="author"
        /><br /><br />
      </div>
      <div class="input">
        <label for="subreddit">Subreddit:</label>
        <input
          type="text"
          id="subreddit"
          name="subreddit"
          v-model="subreddit"
        /><br /><br />
      </div>
      <input type="submit" value="Post" class="submit-btn" />
    </form>
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}

form {
  width: 300px;
  height: auto;
}

label {
  font-weight: 800;
  color: rgb(51, 88, 141);
  font-size: 14px;
}

.input {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

input[type="text"],
input[type="number"],
input[type="url"] {
  height: 40px;
  border-radius: 4px;
  border: none;
  background-color: rgb(242, 242, 242);
  padding-left: 10px;
}

.submit-btn {
  padding: 10px 40px;
  background-color: rgb(51, 88, 141);
  color: #fff;
  border-radius: 3px;
  border: none;
  font-size: 1rem;
  width: 100%;
}
</style>
