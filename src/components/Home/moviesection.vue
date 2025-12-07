<template>
  <div class="section">
    <h2 class="section-title">{{ title }}</h2>

    <div class="movie-row">
      <Poster
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
      />
    </div>
  </div>
</template>

<script setup>
import Poster from "./poster.vue";

const props = defineProps({
  title: String,
  movies: Array
});
</script>

<style scoped>
.section {
  margin-bottom: 40px;

  background: linear-gradient(
      to right,
      #0f0f11 0%,
      #1a1b1e 30%,
      #1a1b1e 70%,
      #0f0f11 100%
  );
}

.section-title {
  font-size: 22px;
  font-weight: 700;
  color:white;
  margin: 40px 0 15px 0px;
}

.movie-row {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 10px;
}

/* Chrome, Safari */
.movie-row::-webkit-scrollbar {
  height: 6px;
}

.movie-row::-webkit-scrollbar-track {
  background: transparent;
}

.movie-row::-webkit-scrollbar-thumb {
  background: #ff4b4b;
  border-radius: 4px;
}

.movie-row::-webkit-scrollbar-thumb:hover {
  background: #ff2e2e;
}

/* Firefox */
.movie-row {
  scrollbar-width: thin;
  scrollbar-color: #ff4b4b transparent;
}



</style>

