import { API_KEY, BASE_URL } from "./url.js";

// ⭐ page 기반 인기 영화 로드
export async function getPopularPage(page = 1) {
    const res = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`
    );
    const data = await res.json();
    return data.results;
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

// 트렌딩 영화
export async function getTrending() {
    const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=ko-KR`);
    return (await res.json()).results;
}
