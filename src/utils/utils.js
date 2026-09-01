export function getWindowWidth() {
    return window.innerWidth;
}

export function getDivResize(parentClass) {

    let parent_width = document.querySelector(parentClass).offsetWidth,
        parent_height = document.querySelector(parentClass).offsetHeight,
        width = 0,
        height = 0,
        windowWidth = window.innerWidth;

        // console.log(parent_width)

    const isLandscape = window.innerWidth > window.innerHeight;
    const isPortraitLayout = parent_width < parent_height + 250 && !(windowWidth === 1024 && isLandscape);

    if(isPortraitLayout){
        // console.log('寬小於高')
        // console.log(windowWidth)

        if(windowWidth < 1024 || (windowWidth === 1024 && !isLandscape)){
            width = parent_width/1.3;
            height = parent_width/1.2;

            // Cap the height if the viewport height is too short to prevent clipping under header
            const maxBoxHeight = parent_height * 0.75;
            if (height > maxBoxHeight) {
                height = maxBoxHeight;
                width = height * 1.2 / 1.3;
            }
        }else{
            width = parent_width/1.3;
            height = parent_width/3.9;

            const maxBoxHeight = parent_height * 0.75;
            if (height > maxBoxHeight) {
                height = maxBoxHeight;
                width = height * 3.9 / 1.3;
            }
        }
       
    }else{
        // console.log('寬大於高')
        width = parent_height/0.7;
        height = parent_height/2.1;
    }

    return { width, height };
}

let aosInitialized = false

/**
 * 確保整個頁面（不論有幾個 Astro island / Vue 元件）
 * 只執行一次 AOS.init()，避免不同元件各自呼叫
 * 造成 hydration 過程中 DOM class 被 AOS 提前改動、
 * 進而觸發 Vue 的 Hydration class mismatch 警告。
 */
export function initAOS(options = {}) {
    if (aosInitialized) return
    aosInitialized = true

    import('aos').then(({ default: AOS }) => {
        import('aos/dist/aos.css')
        requestAnimationFrame(() => {
            AOS.init({
                once: true,
                ...options
            })
        })
    })
}

/**
 * 部分內容是動態載入 / v-if 切換出現的（例如 swiper 動態渲染的
 * carousel 項目），需要讓 AOS 重新掃描新出現的 [data-aos] 元素時呼叫。
 */
export function refreshAOS() {
    if (!aosInitialized) return
    import('aos').then(({ default: AOS }) => {
        AOS.refresh()
    })
}