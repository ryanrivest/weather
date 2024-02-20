<script setup lang="ts">
import type { ForecastHour } from '~/types';

defineProps<{
  hours: ForecastHour[];
}>();
</script>

<template>
  <div class="rounded-xl bg-indigo-50 p-4 pr-0 text-base uppercase text-gray-900/60">
    <div>Today's Forecast</div>
    <div class="flex gap-4 overflow-x-scroll py-4">
      <HourlyForecast v-for="hour in hours" :key="hour.time" :hour="hour" />
    </div>
  </div>
</template>
