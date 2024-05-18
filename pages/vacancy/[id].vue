<script setup lang="ts">
const route = useRoute();

const vacancy = await $fetch(`/api/supabase/${route.params.id}`);
</script>

<template>
  <naive-config>
    <div class="flex justify-center">
      <div class="w-96 m-4 md:w-1/3">{{ vacancy.id }}</div>
    </div></naive-config
  >
</template>
