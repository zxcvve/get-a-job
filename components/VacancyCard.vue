<script setup lang="ts">
import type { Vacancy } from "~/types";

const props = defineProps<{ vacancy: Vacancy }>();
</script>

<template>
  <NuxtLink :to="props.vacancy.alternate_url">
    <UCard>
      <template #header>
        <!--      <Placeholder class="h-8" />-->
        <p>{{ props.vacancy.name }}</p>
      </template>

      <!--    <Placeholder class="h-32" />-->

      <template v-if="props.vacancy.salary" #footer>
        <p>
          Зарплата от {{ props.vacancy.salary.from }}
          <span v-if="props.vacancy.salary.to"
            >до {{ props.vacancy.salary.to }}</span
          >
          {{ props.vacancy.salary.currency }}
        </p>
      </template>
    </UCard>
  </NuxtLink>
</template>
