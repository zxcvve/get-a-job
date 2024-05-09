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
// идея: засунуть полную ссылку в watchEffect, при изменении фильтров вакансии будут подгружаться автоматически
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
    <div class="flex justify-center">
      <div class="w-96 m-4 md:w-1/3">
        <NFlex vertical>
          <VacancyFilter
            v-model="selectedVacancyFilter"
            @filter-clicked="filterVacancies"
            @reset-clicked="resetVacancies"
          />
          <div v-for="vacancy in vacancies.data" :key="vacancy.id" class="my-1">
            <VacancyCard :vacancy="vacancy" />
          </div>
          <NPagination v-model:page="page" :page-count="vacancies.pages" />
        </NFlex>
      </div>
    </div>
  </naive-config>
</template>
