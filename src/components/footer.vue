<script setup>
    defineProps({
        footerInfo: Object
    });
</script>

<template>
    <div class="footer_area w-full">
        <div class="footer_box flex flex-col gap-3 max-w-[100%] mx-auto py-5 px-10 text-center" style="color:#fff">
            <p class="text-md mb-1">{{footerInfo.text}}</p> 
            <p class="text-sm">{{footerInfo.copyright}}</p>
        </div>
    </div>
</template>

<style scoped>
    .footer_area {
        background-color: #022f56;
    }
</style>