<script setup>
import { NFlex } from "naive-ui";

useHead({
  title: "Найди работу",
});

const page = ref(1);

const vacancies = useState("vacancies");

const selectedVacancyFilter = ref({
  selectedSalary: 0,
  selectedSchedule: [],
});

await callOnce(async () => {
  vacancies.value = await $fetch(
    `/api/supabase/vacancies?page${page.value}&salaryFrom=0`,
  );
});

watch([selectedVacancyFilter.value], async () => {
  page.value = 1;
});

watchEffect(async () => {
  vacancies.value = await $fetch(
    `/api/supabase/vacancies?page=${page.value}&salaryFrom=${selectedVacancyFilter.value.selectedSalary}`,
  );
});

const resetVacancies = async (filter) => {
  if (filter.value.selectedSalary !== undefined) {
    page.value = 1;
    selectedVacancyFilter.value.selectedSalary = 0;
    selectedVacancyFilter.value.selectedSchedule = [];
  }
};
</script>

<template>
  <naive-config>
    <div class="flex justify-center">
      <div class="w-96 m-4 md:w-1/3">
        <NFlex vertical>
          <VacancyFilter
            v-model="selectedVacancyFilter"
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
