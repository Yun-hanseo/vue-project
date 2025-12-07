<template>
  <div class="home-container">
    <Header />

    <!-- 아래는 기존 섹션들 -->
    <MovieSection title="인기 영화" :movies="popularMovies" />
    <MovieSection title="현재 상영작" :movies="nowPlayingMovies" />
    <MovieSection title="평점 좋은 영화" :movies="topRatedMovies" />
    <MovieSection title="트렌딩 영화" :movies="trendingMovies" />
  </div>
</template>

<script setup>
import Header from "@/components/common/Header.vue";
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
  background-color:#1a1a1d;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px;
}
</style>

