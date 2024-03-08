<script setup>
// const vacancies = await $fetch("/api/vacancies/all");
const vacancies = await $fetch("/api/supabase/vacancies");
</script>

<template>
  <!--TODO: fix styling, use nuxtui Container and Skeleton maybe?-->
  <div class="m-7">
    <div class="max-w-screen-lg m-auto space-y-1.5">
      <div v-for="vacancy in vacancies" :key="vacancy.id">
        <VacancyCard :vacancy="vacancy" />
      </div>
    </div>
  </div>
</template>
