<script setup lang="ts">
import type { WeatherStats } from '~/types';

// TODO: use settings to determine if we should use celcius or fahrenheit
const isCelcius = false;

const props = defineProps<{
  stats: WeatherStats;
}>();

function sunrise() {
  return formatTimeString(props.stats.sunrise);
}

function sunset() {
  return formatTimeString(props.stats.sunset);
}

function chanceOfRain() {
  return formatPercent(props.stats.daily_chance_of_rain);
}

function pressure() {
  return isCelcius ? `${props.stats.pressure_mb} mb` : `${props.stats.pressure_in} in`;
}

function wind() {
  const value = isCelcius ? props.stats.wind_kph : props.stats.wind_mph;
  return formatSpeed(value, isCelcius);
}

function uv() {
  return `${props.stats.uv} of 10`;
}

function feelsLike() {
  const value = isCelcius ? props.stats.feelslike_c : props.stats.feelslike_f;
  return formatTemp(value);
}

function visibility() {
  const value = isCelcius ? props.stats.vis_km : props.stats.vis_miles;
  return formatDistance(value, isCelcius);
}

const details = computed(() => {
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
</script>

<template>
  <div class="my-6 rounded-xl bg-indigo-50 p-4 text-base text-gray-900/60">
    <div class="uppercase">Weather Details</div>
    <div class="grid grid-cols-2 gap-4 py-4 md:grid-cols-4">
      <div v-for="detail in details" :key="detail.title" class="relative rounded-lg bg-white/35 px-4 py-2">
        <div>{{ detail.title }}</div>
        <div class="font-bold text-gray-900">{{ detail.value }}</div>
        <Icon class="absolute right-5 top-1/3" :name="detail.icon" color="gray" size="1.5em" />
      </div>
    </div>
  </div>
</template>
