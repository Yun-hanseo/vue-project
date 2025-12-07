<template>
  <div class="section">

    <!-- 섹션 제목 -->
    <h2 class="section-title">{{ title }}</h2>

    <!-- 로딩 중이면 스켈레톤 보여주기 -->
    <div v-if="!movies || movies.length === 0" class="loading-area">
      <div class="skeleton" v-for="n in 6" :key="n"></div>
    </div>

    <!-- 영화 리스트 -->
    <div v-else class="movie-list">
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
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 22px;
  font-weight: 700;
  padding-left: 4px;
}

/* 영화 리스트 가로 스크롤 */
.movie-list {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.movie-list::-webkit-scrollbar {
  height: 6px;
}

.movie-list::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 3px;
}

/* 로딩 스켈레톤 */
.loading-area {
  display: flex;
  gap: 14px;
}

.skeleton {
  width: 180px;
  height: 260px;
  border-radius: 10px;
  background: linear-gradient(90deg, #333 0%, #444 50%, #333 100%);
  animation: shimmer 1.2s infinite ease-in-out;
}

@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
}
</style>
