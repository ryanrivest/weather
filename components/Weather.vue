<script setup lang="ts">
import type { Forecast, WeatherLocation } from '~/types';

const loading = ref(true);
const location = defineModel<WeatherLocation>();

const store = useWeatherStore();

const forecast = ref<Forecast>();
const error = ref<unknown>();

await getForecast();

watch(location, async () => {
  await getForecast();
});

async function getForecast() {
  if (!location.value) {
    return;
  }

  loading.value = true;

  try {
    const { lat, lon } = location.value;
    const data = await fetchForecast(`${lat},${lon}`);
    forecast.value = data;
    store.addRecentForecast(data);
  } catch (e: any) {
    error.value = e;
  }

  loading.value = false;
}
</script>

<template>
  <WeatherSkeleton v-if="loading" />
  <Error v-else-if="error" />
  <div v-else>
    <Current v-if="forecast" :forecast="forecast" />
    <Today v-if="forecast" :forecast="forecast" />
    <Details v-if="forecast" :forecast="forecast" />
  </div>
</template>
