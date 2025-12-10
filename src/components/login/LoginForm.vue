<template>
  <div class="auth-card">
    <h2 class="auth-title">로그인</h2>

    <form class="auth-form" @submit.prevent="handleLogin">

      <div class="input-group">
        <label>이메일</label>
        <input
            type="email"
            placeholder="이메일을 입력하세요"
            v-model="email"
        />
      </div>

      <div class="input-group">
        <label>비밀번호(API KEY)</label>
        <input
            type="password"
            placeholder="TMDB API KEY를 입력하세요"
            v-model="password"
        />
      </div>

      <!-- ⭐ Remember Me -->
      <div class="remember-me">
        <input type="checkbox" id="remember" v-model="rememberMe" />
        <label for="remember">Remember me</label>
      </div>


      <button type="submit" class="auth-btn">로그인</button>
    </form>

    <p class="auth-footer">
      계정이 없나요?
      <span class="auth-link" @click="emit('goRegister')">회원가입</span>
    </p>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

import { loginUser } from "@/utils/login.js";

const emit = defineEmits(["goRegister"]);
const router = useRouter();

const email = ref("");
const password = ref("");
const rememberMe = ref(false);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ⭐ 페이지 로드 시 Remember Email 불러오기
onMounted(() => {
  const saved = localStorage.getItem("rememberEmail");
  if (saved) {
    email.value = saved;
    rememberMe.value = true;
  }

  const auth = localStorage.getItem("auth");
  if (auth === "true") {
    router.push("/");
  }
});


async function handleLogin() {
  if (!emailRegex.test(email.value)) {
    showToast("올바른 이메일 형식이 아닙니다!", "red");
    return;
  }

  const result = await loginUser(email.value, password.value);

  if (result.success) {
    showToast("로그인 성공!", "#4c7fff");

    // ⭐ 로그인 상태 저장
    localStorage.setItem("auth", "true");

    // ⭐ Remember Me 저장
    if (rememberMe.value) {
      localStorage.setItem("rememberEmail", email.value);
    } else {
      localStorage.removeItem("rememberEmail");
    }

    setTimeout(() => {
      router.push("/");
    }, 500);

  } else {
    // 🔥 로그인 실패 메시지 그대로 유지됨
    showToast("로그인 실패: " + result.message, "red");
  }
}



function showToast(message, color = "#4c7fff") {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "center",
    backgroundColor: color,
  }).showToast();
}
</script>
















