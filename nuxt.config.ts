// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "nuxt-scheduler",
    "@bg-dev/nuxt-naiveui",
    "@vite-pwa/nuxt",
  ],
  eslint: { lintOnStart: false },
  colorMode: { preference: "light" },
  supabase: {
    redirect: false,
  },
});
