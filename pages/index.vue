<script setup>
import { NFlex } from "naive-ui";

useHead({
  title: "Найди работу",
});

const page = ref(1);

const vacancies = useState("vacancies");

await callOnce(async () => {
  vacancies.value = await $fetch(`/api/supabase/vacancies?page${page.value}`);
});

// TODO: fix pagination for cases where filters are used
watchEffect(async () => {
  vacancies.value = await $fetch(`/api/supabase/vacancies?page=${page.value}`);
});
const filterVacancies = async (filter) => {
  if (filter.value.selectedSalary) {
    vacancies.value = await $fetch(
      `/api/supabase/vacancies?salaryFrom=${filter.value.selectedSalary}`,
    );
  }
};

const resetVacancies = async (filter) => {
  if (filter.value.selectedSalary !== undefined) {
    vacancies.value = await $fetch("/api/supabase/vacancies");
  }
};
const selectedVacancyFilter = ref({
  selectedSalary: undefined,
  selectedSchedule: undefined,
});
</script>

<template>
  <naive-config>
    <!--TODO: fix styling, use nuxtui Container and Skeleton maybe?-->
    <div class="flex justify-center">
      <NFlex vertical class="max-w-screen-md">
        <VacancyFilter
          v-model="selectedVacancyFilter"
          @filter-clicked="filterVacancies"
          @reset-clicked="resetVacancies"
        />
        <div v-for="vacancy in vacancies.data" :key="vacancy.id" class="m-1">
          <VacancyCard :vacancy="vacancy" />
        </div>
        <NPagination v-model:page="page" :page-count="vacancies.pages" />
      </NFlex>
    </div>
  </naive-config>
</template>
