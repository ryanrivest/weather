<script setup lang="ts">
import { useGeolocation, watchDebounced } from '@vueuse/core';
import type { Forecast, WeatherLocation } from './types';

const isCelcius = ref(false);
const location = ref<WeatherLocation>();
const coords = ref<GeolocationCoordinates>();
const forecast = ref<Forecast>();

// const { coords, locatedAt, error, resume, pause } = useGeolocation();

const getLocation = () => {
  // change to VueUse useSupported
  //   const isSupported = useSupported(() => navigator && 'geolocation' in navigator)
  // https://github.com/vueuse/vueuse/blob/main/packages/core/useGeolocation/index.ts
  if (!navigator || !('geolocation' in navigator)) {
    console.log('error: Geolocation is not available.');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      coords.value = position.coords;
    },
    (error) => {
      console.log('error', error);
      // TODO: get random city
    }
  );

  //pause();

  // get the city name from the coordinates
};

getLocation();

const getCity = async () => {
  if (coords.value) {
    const locations = await search(`${coords.value.latitude}, ${coords.value.longitude}`);
    location.value = locations[0];
  }
};

const setCity = () => {
  location.value = {
    id: 0,
    name: 'New York',
    region: 'New York',
    country: 'United States of America',
    lat: 40.7128,
    lon: -74.006,
    tz_id: 'America/New_York',
    localtime_epoch: 1633941600,
    localtime: '2021-10-11 12:00',
  };
};

async function getForecast() {
  if (!location.value) {
    return;
  }

  try {
    const { lat, lon } = location.value;
    const data = await fetchForecast(`${lat},${lon}`);
    forecast.value = data;
  } catch (e: any) {
    //error.value = e;
  }
}

watch(location, async () => {
  await getForecast();
});
</script>

<template>
  <div class="m-5">Location: {{ location }}</div>
  <div>
    <button @click="getCity">Get City</button>
    <button @click="setCity">Set City</button>
  </div>
  <div class="m-5">Time: {{ formatTime('2024-02-17 00:00') }}</div>
  <main class="gray-100 container mx-auto h-screen max-w-4xl p-5">
    <div
      class="space-between justify-content flex w-full flex-wrap items-center gap-4 md:flex-nowrap md:justify-normal md:gap-0"
    >
      <img src="/images/logo.svg" alt="Just Weather Logo" class="mx-auto h-7 w-full md:ml-auto md:mr-0 md:w-auto" />
      <div class="mx-auto flex w-full grow items-center gap-4 md:ml-8">
        <Search class="grow" />
        <Toggle v-model="isCelcius" class="flex-shrink-0" />
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
