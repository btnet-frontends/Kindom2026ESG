<script setup>
const withBase = (p) => (p?.startsWith('/') ? import.meta.env.BASE_URL + p.slice(1) : p)
</script>

<template>
    <div id="kv" class="kv_area">
        <div class="kv_container max-w-[1366px] w-full min-h-screen px-4 sm:px-8 mx-auto flex flex-col items-center justify-between pt-[95px] pb-8 sm:pt-[110px] sm:pb-12">
            <div class="title_wrap w-full flex justify-center">
                <img
                    class="kv_title w-full max-w-[720px] md:max-w-[780px] lg:max-w-[760px] h-auto object-contain"
                    :src="withBase('kv_title.svg')"
                    alt="2026冠德集團永續生活大調查"
                />
            </div>
            <div class="subtitle_wrap w-full flex justify-center mt-auto">
                <img
                    class="kv_subtitle hidden lg:block w-full max-w-[780px] md:max-w-[820px] lg:max-w-[820px] h-auto object-contain"
                    :src="withBase('kv_subtitle.svg')"
                    alt="活動時間與地點"
                />
                <img
                    class="kv_subtitle_mb block lg:hidden mx-auto h-auto object-contain"
                    :src="withBase('kv_subtitle_mb.svg')"
                    alt="活動時間與地點"
                />
            </div>
        </div>

        <div class="kv_wave">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
                <path d="M0,110 Q720,0 1440,110 L1440,120 L0,120 Z" fill="#f1f1f1"/>
            </svg>
        </div>
    </div>
</template>

<style scoped>
.kv_area {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    background: url('../assets/image/kv_bg.png') center center / cover no-repeat;
    margin-top: 0;
    box-sizing: border-box;
    padding-bottom: 0;
}

.kv_wave {
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    line-height: 0;
    z-index: 2;
    pointer-events: none;
}

.kv_wave svg {
    display: block;
    width: 100%;
    height: 120px;
}

.kv_container {
    box-sizing: border-box;
}

@keyframes kv-fade-up {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
}

.title_wrap {
    animation: kv-fade-up 1s ease both;
    animation-delay: 0.2s;
}

.subtitle_wrap {
    animation: kv-fade-up 1s ease both;
    animation-delay: 0.5s;
}

@media screen and (max-width: 1023.98px) {
    .kv_area {
        min-height: 100vh;
        background-image: url('../assets/image/kv_bg_mb.png');
    }

    .kv_container {
        padding-top: 100px;
        padding-bottom: 120px;
    }

    .kv_title {
        width: 90%;
        max-width: 90%;
        display: block !important;
    }

    .kv_subtitle_mb {
        width: 85%;
        max-width: 340px;
    }
}

@media screen and (max-width: 400px) {
    .kv_container {
        padding-bottom: 85px;
    }
    .kv_subtitle_mb {
        max-width: 280px;
    }
}

@media screen and (min-width: 401px) and (max-width: 640px) {
    .kv_container {
        padding-bottom: 95px;
    }
    .kv_subtitle_mb {
        max-width: 320px;
    }
}

@media screen and (min-width: 641px) and (max-width: 1023.98px) {
    .kv_subtitle_mb {
        width: 68%;
        max-width: 580px;
    }
}

@media screen and (min-width: 1024px) and (orientation: portrait) {
    .kv_area {
        background-image: url('../assets/image/kv_bg_mb.png') !important;
    }

    .kv_subtitle {
        display: none !important;
    }

    .kv_subtitle_mb {
        display: block !important;
        width: 60%;
        max-width: 560px;
    }

    .kv_container {
        padding-top: 100px;
        padding-bottom: 160px;
    }

    .kv_title {
        max-width: 640px !important;
    }
}


@media screen and (min-width: 1024px) and (orientation: landscape) and (min-height: 1200px) {
    .kv_container {
        padding-bottom: 160px;
    }
}

@media screen and (min-width: 1600px) and (orientation: landscape) {
    .kv_container {
        padding-bottom: 140px;
    }
}

@media screen and (min-width: 1024px) and (orientation: landscape) and (max-height: 850px) {
    .kv_container {
        padding-top: 130px;
        padding-bottom: 90px;
    }

    .kv_title {
        max-width: 420px !important;
    }

    .kv_subtitle {
        max-width: 480px !important;
    }
}

@media screen and (min-width: 1024px) and (orientation: landscape) and (max-height: 650px) {
    .kv_container {
        padding-top: 95px;
        padding-bottom: 70px;
    }

    .kv_title {
        max-width: 320px !important;
    }

    .kv_subtitle {
        max-width: 380px !important;
    }
}
</style>