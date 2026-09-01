<script setup>
import { ref } from 'vue'

defineProps({
    menu: Array
})

const isMenuOpen = ref(false)

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const withBase = (p) => (p?.startsWith('/') ? import.meta.env.BASE_URL + p.slice(1) : p)

const handleNavClick = (tagUrl) => {
    if (!tagUrl) return
    const targetId = tagUrl.startsWith('#') ? tagUrl.slice(1) : tagUrl
    const target = document.getElementById(targetId)
    if (target) {
        const headerOffset = window.innerWidth <= 1024 ? 70 : 100
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset

        window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
    isMenuOpen.value = false
}

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
    <header class="header_fixed">
        <div class="navbar">
            <div class="nav-right">
                <ul class="menu" :class="{ active: isMenuOpen }">
                    <li
                        v-for="(item, idx) in menu"
                        :key="idx"
                        @click="handleNavClick(item.tagUrl)"
                    >
                        <p class="menu_text">{{ item.tagName }}</p>
                    </li>
                </ul>
            </div>

            <div class="menu-btn" @click="toggleMenu">
                <span class="hamburger_line" :class="{ open: isMenuOpen }"></span>
                <span class="hamburger_line" :class="{ open: isMenuOpen }"></span>
                <span class="hamburger_line" :class="{ open: isMenuOpen }"></span>
            </div>
        </div>
    </header>
</template>

<style scoped>
.header_fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background: transparent !important;
    pointer-events: none;
}

.navbar {
    pointer-events: auto;
    width: 92%;
    max-width: 1366px;
    height: 75px;
    padding: 15px 0;
    position: relative;
    z-index: 1000;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0 auto;
    background: transparent !important;
    border: none !important;
    box-sizing: border-box;
}

.nav-right {
    display: flex;
    align-items: center;
    background: #ffffff;
    border-radius: 50px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
    padding: 6px 12px;
    border: none !important;
}

.menu {
    margin: 0;
    padding: 0;
    display: flex;
    list-style: none;
    gap: 8px;
    align-items: center;
}

.menu li {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 24px;
    color: #01989f;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
    text-align: center;
    border-radius: 30px;
    user-select: none;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    background: transparent;
}

.menu_text {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 700;
    color: #01989f;
    letter-spacing: 1px;
    transition: color 0.3s ease;
    white-space: nowrap;
}

.menu li:hover {
    background: #01989f !important;
}

.menu li:hover .menu_text {
    color: #ffffff !important;
}

.menu-btn {
    height: 46px;
    width: 46px;
    cursor: pointer;
    transition: 0.3s;
    display: none;
    z-index: 2000;
    background: #ffffff;
    border-radius: 50%;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border: none !important;
}

.hamburger_line {
    display: block;
    width: 22px;
    height: 3px;
    background-color: #01989f;
    border-radius: 2px;
    transition: all 0.3s ease;
}

.hamburger_line.open:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}

.hamburger_line.open:nth-child(2) {
    opacity: 0;
}

.hamburger_line.open:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
}

@media screen and (max-width: 1024px) {
    .navbar {
        height: 60px;
        padding: 10px 0;
        width: 92%;
    }

    .logo a {
        height: 44px;
        padding: 6px 18px;
    }

    .logo img {
        height: 26px;
    }

    .nav-right {
        background: transparent;
        box-shadow: none;
        padding: 0;
    }

    .menu {
        position: fixed;
        top: 0;
        left: -100vw;
        width: 100vw;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: left 0.4s ease;
        overflow-y: auto;
        padding-top: 40px;
        box-sizing: border-box;
        margin: 0;
        opacity: 0;
        pointer-events: none;
        gap: 16px;
    }

    .menu.active {
        display: flex;
        opacity: 1;
        left: 0;
        z-index: 1000;
        pointer-events: auto;
    }

    .menu li {
        display: flex;
        width: 75%;
        max-width: 320px;
        padding: 14px 0;
        margin: 0;
        border-radius: 50px;
        border: 2px solid #01989f !important;
        background: #ffffff !important;
    }

    .menu_text {
        font-size: 1.25rem;
        color: #01989f;
    }

    .menu li:hover {
        background: #01989f !important;
    }

    .menu li:hover .menu_text {
        color: #ffffff !important;
    }

    .menu-btn {
        display: flex;
    }
}

@media screen and (min-width: 1025px) {
    .navbar {
        justify-content: center;
    }

    .menu li {
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        background: transparent;
    }
}

@media screen and (max-width: 540px) {
    .logo a {
        padding: 5px 14px;
        height: 40px;
    }
    .logo img {
        height: 22px;
    }
}
</style>