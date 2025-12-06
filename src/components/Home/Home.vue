<template>
  <div class="home-container">

    <!-- 인기 영화 -->
    <MovieSection
        title="인기 영화"
        :movies="popularMovies"
    />

    <!-- 상영 중 영화 -->
    <MovieSection
        title="현재 상영작"
        :movies="nowPlayingMovies"
    />

    <!-- Top Rated -->
    <MovieSection
        title="평점 좋은 영화"
        :movies="topRatedMovies"
    />

    <!-- Trending -->
    <MovieSection
        title="트렌딩 영화"
        :movies="trendingMovies"
    />

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MovieSection from "./moviesection.vue";
import { getPopular, getNowPlaying, getTopRated, getTrending } from "@/utils/movie.js";

const popularMovies = ref([]);
const nowPlayingMovies = ref([]);
const topRatedMovies = ref([]);
const trendingMovies = ref([]);

onMounted(async () => {
  popularMovies.value = await getPopular();
  nowPlayingMovies.value = await getNowPlaying();
  topRatedMovies.value = await getTopRated();
  trendingMovies.value = await getTrending();
});
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px;
}
</style>

