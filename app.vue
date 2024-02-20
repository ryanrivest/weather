<script setup lang="ts">
import type { Forecast, WeatherLocation } from './types';

const location = ref<WeatherLocation>();
const forecast = ref<Forecast>();
const error = ref<unknown>();
const prefersCelcius = ref(false);

onMounted(async () => {
  await getLocation();
});

async function getLocation() {
  try {
    const locations = await search('auto:ip');
    location.value = locations[0];
  } catch (e: any) {
    error.value = e;
  }
}

async function getForecast() {
  if (!location.value) {
    return;
  }

  try {
    const { lat, lon } = location.value;
    const data = await fetchForecast(`${lat},${lon}`);
    forecast.value = data;
  } catch (e: any) {
    error.value = e;
  }
}

const store = useWeatherStore();

onMounted(() => {
  watch(
    () => store.prefersCelcius,
    (value) => {
      prefersCelcius.value = value;
    },
    { immediate: true }
  );

  watch(prefersCelcius, () => {
    store.prefersCelcius = prefersCelcius.value;
  });

  watch(location, async () => {
    await getForecast();
  });
});
</script>

<template>
  <main class="gray-100 container mx-auto h-screen max-w-4xl p-5">
    <div
      class="space-between justify-content flex w-full flex-wrap items-center gap-4 md:flex-nowrap md:justify-normal md:gap-0"
    >
      <img src="/images/logo.svg" alt="Just Weather Logo" class="mx-auto h-7 w-full md:ml-auto md:mr-0 md:w-auto" />
      <div class="mx-auto flex w-full grow items-center gap-4 md:ml-8">
        <Search v-model="location" class="grow" />
        <TempToggle v-model="prefersCelcius" class="flex-shrink-0" />
      </div>
    </div>
    <Forecast v-if="forecast" :forecast="forecast" />
  </main>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
