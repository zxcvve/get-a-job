<script setup>
const vacancies = await $fetch("/api/vacancies/all");
</script>

<template>
  <div class="m-7">
    <div
      v-for="vacancy in vacancies"
      :key="vacancy.id"
      class="max-w-screen-lg m-auto"
    >
      <VacancyCard class="m-2" :vacancy="vacancy" />
    </div>
  </div>
</template>
