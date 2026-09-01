<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
const withBase = (p) => (p?.startsWith('/') ? import.meta.env.BASE_URL + p.slice(1) : p)

const props = defineProps({
    infoData: Object
});

const modules = [Autoplay, Navigation]
const swiperInstance = ref(null)

const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)

const updateWidth = () => {
    if (typeof window !== 'undefined') {
        windowWidth.value = window.innerWidth
    }
}

onMounted(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
})

const refCount = computed(() => props.infoData?.references?.length || 0)

const maxFitCards = computed(() => {
    if (windowWidth.value < 640) return 1
    if (windowWidth.value < 960) return 2
    return 3
})

const needsCarousel = computed(() => refCount.value > maxFitCards.value)

const onSwiper = (swiper) => {
    swiperInstance.value = swiper
}
const swiperPrev = () => {
    swiperInstance.value?.slidePrev()
}
const swiperNext = () => {
    swiperInstance.value?.slideNext()
}
</script>

<template>
    <div class="references_wrap">
        <div class="references_inner max-w-[1200px] mx-auto px-2 sm:px-6 md:px-8 py-20">
            <div class="sec_title_group flex flex-col items-center justify-center text-center mt-6 sm:mt-8 translate-y-[6px] relative select-none">
                <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide relative z-10 m-0" style="color:#72e9d3;">
                    {{ infoData.title || '延伸閱讀' }}
                </h2>
                <span class="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-wider leading-none -mt-3 sm:-mt-5 md:-mt-7 relative z-0" style="color:#72e9d3; opacity:0.2;">
                    {{ infoData.titleEn || 'REFERENCES' }}
                </span>
            </div>

            <div v-if="needsCarousel" class="ref_carousel_container ref-anim-2">
                <button
                    class="ref_arrow ref_arrow-left"
                    @click="swiperPrev"
                    aria-label="上一張"
                >
                    <img :src="withBase('arrow_left.png')" alt="上一張" />
                </button>

                <div class="ref_carousel_wrapper">
                    <Swiper
                        :modules="modules"
                        :slides-per-view="1"
                        :space-between="20"
                        :loop="true"
                        :autoplay="{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }"
                        :speed="800"
                        :breakpoints="{
                            680: { slidesPerView: Math.min(2, refCount), spaceBetween: 20 },
                            1024: { slidesPerView: Math.min(3, refCount), spaceBetween: 24 }
                        }"
                        @swiper="onSwiper"
                        class="ref_swiper"
                    >
                        <SwiperSlide v-for="(item, idx) in infoData.references" :key="idx">
                            <div class="ref_item">
                                <img :src="withBase(item.img)" class="ref_cover" :alt="item.title" />
                                <div class="ref_content">
                                    <h3 class="ref_title" v-html="item.title"></h3>
                                    <p class="ref_desc">{{ item.desc }}</p>
                                    <a
                                        v-if="item.url"
                                        :href="item.url"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="ref_link_btn"
                                    >more</a>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>

                <button
                    class="ref_arrow ref_arrow-right"
                    @click="swiperNext"
                    aria-label="下一張"
                >
                    <img :src="withBase('arrow_right.png')" alt="下一張" />
                </button>
            </div>

            <div v-else class="ref_static_container ref-anim-2">
                <div
                    v-for="(item, idx) in infoData.references"
                    :key="idx"
                    class="ref_static_item"
                >
                    <div class="ref_item">
                        <img :src="withBase(item.img)" class="ref_cover" :alt="item.title" />
                        <div class="ref_content">
                            <h3 class="ref_title" v-html="item.title"></h3>
                            <p class="ref_desc">{{ item.desc }}</p>
                            <a
                                v-if="item.url"
                                :href="item.url"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="ref_link_btn"
                            >more</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@keyframes ref-fade-up {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
}

.ref-anim-1 {
    animation: ref-fade-up 0.9s ease both;
    animation-delay: 0.2s;
}

.ref-anim-2 {
    animation: ref-fade-up 0.9s ease both;
    animation-delay: 0.4s;
}

.references_wrap {
    width: 100%;
    box-sizing: border-box;
}

.references_inner {
    box-sizing: border-box;
}

.ref_video {
    display: block;
    position: relative;
    width: 100%;
    max-width: 850px;
    aspect-ratio: 16 / 9;
    margin: 0 auto 50px;
    background: #000000;
    border: 8px solid #72e9d3;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
}

.ref_video_thumb {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.ref_video_play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    border: 2px solid rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease, background 0.3s ease;
}

.ref_video_play svg {
    width: 28px;
    height: 28px;
    margin-left: 4px;
}

.ref_video:hover .ref_video_play {
    transform: translate(-50%, -50%) scale(1.1);
    background: rgba(255, 255, 255, 0.25);
}

.ref_carousel_container {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    box-sizing: border-box;
}

.ref_carousel_wrapper {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.ref_swiper {
    width: 100%;
    height: 100%;
    padding: 10px 0;
}

.ref_swiper :deep(.swiper-wrapper) {
    align-items: stretch;
}

.ref_swiper :deep(.swiper-slide) {
    height: auto;
    display: flex;
}

.ref_arrow {
    position: relative;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: transform 0.3s ease;
    z-index: 2;
    align-self: center;
}

.ref_arrow:hover {
    transform: scale(1.1);
}

.ref_arrow img {
    width: 100%;
    height: 100%;
    display: block;
}

.ref_static_container {
    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 20px;
    width: 100%;
    margin-top: 30px;
    flex-wrap: nowrap; /* 嚴格禁止垂直換行堆疊 */
}

.ref_static_item {
    width: 100%;
    max-width: 360px;
    flex: 1 1 360px;
    min-width: 0;
    display: flex;
}

.ref_static_item .ref_item {
    height: 100%;
}

.ref_item {
    width: 100%;
    max-width: 360px;
    height: 100%;
    margin: 0 auto;
    background: #ffffff;
    border: 3px solid #72e9d3;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
}

.ref_cover {
    width: 100%;
    aspect-ratio: 4 / 3;
    height: auto;
    object-fit: cover;
    display: block;
}

.ref_content {
    padding: 22px 24px 26px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
}

.ref_title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #01989f;
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.ref_desc {
    font-size: 0.92rem;
    color: #666666;
    line-height: 1.6;
    margin: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
}

.ref_link_btn {
    align-self: center;
    margin-top: auto;
    padding: 2px 40px;
    background: #72e9d3;
    color: #022f56;
    font-weight: 700;
    font-size: 0.95rem;
    border-radius: 999px;
    text-decoration: none;
    text-align: center;
    transition: opacity 0.2s ease;
}

.ref_link_btn:hover {
    opacity: 0.8;
}

@media screen and (max-width: 768px) {
    .ref_video {
        margin: 0 auto 36px;
    }

    .ref_video_play {
        width: 56px;
        height: 56px;
    }

    .ref_video_play svg {
        width: 22px;
        height: 22px;
    }

    .ref_carousel_container {
        gap: 8px;
    }

    .ref_arrow {
        width: 28px;
        height: 28px;
    }

    .ref_content {
        padding: 18px 20px 22px;
    }
}
</style>