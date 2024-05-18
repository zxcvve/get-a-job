<script setup lang="ts">
import type { SupabaseVacancy } from "~/types/jobs";

const route = useRoute();

const { data: vacancy } = await useFetch(`/api/supabase/${route.params.id}`);

if (!vacancy.value) {
  await navigateTo("/");
}

let salaryString = `От ${vacancy.value.salary.from}`;
if (vacancy.value.salary.to) {
  salaryString += ` до ${vacancy.value.salary.to}`;
}
if (vacancy.value.salary.currency === "RUR") {
  salaryString += ` ₽`;
}
</script>

<template>
  <naive-config>
    <div class="flex justify-center">
      <div class="w-96 m-4 md:w-1/3">
        <NCard :title="vacancy.name">
          <template #header-extra>
            {{ vacancy.employer }}
          </template>
          Расписание: {{ vacancy.schedule.name }}<br />Опыт работы:
          {{ vacancy.experience.name }}<br />
          Тип занятости: {{ vacancy.employment.name }}
          <template #footer>
            <p class="font-bold">{{ salaryString }}</p>
          </template>
          <template #action>
            <NuxtLink :to="vacancy.url"
              ><NButton>Откликнуться</NButton></NuxtLink
            >
          </template>
        </NCard>
      </div>
    </div></naive-config
  >
</template>
