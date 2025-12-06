<template>
  <div class="poster-card">

    <img
        class="poster-img"
        :src="imageUrl"
        :alt="movie.title"
    />

    <h3 class="movie-title">{{ movie.title }}</h3>

    <p class="movie-overview">
      {{ movie.overview?.slice(0, 60) }}...
    </p>

    <p class="movie-info">
      ⭐ {{ movie.vote_average }}점 · {{ movie.release_date }}
    </p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  movie: Object
});

const imageUrl = computed(() => {
  return `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`;
});
</script>

<style scoped>
.poster-card {
  cursor: pointer;
  transition: 0.25s;
}

.poster-card:hover {
  transform: scale(1.05);
}

.poster-img {
  width: 100%;
  border-radius: 12px;
}

.movie-title {
  margin-top: 8px;
  font-size: 15px;
  font-weight: 600;
}

.movie-overview {
  font-size: 13px;
  opacity: 0.8;
}

.movie-info {
  font-size: 12px;
  margin-top: 4px;
  opacity: 0.7;
}
</style>
