<script setup lang="ts">
import {
  NButton,
  NCheckbox,
  NCheckboxGroup,
  NRadio,
  NRadioGroup,
  NSpace,
} from "naive-ui";

const experience = [
  { id: "noExperience", name: "Нет опыта" },
  { id: "between1And3", name: "От 1 года до 3 лет" },
  { id: "between3And6", name: "От 3 до 6 лет" },
  { id: "moreThan6", name: "Более 6 лет" },
];

const salaryOptions = [
  { title: "От 10000", value: 10000 },
  { title: "От 20000", value: 20000 },
  { title: "От 30000", value: 30000 },
  { title: "От 40000", value: 40000 },
];

// nuxt throws "hydration attribute mismatch" warns
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
    selectedSalary: 0,
    selectedSchedule: "",
    selectedExperience: "",
  },
});

const emit = defineEmits(["resetClicked"]);

const resetClicked = () => {
  emit("resetClicked", selectedVacancyFilter);
};
</script>
<template>
  <NSpace>
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

    <NRadioGroup v-model:value="selectedVacancyFilter.selectedSchedule">
      <NSpace vertical>
        <p class="font-bold">Тип занятости</p>
        <NRadio
          v-for="item in scheduleOptions"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        ></NRadio>
      </NSpace>
    </NRadioGroup>

    <NRadioGroup v-model:value="selectedVacancyFilter.selectedExperience">
      <NSpace vertical>
        <p class="font-bold">Опыт работы</p>
        <NRadio
          v-for="item in experience"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        ></NRadio>
      </NSpace>
    </NRadioGroup>
    <NSpace>
      <NButton type="default" @click="resetClicked">Сброс</NButton>
    </NSpace>
  </NSpace>
</template>
