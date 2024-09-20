<script setup>
import { ref } from "vue";

const props = defineProps(["card"]);

let upvoteClicked = null;
let downvoteClicked = null;
// const downvoteClicked

let upvotes = ref(props.card.upvotes);
const id = ref(props.card.post_id);

const upvote = () => {
  // upvote button increment value when clicked
  upvoteClicked == null ? upvotes.value++ : false;
  // if downvote button was clicked already, make the upvote button null to be able to increment once more to reset or add to total votes.
  if (downvoteClicked == true) {
    // set to false to allow upvote after reset of votes
    downvoteClicked = false;
    // set to null to allow another upvote after reset
    upvoteClicked = null;
  } else {
    // otherwise change state to upvote to true and allow downvote to reset votes
    upvoteClicked = true;

    // set to null to allow another upvote after reset

    downvoteClicked = null;
  }
  updateVotes();
};

const downvote = () => {
  // upvote button set to null to decrease value by 1 when clicked

  downvoteClicked == null ? upvotes.value-- : false;
  // if downvote button was clicked already, make the downvote button null to be able to decrease once more to reset or add to total votes.

  if (upvoteClicked == true) {
    // set to false to allow downvote after reset of votes
    upvoteClicked = false;

    // set to null to allow another downvote after reset
    downvoteClicked = null;
  } else {
    // otherwise change state to downvote to true and allow upvote to reset votes
    downvoteClicked = true;

    // set to null to ensure another upvote after reset
    upvoteClicked = null;
  }
  updateVotes();
};

const updateVotes = () => {
  fetch(`http://localhost:3000/${id.value}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ upvotes: upvotes.value }),
  })
    .then((response) => response.json())
    .then((data) => {
      props.card.upvotes = data.upvotes;
    });
};
</script>

<template>
  <div class="card-wrapper">
    <div class="post-upvotes">
      <img
        src="/src/assets/imgs/upvote-icon.png"
        alt=""
        class="upvote-icon"
        @click="upvote()"
      />
      <span class="upvotes-count">{{ upvotes }}</span>
      <img
        src="/src/assets/imgs/downvote-icon.png"
        alt=""
        class="downvote-icon"
        @click="downvote()"
      />
    </div>
    <div class="img-container">
      <img class="post-image" :src="card.post_image" alt="reddit post image" />
    </div>
    <div class="post-info-container">
      <div class="post-title">
        <span>{{ card.title }}</span>
      </div>
      <div class="post-author">
        <span
          >submitted an hour ago by
          <span class="author">
            <span>{{ card.author }}</span> to
            <span>r/{{ card.subreddit }}</span>
          </span>
        </span>
      </div>
      <div class="engagement-links">
        <div class="category-link active-link">comment</div>
        <div class="category-link">share</div>
        <div class="category-link">save</div>
        <div class="category-link">hide</div>
        <div class="category-link">report</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 15px 0;
}

.post-upvotes {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 50px;
  font-size: 12px;
  color: rgb(125, 125, 125);
}

.upvote-icon,
.downvote-icon {
  width: 15px;
  height: 15px;
  cursor: pointer;
}

.upvotes-count {
  margin: 5px 0;
}

.img-container {
  display: flex;
  align-items: center;
}

.post-image {
  width: 50px;
  height: 50px;
  margin: 0 20px;
}

.post-info-container {
  display: flex;
  flex-direction: column;
  font-size: 10px;
  color: rgb(108, 108, 108);
  font-weight: 600;
}

.author,
.post-subreddit {
  color: rgb(88, 118, 162);
}

.post-title {
  font-size: 16px;
  color: rgb(52, 0, 251);
  font-weight: 500;
}

.engagement-links {
  display: flex;
  font-weight: 800;
  gap: 15px;
  color: rgb(125, 125, 125);
}
</style>
