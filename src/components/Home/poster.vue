<template>
  <div class="poster-card">

    <div class="poster-wrapper">
      <img :src="imgUrl" class="poster-img" />
    </div>

    <p class="poster-title">{{ movie.title }}</p>

    <div class="poster-info">
      <span class="rating">⭐ {{ movie.vote_average.toFixed(1) }}</span>
      <span class="release">{{ movie.release_date }}</span>
    </div>

    <p class="overview">{{ movie.overview.slice(0, 30) }}...</p>

    <!-- ❤️ 관심목록 버튼 -->
    <button class="wish-btn" @click.stop="onClickHeart">
      <span class="heart">{{ isWish ? "♥" : "♡" }}</span>
    </button>

  </div>
</template>



<script setup>
import { ref, onMounted } from "vue";
import { toggleWishlist, isInWishlist } from "../../utils/wishlist.js";

const props = defineProps({
  movie: Object
});

const imgUrl = props.movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
    : "https://via.placeholder.com/300x450";

const isWish = ref(false);

onMounted(() => {
  isWish.value = isInWishlist(props.movie.id);
});

function onClickHeart() {
  toggleWishlist(props.movie);
  isWish.value = !isWish.value;
}
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

.overview
{
  color:white;
}

.wish-btn {
  margin-top: 2px;
  width: 35px;
  border-radius: 10px;
  border: 1px solid #555;
  background: #1f1f1f;
  color: white;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.wish-btn:hover {
  background: #333;
  transform: scale(1.02);
}

.heart {
  font-size: 18px;
  color: #ff4b4b;
}



/* hover 시 확대 */
.poster-img:hover {
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

@media (max-width: 600px) {
  .poster-card {
    width: 140px;
    padding: 10px;
  }

  .poster-wrapper img {
    width: 140px;
    height: 210px;
  }

  .poster-title {
    font-size: 13px;
  }

  .poster-info {
    font-size: 11px;
  }

  .overview {
    font-size: 11px;
  }
}

</style>




