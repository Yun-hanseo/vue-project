<template>
  <div class="auth-container">   <!-- ⬅ 전체 중앙 배치 -->
    <div class="auth-wrapper">   <!-- ⬅ 애니메이션 영역 -->
      <transition name="slide-fade" mode="out-in">
        <component
            :is="isLogin ? LoginForm : RegisterForm"
            @goRegister="showRegister"
            @goLogin="showLogin"
        />
      </transition>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'

const isLogin = ref(true)

const showRegister = () => (isLogin.value = false)
const showLogin = () => (isLogin.value = true)
</script>

<style>
/* 전체 레이아웃 */
.auth-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-color);
}

/* 카드 박스 */
.auth-card {
  width: 90%;
  max-width: 420px;
  padding: 32px;
  border-radius: 16px;
  background: var(--card-bg);
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: fadeUp 0.4s ease-out;
}

/* 제목 */
.auth-title {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}

/* input 그룹 */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-group label {
  font-size: 14px;
  opacity: 0.85;
}

.input-group input {
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--input-bg);
  color: var(--text-color);
  font-size: 14px;
  transition: 0.2s;
}

.input-group input:focus {
  border-color: #6ea8fe;
  box-shadow: 0 0 0 3px rgba(110, 168, 254, 0.3);
  outline: none;
}

/* 로그인 버튼 */
.auth-btn {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  background: #4c7fff;
  color: white;
  font-size: 16px;
  font-weight: 600;
  transition: 0.2s;
  cursor: pointer;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-size: 14px;
}

.terms {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
}


.auth-btn:hover {
  background: #3e6ae6;
}

/* 하단 문구 */
.auth-footer {
  text-align: center;
  font-size: 14px;
  opacity: 0.9;
}

.auth-link {
  color: #4c7fff;
  font-weight: 600;
  cursor: pointer;
}

/* 다크모드 자동 대응 */
:root {
  --bg-color: #f3f5f8;
  --card-bg: white;
  --text-color: #222;
  --input-bg: #f9f9f9;
  --border-color: #ccc;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #0f0f0f;
    --card-bg: #181818;
    --text-color: #fff;
    --input-bg: #1f1f1f;
    --border-color: #333;
  }
}

/* 등장 애니메이션 */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========== 전환 애니메이션 ========== */
/* ==========================
      자연스러운 전환 효과
   ========================== */
.auth-slide-enter-active,
.auth-slide-leave-active {
  transition: all 0.45s cubic-bezier(0.25, 0.1, 0.25, 1);
  position: absolute;
  width: 100%;
}

.auth-slide-enter-from {
  opacity: 0;
  transform: translateX(35px) scale(0.98);
}

.auth-slide-enter-to {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.auth-slide-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.auth-slide-leave-to {
  opacity: 0;
  transform: translateX(-35px) scale(0.98);
}


/* 부모가 relative여야 자연스럽게 겹치며 전환됨 */
.auth-wrapper {
  position: relative;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
}

</style>
