<script setup lang="ts">
import type { Vacancy } from "~/server/api/vacancies";
const props = defineProps<Vacancy>();
</script>

<template>
  <UCard>
    <template #header>
      <Placeholder class="h-8" />
      <p>{{ props.name }}</p>
    </template>

    <Placeholder class="h-32" />

    <template #footer>
      <Placeholder class="h-8" />
    </template>
  </UCard>
</template>
