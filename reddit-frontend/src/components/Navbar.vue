<script setup></script>

<template>
  <div class="nav-container">
    <img
      src="/src/assets/imgs/logos/Reddit_logo.svg"
      alt="reddit logo"
      class="reddit-logo"
    />
    <div class="links">
      <div class="category-link active-link">hot</div>
      <div class="category-link">new</div>
      <div class="category-link">rising</div>
      <div class="category-link">controversial</div>
      <div class="category-link">top</div>
      <div class="category-link">wiki</div>
    </div>
  </div>
</template>

<style scoped>
.nav-container {
  display: flex;
  padding: 30px 0 0 0;
  gap: 20px;
  background-color: rgb(201, 222, 246);
  border: 1px solid rgb(91, 139, 199);
}
.links {
  display: flex;
  gap: 5px;
  font-family: "Open-Sans", Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 800;
  color: rgb(51, 88, 141);
}

.category-link {
  background-color: rgb(237, 245, 255);
  padding: 0 6px;
}

.active-link {
  color: rgb(253, 65, 30);
  background-color: rgb(255, 255, 255);
  border: solid 1px rgb(51, 88, 141);
  border-bottom: none;
}

.reddit-logo {
  width: 100px;
  margin-left: 5px;
  margin-top: -20px;
}
</style>
