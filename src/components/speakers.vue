<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getWindowWidth } from '../utils/utils'

defineProps({
  speakers: Array,
  infoData: Object
})

const windowWidth = ref(0)

const withBase = (p) => (p?.startsWith('/') ? import.meta.env.BASE_URL + p.slice(1) : p)

function handleResize() {
  windowWidth.value = getWindowWidth()
}

const activeCardIndex = ref(null)
function toggleCard(idx) {
  activeCardIndex.value = activeCardIndex.value === idx ? null : idx
}

const modalSpeaker = ref(null)
function openModal(item) {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = `${scrollbarWidth}px`
  modalSpeaker.value = item
}
function closeModal() {
  modalSpeaker.value = null
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}
function handleKeydown(e) {
  if (e.key === 'Escape') closeModal()
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="content_wrap">
    <div class="sec_title_group relative select-none">
      <span class="sec_title_en text-5xl sm:text-7xl md:text-8xl font-black text-white uppercase tracking-wider leading-none opacity-90">
        {{ infoData.titleEn || 'SPEAKERS' }}
      </span>
    </div>

    <div class="speaker_bg_wrap">
      <div class="speaker_grid_box max-w-[1366px] px-8 pt-10 pb-16 mx-auto">
        <div class="speaker_header">
          <h2 class="speaker_title_main text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide relative z-10 m-0">
            {{ infoData.title || '講者陣容' }}
          </h2>
          <p class="speaker_subtitle">{{ infoData.subtitle || '匯聚產學研跨界菁英，共繪科技新藍圖' }}</p>
        </div>

        <div class="speaker_grid">
          <div
            v-for="(item, idx) in speakers"
            :key="idx"
            class="speaker_item"
            :class="{ 'is-active': activeCardIndex === idx }"
            @click="toggleCard(idx)"
          >
            <div class="speaker_img_wrap">
              <img :src="item.img" :alt="item.name" class="speaker_photo" />

              <div class="speaker_overlay">
                <div class="speaker_wave_wrap">
                  <img
                    class="speaker_wave"
                    :src="withBase('speaker_gradient.svg')"
                    alt=""
                    aria-hidden="true"
                  />

                  <div class="speaker_caption">
                    <p class="speaker_name_zh">{{ item.name }}</p>
                    <p class="speaker_title_zh" v-html="item.title"></p>
                  </div>
                </div>

                <div class="speaker_panel">
                  <div class="speaker_divider"></div>

                  <p class="speaker_desc">{{ item.desc }}</p>

                  <button
                    type="button"
                    class="speaker_more_btn"
                    @click.stop="openModal(item)"
                  >
                    More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="modal_fade">
        <div
          v-if="modalSpeaker"
          class="speaker_modal_backdrop"
          @click.self="closeModal"
        >
          <div class="speaker_modal">
            <button class="speaker_modal_close" @click="closeModal" aria-label="關閉">
              <svg viewBox="0 0 24 24" width="36" height="36">
                <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" />
              </svg>
            </button>

            <div class="speaker_modal_body">
              <div class="speaker_modal_photo_wrap">
                <img :src="modalSpeaker.img" :alt="modalSpeaker.name" class="speaker_modal_photo" />
              </div>

              <div class="speaker_modal_content">
                <h3 class="speaker_modal_name">{{ modalSpeaker.name }}</h3>
                <p class="speaker_modal_position" v-html="modalSpeaker.title"></p>
                <div class="speaker_modal_divider"></div>

                <div class="speaker_modal_section">
                  <h4 class="speaker_modal_section_title">講者簡介</h4>
                  <p v-if="modalSpeaker.current">現職：{{ modalSpeaker.current }}</p>
                  <p v-if="modalSpeaker.experience">經歷：{{ modalSpeaker.experience }}</p>
                  <p v-if="!modalSpeaker.current && !modalSpeaker.experience">{{ modalSpeaker.desc }}</p>
                </div>

                <div v-if="modalSpeaker.awards && modalSpeaker.awards.length" class="speaker_modal_section">
                  <h4 class="speaker_modal_section_title">近年獲獎</h4>
                  <p v-for="(award, i) in modalSpeaker.awards" :key="i">{{ award }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.content_wrap {
  position: relative;
}

.sec_title_group {
  position: relative;
  z-index: 1;
  margin-left: 40px;
  margin-top: 34px;
  margin-bottom: -6px;
}

@media screen and (min-width: 1200px) {
  .sec_title_group {
    margin-left: calc(50% - 683px + 90px);
  }
}
@media screen and (max-width: 768px) {
  .sec_title_group {
    margin-left: 0;
    text-align: center;
  }
}

.speaker_bg_wrap {
  position: relative;
}

.speaker_bg_wrap::before {
  content: '';
  position: absolute;
  top: 0;
  left: -4vw;
  right: -100vw;
  bottom: -5vw;
  border-top-left-radius: 120px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.92) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  z-index: 0;
  pointer-events: none;
}

.speaker_grid_box {
  position: relative;
  z-index: 1;
}

.speaker_header {
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 2rem;
}

.speaker_title_main {
  color: #01989f;
  letter-spacing: 4px;
  margin-bottom: 0.6rem;
}

.speaker_subtitle {
  font-size: 1.8rem;
  color: #4d4d4d;
  letter-spacing: 2px;
  margin: 0;
}

.speaker_grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.speaker_item {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.speaker_img_wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
}

.speaker_photo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.speaker_overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  z-index: 2;
}

