<script setup lang="ts">
import type { ForecastHour } from '~/types';

const props = defineProps<{
  hour: ForecastHour;
}>();

const hour = computed(() => {
  return props.hour.time;
});

const condition = computed(() => {
  return {
    icon: props.hour.condition.icon,
    text: props.hour.condition.text,
  };
});

const temp = computed(() => {
  return props.hour.temp_f;
});
</script>

<template>
  <div class="min-w-fit rounded-lg bg-white/35 px-4 py-2 text-center">
    <div>{{ formatTime(hour) }}</div>
    <div class="p-2"><img class="mx-auto" :src="condition.icon" :alt="condition.text" width="32" height="32" /></div>
    <div class="gray-900 font-bold">{{ formatTemp(temp) }}</div>
  </div>
</template>
