<script setup lang="ts">
import type { Forecast } from '~/types';

const props = defineProps<{
  forecast: Forecast;
}>();

const store = useWeatherStore();

const city = computed(() => {
  return props.forecast.location.name;
});

const currentTemp = computed(() => {
  return store.prefersCelcius ? props.forecast.current.temp_c : props.forecast.current.temp_f;
});

const lowTemp = computed(() => {
  return store.prefersCelcius
    ? props.forecast.forecast.forecastday[0].day.mintemp_c
    : props.forecast.forecast.forecastday[0].day.mintemp_f;
});

const condition = computed(() => {
  const icon = props.forecast.current.condition.icon.replace(/64x64/g, '128x128');

  return {
    text: props.forecast.current.condition.text,
    icon: icon,
  };
});
</script>

<template>
  <div class="space-between justify-content mx-auto flex w-full items-center gap-4 py-8">
    <div class="grow text-gray-900/85">
      <div class="text-4xl font-semibold">{{ city }}</div>
      <div class="text-6xl font-bold">
        <span class="inline-block">{{ formatTemp(currentTemp) }}</span>
        <span class="inline-block pl-4 text-gray-900/70">{{ formatTemp(lowTemp) }}</span>
      </div>
    </div>
    <div>
      <img :src="condition.icon" :alt="condition.text" width="100" height="100" />
    </div>
  </div>
</template>