.speaker_wave_wrap {
  position: relative;
  width: 100%;
  flex-shrink: 0;
}

.speaker_wave {
  display: block;
  width: 100%;
  height: auto;
}


.speaker_caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 18px 14px;
  color: #ffffff;
  background: transparent;
}

.speaker_name_zh {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.25;
  margin: 0 0 4px 0;
}

.speaker_title_zh {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.4;
  margin: 0;
}

.speaker_panel {
  position: relative;
  background-color: #3da7f1;
  padding: 0 18px;
  margin-top: -1px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

.speaker_panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: #01989f;
  opacity: 0.8;
  z-index: 0;
}

.speaker_divider,
.speaker_desc,
.speaker_more_btn {
  position: relative;
  z-index: 1;
}

.speaker_divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.5);
  margin: 12px 0;
}

.speaker_desc {
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.speaker_more_btn {
  display: block;
  margin: 16px auto 18px;
  padding: 8px 32px;
  border: none;
  border-radius: 999px;
  background: #ffffff;
  color: #01989f;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
}

.speaker_more_btn:hover {
  background: #e8f6f6;
}

@media (hover: hover) and (pointer: fine) {
  .speaker_item:hover .speaker_panel {
    max-height: 260px;
  }
}

@media (hover: none), (pointer: coarse) {
  .speaker_item.is-active .speaker_panel {
    max-height: 260px;
  }
}

@media screen and (max-width: 1024px) {
  .speaker_grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .speaker_grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .speaker_title_main {
    font-size: 1.8rem;
  }

  .speaker_subtitle {
    font-size: 1.4rem;
    letter-spacing: 1px;
  }

  .speaker_name_zh {
    font-size: 1.2rem;
  }

  .speaker_desc {
    font-size: 0.8rem;
  }
}

@media screen and (max-width: 480px) {
  .speaker_grid {
    grid-template-columns: repeat(1, 1fr);
    gap: 12px;
  }

  .speaker_bg_wrap::before {
    border-top-left-radius: 60px;
  }

  .speaker_name_zh {
    font-size: 1.2rem;
  }

  .speaker_title_zh {
    font-size: 0.85rem;
  }
}

.speaker_modal_backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 9999;
}

.speaker_modal {
  position: relative;
  background: #ffffff;
  border-radius: 32px;
  max-width: 900px;
  width: 100%;
  max-height: 88vh;
  overflow-y: auto;
  padding: 48px;
}

.speaker_modal_close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #01989f;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.speaker_modal_close:hover {
  background-color: rgba(1, 152, 159, 0.1);
}

.speaker_modal_body {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.speaker_modal_photo_wrap {
  flex-shrink: 0;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  background: #f1f1f1;
}

.speaker_modal_photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.speaker_modal_content {
  flex: 1;
  min-width: 0;
}

.speaker_modal_name {
  font-size: 2rem;
  font-weight: 800;
  color: #333333;
  margin: 0 0 8px 0;
}

.speaker_modal_position {
  font-size: 1.1rem;
  color: #555555;
  margin: 0;
}

.speaker_modal_divider {
  width: 100%;
  height: 2px;
  background: #01989f;
  margin: 16px 0 20px;
}

.speaker_modal_section {
  margin-bottom: 20px;
}

.speaker_modal_section_title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #333333;
  margin: 0 0 8px 0;
}

.speaker_modal_section p {
  font-size: 0.95rem;
  color: #444444;
  line-height: 1.7;
  margin: 0 0 4px 0;
}

@media screen and (max-width: 768px) {
  .speaker_modal {
    padding: 32px 24px;
    border-radius: 24px;
  }

  .speaker_modal_body {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .speaker_modal_photo_wrap {
    width: 160px;
    height: 160px;
  }

  .speaker_modal_name {
    font-size: 1.6rem;
  }

  .speaker_modal_section {
    text-align: left;
  }
}

.modal_fade-enter-active,
.modal_fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal_fade-enter-from,
.modal_fade-leave-to {
  opacity: 0;
}
</style>