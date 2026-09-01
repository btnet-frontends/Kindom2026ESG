// @ts-check
import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://events.businesstoday.com.tw', // 主站
  base: '/2026/Kindom2026ESG/',                          // 子路徑（一定要前後都有斜線）
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()],
  },
});