<script setup>
const vacancies = await $fetch("/api/vacancies");
</script>

<template class="light">
  <div class="m-7">
    <!--    <NuxtWelcome />-->
    <!--    <VacancyCard />-->
    <ul>
      <li v-for="vacancy in vacancies.items">
        <VacancyCard :name="vacancy.name" />
        <!--        <p>{{ vacancy.name }}</p>-->
      </li>
    </ul>
  </div>
</template>
