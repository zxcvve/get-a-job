<script setup lang="ts">
import type { Vacancy } from "~/types/jobs";

const props = defineProps<{ vacancy: Vacancy }>();
import { NCard } from "naive-ui";
</script>

<template>
  <!--  TODO: fix db schema so it represents actual types-->
  <NuxtLink :to="props.vacancy.url">
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
          {{ props.vacancy.salary.currency }}
        </p>
      </template>
    </NCard>
  </NuxtLink>
</template>
