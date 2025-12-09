import { API_KEY, BASE_URL } from "./url.js";

export async function getPopularPage(page = 1) {
    const res = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`
    );
    return (await res.json()).results;
}

// 기본 인기 영화
export async function getPopular() {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR`);
    return (await res.json()).results;
}

// 현재 상영작
export async function getNowPlaying() {
    const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR`);
    return (await res.json()).results;
}

// 평점 높은 영화
export async function getTopRated() {
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=ko-KR`);
    return (await res.json()).results;
}

// 트렌딩
export async function getTrending() {
    const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=ko-KR`);
    return (await res.json()).results;
}

export async function fetchGenres() {
    const res = await fetch(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=ko-KR`
    );
    const data = await res.json();
    return data.genres;
}

export async function fetchMoviesByGenre(genreId, page = 1) {
    const res = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ko-KR&with_genres=${genreId}&page=${page}`
    );
    return await res.json();
}

export async function fetchSearchMovies(page = 1, options = {}) {
    const { genre, rating, sort } = options;

    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ko-KR&page=${page}`;

    // 정렬
    if (sort === "popular") url += "&sort_by=popularity.desc";
    else if (sort === "rating") url += "&sort_by=vote_average.desc";
    else if (sort === "newest") url += "&sort_by=release_date.desc";
    else url += "&sort_by=popularity.desc";

    // 장르 필터
    if (genre) url += `&with_genres=${genre}`;

    // 평점 필터
    if (rating) url += `&vote_average.gte=${rating}`;

    const res = await fetch(url);
    return await res.json();
}


