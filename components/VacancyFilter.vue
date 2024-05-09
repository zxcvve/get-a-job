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

// TODO: fix hydration errors
const scheduleOptions = [
  { id: "remote", name: "Удалённая работа" },
  {
    id: "fullDay",
    name: "Полный день",
  },
  {
    id: "flexible",
    name: "Гибкий график",
  },
];

const selectedVacancyFilter = defineModel({
  default: {
    selectedSalary: undefined,
    selectedSchedule: undefined,
  },
});

const emit = defineEmits(["filterClicked", "resetClicked"]);
const handleFilter = () => {
  emit("filterClicked", selectedVacancyFilter);
};
// TODO: разобраться, как сбрасывать состояние радио кнопок
const resetClicked = () => {
  // vacancyFilter.value.selectedSalary = undefined;
  emit("resetClicked", selectedVacancyFilter);
};
</script>
<template>
  <NSpace vertical>
    <NRadioGroup v-model:value="selectedVacancyFilter.selectedSalary">
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
    <NCheckboxGroup v-model:value="selectedVacancyFilter.selectedSchedule">
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
    <NSpace>
      <NButton type="default" @click="resetClicked">Reset</NButton>
      <NButton type="primary" @click="handleFilter">Apply</NButton>
    </NSpace>
  </NSpace>
</template>
