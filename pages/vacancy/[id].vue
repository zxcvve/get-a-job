<script setup lang="ts">
import type { SupabaseVacancy } from "~/types/jobs";

const route = useRoute();

const vacancy: SupabaseVacancy = await $fetch(
  `/api/supabase/${route.params.id}`,
);
if (!vacancy) {
  await navigateTo("/");
}

let salaryString = `От ${vacancy.salary.from}`;
if (vacancy.salary.to) {
  salaryString += ` до ${vacancy.salary.to}`;
}
if (vacancy.salary.currency === "RUR") {
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
