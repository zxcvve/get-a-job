<script setup>
const vacancies = await $fetch("/api/vacancies/all");
</script>

<template class="light">
  <div class="m-7">
    <div
      v-for="vacancy in vacancies"
      :key="vacancy.id"
      class="max-w-screen-lg m-auto"
    >
      <VacancyCard :name="vacancy.name" />
    </div>
  </div>
</template>
