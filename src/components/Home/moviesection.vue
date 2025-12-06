<template>
  <div class="section">
    <h2 class="section-title">{{ title }}</h2>

    <div class="movie-grid">

      <Poster
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
      />

    </div>
  </div>
</template>

<script setup>
import Poster from "./Poster.vue";
defineProps({
  title: String,
  movies: Array
});
</script>


<style scoped>
.section {
  width: 100%;
}

.section-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 16px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
}
</style>
