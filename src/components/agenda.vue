<script setup>
defineProps({
    infoData: Object
});

// 依照「是否有 role」把 speakers 分組：
// 只要 sp.role 有值（如 主持人、與談人），就開一個新組；
// sp.role 為空的項目，會併入「前一個」有 role 的那組（共用同一條左邊綠色直線）。
function groupSpeakers(speakers) {
    if (!speakers || !speakers.length) return [];
    const groups = [];
    let current = null;
    speakers.forEach((sp) => {
        if (sp.role || !current) {
            current = [];
            groups.push(current);
        }
        current.push(sp);
    });
    return groups;
}
</script>

<template>
    <div class="content_wrap relative z-10">
        <div class="agenda_title_group flex flex-col items-center justify-center text-center my-6 sm:my-8 relative select-none">
            <span class="agenda_title_en text-5xl sm:text-7xl md:text-8xl font-black text-white uppercase tracking-wider leading-none opacity-90">
                {{ infoData.titleEn || 'AGENDA' }}
            </span>
            <h2 class="agenda_title_zh text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#01989f] tracking-wide -mt-6 sm:-mt-8 md:-mt-5 relative z-10 m-0">
                {{ infoData.title || '精彩議程' }}
            </h2>
        </div>

        <div class="agenda_container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div class="event_header_info text-center mb-8 sm:mb-10">
                <div class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#222222] leading-snug">
                    2026/09/23 <span class="text-lg sm:text-xl md:text-2xl">(三)</span>
                </div>
                <div class="text-base sm:text-lg md:text-xl font-bold text-[#01989f] leading-snug mb-3">
                    14:00-16:30 <span class="text-sm sm:text-base md:text-lg">(13:30開放報到)</span>
                </div>
                <div class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#222222] leading-snug">
                    冠德民權大樓15樓論壇室
                </div>
                <div class="text-base sm:text-lg md:text-xl font-bold text-[#01989f] leading-snug">
                    (臺北市松山區民權東路三段169號15樓)
                </div>
            </div>

            <div class="agenda_table_card w-full flex flex-col gap-[8px]">
                <div class="table_header grid grid-cols-[80px_1fr] sm:grid-cols-12 text-[#022f56] font-bold text-lg sm:text-xl py-4 px-6 sm:px-8 text-left">
                    <div class="col-span-1 sm:col-span-3 lg:col-span-2">時間</div>
                    <div class="col-span-1 sm:col-span-5 lg:col-span-6">
                        議程<span class="sm:hidden"> / 講者</span>
                    </div>
                    <div class="hidden sm:block sm:col-span-4 lg:col-span-4">講者</div>
                </div>

                <div class="table_rows flex flex-col gap-[8px]">
                    <div
                        v-for="(row, idx) in infoData.agendaInfo"
                        :key="idx"
                        class="table_row grid grid-cols-[80px_1fr] sm:grid-cols-12 py-4 px-6 sm:px-8"
                        :class="[
                            idx % 2 === 0 ? 'bg_white_70' : 'bg_f0fcf6',
                            idx === infoData.agendaInfo.length - 1 ? 'last_row' : 'middle_row',
                            (row.speakers && row.speakers.length) ? 'items-start sm:items-center' : 'items-center'
                        ]"
                    >
                        <div class="col-span-1 sm:col-span-3 lg:col-span-2 font-bold text-[#022f56] text-base sm:text-lg text-left">
                            {{ row.time }}
                        </div>

                        <div class="col-span-1 sm:col-span-5 lg:col-span-6 flex flex-col items-start text-left gap-1.5 pr-2">
                            <span v-if="row.tag" class="tag_badge bg-[#022f56] text-[#72e9d3] text-xs sm:text-sm font-bold px-3.5 py-1 rounded-full whitespace-nowrap inline-block">
                                {{ row.tag }}
                            </span>
                            <span class="topic_text text-base sm:text-lg font-bold text-[#022f56] leading-relaxed">
                                {{ row.topic }}
                            </span>

                            <div v-if="row.speakers && row.speakers.length" class="sm:hidden flex flex-col gap-2.5 mt-1 w-full">
                                <div
                                    v-for="(group, gIdx) in groupSpeakers(row.speakers)"
                                    :key="gIdx"
                                    class="speaker_group flex flex-col gap-1 border-l-4 border-[#72e9d3] pl-3"
                                >
                                    <div
                                        v-for="(sp, spIdx) in group"
                                        :key="spIdx"
                                        class="speaker_line flex flex-col gap-1 text-sm py-1"
                                    >
                                        <span v-if="sp.role || sp.title" class="flex flex-col gap-0.5">
                                            <span v-if="sp.role" class="flex items-center gap-1">
                                                <span class="text-[#555555] font-semibold">{{ sp.role }}</span>
                                                <span class="text-[#01989f] font-bold">｜</span>
                                            </span>
                                            <span v-if="sp.title" class="text-[#022f56] font-medium">{{ sp.title }}</span>
                                        </span>
                                        <span v-if="sp.highlightName" class="speaker_pill bg-[#72e9d3] text-[#022f56] font-bold text-xs px-3 py-0.5 rounded-full self-start">
                                            {{ sp.highlightName }}
                                        </span>
                                        <span v-if="sp.status" class="text-[#777777] text-xs font-normal">{{ sp.status }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="hidden sm:flex sm:col-span-4 lg:col-span-4 flex-col gap-2.5">
                            <div
                                v-for="(group, gIdx) in groupSpeakers(row.speakers)"
                                :key="gIdx"
                                class="speaker_group flex flex-col gap-1 border-l-4 border-[#72e9d3] pl-3"
                            >
                                <div
                                    v-for="(sp, spIdx) in group"
                                    :key="spIdx"
                                    class="speaker_line flex flex-col gap-1 text-sm sm:text-base py-1"
                                >
                                    <span v-if="sp.role || sp.title" class="flex flex-col gap-0.5">
                                        <span v-if="sp.role" class="flex items-center gap-1">
                                            <span class="text-[#555555] font-semibold">{{ sp.role }}</span>
                                            <span class="text-[#01989f] font-bold">｜</span>
                                        </span>
                                        <span v-if="sp.title" class="text-[#022f56] font-medium">{{ sp.title }}</span>
                                    </span>
                                    <span v-if="sp.highlightName" class="speaker_pill bg-[#72e9d3] text-[#022f56] font-bold text-xs sm:text-sm px-3 py-0.5 rounded-full self-start">
                                        {{ sp.highlightName }}
                                    </span>
                                    <span v-if="sp.status" class="text-[#777777] text-xs sm:text-sm font-normal">{{ sp.status }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.agenda_container {
    box-sizing: border-box;
}

.agenda_table_card {
    background: transparent;
    box-shadow: none;
    border: none;
}

.table_header {
    background-color: #72e9d3;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border: none !important;
}

.bg_white_70 {
    background-color: rgba(255, 255, 255, 0.7) !important;
}

.bg_f0fcf6 {
    background-color: #f0fcf6 !important;
}

.table_row {
    border: none !important;
}

.middle_row {
    border-radius: 0 !important;
}

.last_row {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    border-bottom-left-radius: 40px !important;
    border-bottom-right-radius: 40px !important;
}

.speaker_pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
</style>