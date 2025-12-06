import { API_KEY, BASE_URL } from "./url.js";

// 인기 영화
export async function getPopular() {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR`);
    const data = await res.json();
    return data.results;
}

// 현재 상영작
export async function getNowPlaying() {
    const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR`);
    const data = await res.json();
    return data.results;
}

// 평점 높은 영화
export async function getTopRated() {
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=ko-KR`);
    const data = await res.json();
    return data.results;
}

// 트렌딩 영화
export async function getTrending() {
    const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=ko-KR`);
    const data = await res.json();
    return data.results;
}
