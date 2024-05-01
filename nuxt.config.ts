// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "nuxt-scheduler",
    "@bg-dev/nuxt-naiveui",
  ],
  eslint: { lintOnStart: false },
  colorMode: { preference: "light" },
  supabase: {
    redirect: false,
  },
});
