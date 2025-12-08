<template>
  <div class="search-page">

    <!-- 🔍 필터 영역 -->
    <SearchFilter
        :genres="genres"
        @filter-change="applyFilter"
        @reset="resetFilter"
    />

    <!-- 🔥 결과 리스트 -->
    <SearchList
        :movies="filteredMovies"
        :isLoading="isLoading"
        @loadMore="loadMoreMovies"
    />

    <!-- ⬆ 맨 위로 버튼 (추후 제작) -->
    <!-- <SearchTopButton /> -->

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 컴포넌트 가져오기
import SearchFilter from "./SearchFilter.vue";
import SearchList from "./SearchList.vue";

import { fetchSearchMovies, fetchGenres } from "@/utils/movie.js";

// ----------------------------
// ✅ 상태 변수들
// ----------------------------
const movies = ref([]);         // 전체 영화 데이터
const filteredMovies = ref([]); // 필터 후 데이터
const genres = ref([]);         // 장르 목록

const isLoading = ref(false);
const page = ref(1);

// ----------------------------
// 🔥 1. 영화 데이터 로드
// ----------------------------
async function loadMovies() {
  isLoading.value = true;

  const data = await fetchSearchMovies(page.value);
  movies.value.push(...data.results);
  filteredMovies.value = movies.value;

  isLoading.value = false;
}

// ----------------------------
// 🔥 2. 필터 적용 함수
// ----------------------------
function applyFilter(options) {
  const { genre, rating, sort } = options;

  let result = [...movies.value];

  // 장르 필터
  if (genre) {
    result = result.filter(m => m.genre_ids.includes(Number(genre)));
  }

  // 평점 필터
  if (rating) {
    result = result.filter(m => m.vote_average >= Number(rating));
  }

  // 정렬 옵션 적용
  if (sort === "popular") {
    result.sort((a, b) => b.popularity - a.popularity);
  } else if (sort === "rating") {
    result.sort((a, b) => b.vote_average - a.vote_average);
  } else if (sort === "newest") {
    result.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  }

  filteredMovies.value = result;
}

// ----------------------------
// 🔥 3. 필터 초기화 버튼
// ----------------------------
function resetFilter() {
  filteredMovies.value = movies.value;
}

// ----------------------------
// 🔥 4. 무한스크롤 로드
// ----------------------------
async function loadMoreMovies() {
  page.value++;
  await loadMovies();
}

// ----------------------------
// 🚀 초기 로딩
// ----------------------------
onMounted(async () => {
  genres.value = await fetchGenres();
  await loadMovies();
});
</script>

<style scoped>
.search-page {
  padding: 20px;
}
</style>
