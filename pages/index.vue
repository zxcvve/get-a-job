<script setup>
// const vacancies = await $fetch("/api/vacancies/all");
const vacancies = await $fetch("/api/supabase/vacancies");
import { NFlex } from "naive-ui";
</script>

<template>
  <naive-config>
    <!--TODO: fix styling, use nuxtui Container and Skeleton maybe?-->
    <div class="flex justify-center">
      <NFlex vertical class="max-w-screen-md">
        <div v-for="vacancy in vacancies" :key="vacancy.id" class="m-1">
          <VacancyCard :vacancy="vacancy" />
        </div>
      </NFlex>
    </div>
  </naive-config>
</template>
