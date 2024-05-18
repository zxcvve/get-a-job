<script setup lang="ts">
import type { HHVacancy, SupabaseVacancy } from "~/types/jobs";
import { NCard } from "naive-ui";

const props = defineProps<{ vacancy: SupabaseVacancy }>();
const vacancyPage = `/vacancy/${props.vacancy.id}`;

let currency = "";
if (props.vacancy.salary?.currency === "RUR") {
  currency = "₽";
}
</script>

<template>
  <!--  TODO: fix db schema so it represents actual types-->
  <NuxtLink :to="vacancyPage" target="_blank">
    <NCard>
      <template #header>
        <!--      <Placeholder class="h-8" />-->
        <p>{{ props.vacancy.name }}</p>
      </template>

      <!--    <Placeholder class="h-32" />-->

      <template v-if="props.vacancy.salary">
        <p>
          Зарплата от {{ props.vacancy.salary.from }}
          <span v-if="props.vacancy.salary.to"
            >до {{ props.vacancy.salary.to }}</span
          >
          {{ currency }}
        </p>
      </template>
    </NCard>
  </NuxtLink>
</template>
