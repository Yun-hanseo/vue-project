<template>
  <header :class="{ scrolled: isScrolled }" class="header">

    <!-- 로고 -->
    <div class="logo" @click="goHome">
      🎬 MovieDB
    </div>

    <!-- 네비 메뉴 -->
    <nav class="nav">
      <RouterLink to="/">홈</RouterLink>
      <RouterLink to="/popular">인기</RouterLink>
      <RouterLink to="/search">검색</RouterLink>
      <RouterLink to="/wishlist">추천목록</RouterLink>
    </nav>

    <!-- 로그인 사용자, 로그아웃 -->
    <div class="user-area">
      <span v-if="user" class="user-email">{{ user.email }}</span>
      <button v-if="user" class="logout-btn" @click="logout">로그아웃</button>
    </div>

  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = JSON.parse(localStorage.getItem("user") || "null");

const isScrolled = ref(false);

onMounted(() => {
  window.addEventListener("scroll", () => {
    isScrolled.value = window.scrollY > 20; // 스크롤 20px 넘으면 header 스타일 변경
  });
});

// 홈 이동
function goHome() {
  router.push("/");
}

// 로그아웃
function logout() {
  localStorage.removeItem("user");
  router.push("/signin");
  alert("로그아웃 되었습니다!");
}
</script>

<style scoped>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  backdrop-filter: blur(10px);
  background: rgba(20, 20, 20, 0.45);
  transition: background 0.3s ease, padding 0.3s ease;
  z-index: 1000;
}

.header.scrolled {
  background: rgba(20, 20, 20, 0.85);
  padding: 8px 20px;
}

.logo {
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav a {
  color: #ddd;
  font-size: 15px;
  text-decoration: none;
  transition: 0.2s;
}

.nav a:hover {
  color: white;
  transform: translateY(-2px);
}

.user-area {
  display: flex;
  align-items: center;
  margin-right:30px;
  gap: 12px;
}

.user-email {
  color: #aaa;
  font-size: 14px;
  left:20px;
}

.logout-btn {
  background: #ff3b57;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  color: white;
  cursor: pointer;
  transition: 0.2s ease;
}

.logout-btn:hover {
  background: #ff506d;
}
</style>
