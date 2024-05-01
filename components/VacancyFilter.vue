<script setup lang="ts">
import { NButton, NSpace, NRadioGroup, NRadio } from "naive-ui";

const salaryOptions = [
  { title: "От 10000", value: 10000 },
  { title: "От 20000", value: 20000 },
  { title: "От 30000", value: 30000 },
  { title: "От 40000", value: 40000 },
];
</script>
<template>
  <NSpace vertical>
    <div>
      <NRadioGroup v-model:value="value">
        <NSpace vertical>
          <p>Уровень дохода</p>
          <NRadio
            v-for="option in salaryOptions"
            :key="option.value"
            :value="option.value"
            :label="option.title"
          ></NRadio>
        </NSpace>
      </NRadioGroup>
    </div>
    <div>
      <NButton type="default">Reset</NButton>
      <NButton type="primary">Apply</NButton>
    </div>
  </NSpace>
</template>
