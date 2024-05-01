<script setup lang="ts">
import {
  NButton,
  NSpace,
  NRadioGroup,
  NRadio,
  NCheckbox,
  NCheckboxGroup,
} from "naive-ui";

const salaryOptions = [
  { title: "От 10000", value: 10000 },
  { title: "От 20000", value: 20000 },
  { title: "От 30000", value: 30000 },
  { title: "От 40000", value: 40000 },
];

const scheduleOptions = [
  { id: "remote", name: "Удалённая работа" },
  {
    id: "fullDay",
    name: "Полный день ",
  },
  {
    id: "flexible",
    name: "Гибкий график",
  },
];
</script>
<template>
  <NSpace vertical>
    <NRadioGroup v-model:value="value">
      <NSpace vertical>
        <p class="font-bold">Уровень дохода</p>
        <NRadio
          v-for="option in salaryOptions"
          :key="option.value"
          :value="option.value"
          :label="option.title"
        ></NRadio>
      </NSpace>
    </NRadioGroup>
    <NCheckboxGroup v-model:value="id">
      <NSpace vertical>
        <p class="font-bold">Тип занятости</p>
        <NCheckbox
          v-for="item in scheduleOptions"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        ></NCheckbox>
      </NSpace>
    </NCheckboxGroup>
    <div>
      <NButton type="default">Reset</NButton>
      <NButton type="primary">Apply</NButton>
    </div>
  </NSpace>
</template>
