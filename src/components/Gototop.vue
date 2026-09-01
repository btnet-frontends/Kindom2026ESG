<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const show = ref(false)
const withBase = (p) => (p?.startsWith('/') ? import.meta.env.BASE_URL + p.slice(1) : p)

function handleScroll() {
  show.value = window.scrollY > 200
}

function goToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
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
    @click="goToTop"
    class="fixed bottom-8 right-[25px] z-50 w-[40px] h-[40px] sm:w-[55px] sm:h-[55px] transition hover:opacity-80"
    aria-label="回到頂部"
  >
    <img :src="withBase('btn_scroll_top.png')" alt="回到頂部" class="w-full h-full object-contain" />
  </button>
</template>

<style scoped>
button {
  cursor: pointer;
}
</style>