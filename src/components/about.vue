<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getWindowWidth } from '../utils/utils'
import AOS from 'aos'
import 'aos/dist/aos.css'

defineProps({
    infoData: Object
});

const width = ref(0);

function handleResize() {
    width.value = getWindowWidth()
}

onMounted(() => {
    AOS.init()
    window.addEventListener('resize', handleResize)
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
});
</script>

<template>
    <div class="content_wrap" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
        <div class="about_title_wrap max-w-[1200px] mx-5 xl:mx-auto">
            <h1 class="about_title_en">{{ infoData.titleEn }}</h1>
        </div>
        <div class="intro_box max-w-[1200px] py-10 px-10 sm:px-20 mx-5 xl:mx-auto">
            <h2 class="intro_title" :style="{ color: infoData.titleColor }">{{ infoData.title }}</h2>
            <div class="intro_text intro_text1">
                <p class="" v-html="infoData.text[0]"></p>
            </div>
            <div class="intro_text intro_text1">
                <p class="" v-html="infoData.text[1]"></p>
            </div>
            <div class="intro_text intro_text1">
                <p class="" v-html="infoData.text[2]"></p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.about_title_wrap {
    position: relative;
    z-index: 2;
    margin-bottom: -0.8em;
}

.about_title_en {
    font-family: inherit;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #ffffff;
    font-size: clamp(3.5rem, 9vw, 8.5rem);
    line-height: 1;
    margin-left: 0.6rem;
}

.intro_box {
    position: relative;
    z-index: 1;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(4px);
}

.intro_title {
    text-align: center;
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    letter-spacing: 4px;
}

.intro_text {
    font-size: 1.8rem;
    margin-bottom: 2.5rem;
    letter-spacing: 8px;
    text-align: justify;
}

.intro_text:last-child {
    margin-bottom: 0;
}

.intro_text p {
    color: #333333;
}

.intro_text p:deep(span) {
    color: #01989f !important;
    background-color: transparent;
}

@media screen and (max-width: 1024px) {
    .about_title_wrap {
        margin-bottom: -0.3em;
        text-align: center;
    }

    .about_title_en {
        margin-left: 0;
    }

    .intro_title {
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
    }
    .intro_text {
        font-size: 1.6rem;
        margin-bottom: 1.2rem;
        letter-spacing: 1px;
    }
}
</style>