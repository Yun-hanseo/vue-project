<template>
  <div class="poster-card">

    <!-- 포스터 이미지 -->
    <div class="poster-wrapper">
      <img :src="imgUrl" class="poster-img" />
    </div>

    <!-- 영화 제목 -->
    <p class="poster-title">{{ movie.title }}</p>

    <!-- 영화 정보 (평점 / 개봉일) -->
    <div class="poster-info">
      <span class="rating">⭐ {{ movie.vote_average.toFixed(1) }}</span>
      <span class="release">{{ movie.release_date }}</span>
    </div>

  </div>
</template>

<script setup>
const props = defineProps({
  movie: Object
});

// 포스터 URL
const imgUrl = props.movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
    : "https://via.placeholder.com/300x450";
</script>

<style scoped>
.poster-card {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 15px;
  border-radius: 12px;
  transition: 0.25s ease;
}

.poster-wrapper img {
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
}


/* hover 시 확대 */
.poster-card:hover {
  transform: scale(1.05);
}

/* 이미지 감싸는 div */
.poster-wrapper {
  border-radius: 12px;
  overflow: hidden;
}

.poster-img {
  width: 100%;
  border-radius: 12px;
}

/* 제목 */
.poster-title {
  color:white;
  font-weight: 600;
  margin-top: 4px;
  font-size: 16px;
  line-height: 1.2;
}

/* 정보 표시 */
.poster-info {
  display: flex;
  gap: 10px;
  font-size: 15px;
  color: #555;
}

.rating {
  color: #ffb300; /* 평점 색상 */
}

.release {
  opacity: 0.8;
}
</style>




