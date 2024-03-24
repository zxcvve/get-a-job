// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "nuxt-scheduler",
  ],
  eslint: { lintOnStart: false },
  colorMode: { preference: "light" },
  supabase: {
    redirect: false,
  },
});
