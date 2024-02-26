<script setup lang="ts">
const store = useWeatherStore();

import type { Forecast } from '~/types';

const props = defineProps<{
  forecast: Forecast;
}>();

const items = computed(() => {
  return {
    sunrise: { title: 'Sunrise', value: sunrise(), icon: 'bi:sunrise' },
    sunset: { title: 'Sunset', value: sunset(), icon: 'bi:sunset' },
    chance_of_rain: {
      title: 'Chance of rain',
      value: chanceOfRain(),
      icon: 'bi:droplet-fill',
    },
    pressure: { title: 'Pressure', value: pressure(), icon: 'carbon:pressure-filled' },
    wind: { title: 'Wind', value: wind(), icon: 'bi:wind' },
    uv: { title: 'UV Index', value: uv(), icon: 'bi:sun-fill' },
    feelslike: { title: 'Feels like', value: feelsLike(), icon: 'bi:thermometer-half' },
    visibility: { title: 'Visibility', value: visibility(), icon: 'bi:eye-fill' },
  };
});

function sunrise() {
  return formatTimeString(astro.value.sunrise);
}

function sunset() {
  return formatTimeString(astro.value.sunset);
}

function chanceOfRain() {
  return formatPercent(day.value.daily_chance_of_rain);
}

function pressure() {
  return store.prefersCelcius ? `${current.value.pressure_mb} mb` : `${current.value.pressure_in} in`;
}

function wind() {
  const value = store.prefersCelcius ? current.value.wind_kph : current.value.wind_mph;
  return formatSpeed(value, store.prefersCelcius);
}

function uv() {
  return `${current.value.uv} of 10`;
}

function feelsLike() {
  const value = store.prefersCelcius ? current.value.feelslike_c : current.value.feelslike_f;
  return formatTemp(value);
}

function visibility() {
  const value = store.prefersCelcius ? current.value.vis_km : current.value.vis_miles;
  return formatDistance(value, store.prefersCelcius);
}

const current = computed(() => {
  return props.forecast.current;
});

const day = computed(() => {
  return props.forecast.forecast.forecastday[0].day;
});

const astro = computed(() => {
  return props.forecast.forecast.forecastday[0].astro;
});
</script>

<template>
  <div class="my-6 rounded-xl bg-indigo-50 p-4 text-base text-gray-900/60">
    <div class="uppercase">Weather Details</div>
    <div class="grid grid-cols-2 gap-4 py-4 md:grid-cols-4">
      <div v-for="item in items" :key="item.title" class="relative rounded-lg bg-white/35 px-4 py-2">
        <div>{{ item.title }}</div>
        <div class="font-bold text-gray-900">{{ item.value }}</div>
        <Icon class="absolute right-5 top-1/3" :name="item.icon" color="gray" size="1.5em" />
      </div>
    </div>
  </div>
</template>
