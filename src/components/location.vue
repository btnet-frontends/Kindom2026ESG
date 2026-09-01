<script setup>
import { onMounted } from 'vue'

const withBase = (p) => (p?.startsWith('/') ? import.meta.env.BASE_URL + p.slice(1) : p)

defineProps({
    infoData: Object
});

onMounted(() => {
    const els = document.querySelectorAll('.loc-fade')
    els.forEach((el, i) => {
        el.style.animationDelay = `${i * 0.15}s`
        el.classList.add('loc-fade-in')
    })
})
</script>

<template>
    <div class="content_wrap relative z-10">
        <div class="sec_title_group flex flex-col items-center justify-center text-center my-6 sm:my-8 relative select-none">
            <span class="sec_title_en text-5xl sm:text-7xl md:text-8xl font-black text-white uppercase tracking-wider leading-none opacity-90">
                {{ infoData.titleEn || 'LOCATION' }}
            </span>
            <h2 class="sec_title_zh text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#01989f] tracking-wide -mt-6 sm:-mt-8 md:-mt-10 relative z-10 m-0">
                {{ infoData.title || '交通資訊' }}
            </h2>
        </div>
        <div class="location_container max-w-[1200px] py-10 px-6 sm:px-12 mx-4 sm:mx-5 xl:mx-auto loc-fade text-left">

            <div class="map_wrapper rounded-[20px] overflow-hidden shadow-lg h-[300px] sm:h-[380px] mb-10 loc-fade">
                <iframe
                    :src="infoData.mapUrl"
                    width="100%"
                    height="100%"
                    style="border:0;"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    title="交通位置圖"
                ></iframe>
            </div>

            <div class="flex flex-col gap-4 mb-10 loc-fade text-left">
                <div class="flex items-center gap-3 text-left">
                    <img :src="withBase('icon_location.svg')" class="w-8 h-8 shrink-0" alt="地點" />
                    <p class="text-2xl sm:text-3xl font-bold" style="color:#022f56;">地點：{{ infoData.venue }}</p>
                </div>
                <div class="flex items-center gap-3 text-left">
                    <img :src="withBase('icon_date.svg')" class="w-8 h-8 shrink-0" alt="時間" />
                    <p class="text-2xl sm:text-3xl font-bold" style="color:#022f56;">
                        時間：{{ infoData.date }}<span class="text-lg sm:text-xl font-normal ml-1" style="color:#595959;">{{ infoData.dateNote }}</span>
                    </p>
                </div>
            </div>

            <div v-for="(group, gIdx) in infoData.transportGroups" :key="gIdx" class="mb-10 last:mb-0 loc-fade text-left">
                <div class="flex items-center gap-3 mb-5 text-left">
                    <img :src="withBase(group.icon)" class="w-8 h-8 shrink-0" :alt="group.title" />
                    <h3 class="text-2xl sm:text-3xl font-bold" style="color:#022f56;">
                        {{ group.title }}<span class="text-lg sm:text-xl font-normal ml-1" style="color:#595959;">{{ group.distanceNote }}</span>
                    </h3>
                </div>
                <div v-for="(item, iIdx) in group.items" :key="iIdx" class="flex items-start gap-3 mb-4 last:mb-0 text-left">
                    <img :src="withBase(item.icon)" class="w-8 h-8 mt-0.5 shrink-0" :alt="item.type" />
                    <div class="text-left">
                        <p class="text-xl sm:text-2xl font-bold mb-1" style="color:#022f56;">{{ item.type }}</p>
                        <p class="text-lg leading-relaxed" style="color:#595959;">{{ item.desc }}</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
.loc-fade {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s ease, transform 0.7s ease;
}
.loc-fade.loc-fade-in {
    opacity: 1;
    transform: translateY(0);
}

.location_container {
    position: relative;
    z-index: 1;

    &::before {
        content: '';
        position: absolute;
        left: -100vw;
        right: -4vw;
        bottom: -4vw;
        top: -10vw;
        border-bottom-right-radius: 120px;
        background: linear-gradient(
            to top,
            rgba(255, 255, 255, 0.92) 0%,
            rgba(255, 255, 255, 0.92) 60%,
            rgba(255, 255, 255, 0) 100%
        );
        z-index: -1;
        pointer-events: none;
    }
}
@media screen and (max-width: 640px) {
    .location_container::before {
        border-bottom-right-radius: 24px;
    }
}
</style>