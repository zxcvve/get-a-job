<script setup>
// const vacancies = await $fetch("/api/vacancies/all");
const vacancies = await $fetch("/api/supabase/vacancies");
</script>

<template>
  <naive-conifg>
    <!--TODO: fix styling, use nuxtui Container and Skeleton maybe?-->
    <!--    <UContainer :ui="{ constrained: 'max-w-2xl' }">-->
    <!--      <div v-for="vacancy in vacancies" :key="vacancy.id" class="m-1">-->
    <!--        <VacancyCard :vacancy="vacancy" />-->
    <!--      </div>-->
    <!--    </UContainer>-->
  </naive-conifg>
</template>
