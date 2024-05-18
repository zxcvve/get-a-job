// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "nuxt-scheduler",
    "@bg-dev/nuxt-naiveui",
    "nuxt-cron",
  ],
  eslint: { lintOnStart: false },
  colorMode: { preference: "light" },
  supabase: {
    redirect: false,
  },
  cron: {
    runOnInit: true,
    timeZone: "Europe/Moscow",
    jobsDir: "cron",
  },
  runtimeConfig: {
    supabaseUrl: "",
    supabaseKey: "",
    superjobId: "",
    superjobKey: "",
  },
});
