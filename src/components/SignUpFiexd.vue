<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const show = ref(false);
const withBase = (p) => (p?.startsWith('/') ? import.meta.env.BASE_URL + p.slice(1) : p)


function handleScroll() {
  show.value = window.scrollY > 200
}

function goToSignUp() {
    const el = document.getElementById('signUp')
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
    }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
});
</script>

<template>
  <button
    v-if="show"
    @click="goToSignUp"
    class="fixed bottom-25 right-6.5 z-52 hover:opacity-80"
    aria-label="到報名頁面"
  >
    <img class="w-[40px] sm:w-[55px]" :src="withBase('sign_up_fiexd_btn.png')" alt="sign_up_fiexd_btn">
  </button>
</template>

<style scoped>
button {
  cursor: pointer;
}
</style>