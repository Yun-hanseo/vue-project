<template>
  <div
      class="poster-wrapper"
      :class="{ liked: isLiked }"
      @click="toggleLike"
  >
    <img
        v-if="movie.poster_path"
        class="poster-img"
        :src="IMAGE_BASE + movie.poster_path"
        :alt="movie.title"
    />
    <div v-else class="poster-placeholder">NO IMAGE</div>

    <h4 class="poster-title">{{ movie.title }}</h4>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  movie: Object,
});

// TMDB 이미지 주소
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

// 이미 추천된 영화인지 확인 (LocalStorage)
const likedMovies = ref(JSON.parse(localStorage.getItem("liked_movies") || "[]"));

const isLiked = computed(() =>
    likedMovies.value.some((m) => m.id === props.movie.id)
);

// 추천 영화 등록/삭제
function toggleLike() {
  if (isLiked.value) {
    // 삭제
    likedMovies.value = likedMovies.value.filter((m) => m.id !== props.movie.id);
  } else {
    // 등록
    likedMovies.value.push(props.movie);
  }

  // 저장
  localStorage.setItem("liked_movies", JSON.stringify(likedMovies.value));
}
</script>

<style scoped>
.poster-wrapper {
  width: 160px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.poster-img {
  width: 100%;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.poster-wrapper:hover .poster-img {
  transform: scale(1.07);
}

/* 추천 영화 등록 시 스타일 변경 */
.liked .poster-img {
  border: 3px solid #ff4b91;
  transform: scale(1.05);
}

.poster-title {
  margin-top: 8px;
  font-size: 14px;
  text-align: center;
}
</style>



