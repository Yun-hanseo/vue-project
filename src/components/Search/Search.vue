<template>
  <div class="search-page">
    <SearchFilter
        :genres="genres"
        @filter-change="applyFilter"
        @reset="resetFilter"
    />

    <SearchList
        :movies="filteredMovies"
        :isLoading="isLoading"
    />

    <SearchTopButton />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SearchFilter from "./SearchFilter.vue";
import SearchList from "./SearchList.vue";
import SearchTopButton from "./SearchTopButton.vue";

import {
  fetchSearchMovies,
  fetchGenres,
  fetchMoviesByGenre
} from "@/utils/movie.js";

const movies = ref([]);
const filteredMovies = ref([]);
const genres = ref([]);
const isLoading = ref(false);

const MAX_PAGE = 10;

async function loadMovies(options = {}) {
  isLoading.value = true;
  movies.value = [];

  const { genre, rating, sort } = options;

  // 요청 배열 생성
  const requests = [];

  if (genre) {
    // 장르 기반 API
    for (let p = 1; p <= MAX_PAGE; p++) {
      requests.push(fetchMoviesByGenre(genre, p));
    }
  } else {
    // 기본 discover API
    for (let p = 1; p <= MAX_PAGE; p++) {
      requests.push(fetchSearchMovies(p, options));
    }
  }

  const responses = await Promise.all(requests);

  responses.forEach(data => {
    if (data?.results) movies.value.push(...data.results);
  });

  let list = [...movies.value];
  if (rating) list = list.filter(m => m.vote_average >= Number(rating));

  if (sort === "popular") list.sort((a, b) => b.popularity - a.popularity);
  if (sort === "rating") list.sort((a, b) => b.vote_average - a.vote_average);
  if (sort === "newest") list.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

  filteredMovies.value = list;

  isLoading.value = false;
}

function applyFilter(options) {
  loadMovies(options);
}

function resetFilter() {
  filteredMovies.value = movies.value;
}

onMounted(async () => {
  genres.value = await fetchGenres();
  loadMovies();
});
</script>


<style scoped>
.search-page {
  padding: 20px;
  margin-top: 80px;
}
</style>


