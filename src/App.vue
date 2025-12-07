<template>
  <div class="app-wrapper">
    <transition name="fade" mode="out-in">
      <RouterView />
    </transition>
  </div>
</template>

<script setup>
</script>

<style>
/* 🔥 전체 배경 유지 */
html, body {
  margin: 0;
  padding: 0;
  background-color: #1a1a1d;  /* ← 너가 쓰는 다크그레이 샤갈 배경 */
  width: 100%;
  height: 100%;
}

/* 🔥 App 전체 wrapper 도 같은 색으로 유지 */
.app-wrapper {
  min-height: 100vh;
  width: 100%;
  background-color: #1a1a1d;
}

/* 🔥 페이지 전환 효과 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

