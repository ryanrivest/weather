<script setup lang="ts">
import type { Forecast } from '~/types';

const store = useWeatherStore();

const props = defineProps<{
  forecast: Forecast;
}>();

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

const hours = computed(() => {
  return props.forecast.forecast.forecastday[0].hour;
});

const details = computed(() => {
  const current = props.forecast.current;
  const dayDetails = props.forecast.forecast.forecastday[0];
  const day = dayDetails.day;
  const astro = dayDetails.astro;

  return {
    sunrise: astro.sunrise,
    sunset: astro.sunset,
    daily_chance_of_rain: day.daily_chance_of_rain,
    pressure_mb: current.pressure_mb,
    pressure_in: current.pressure_in,
    wind_mph: current.wind_mph,
    wind_kph: current.wind_kph,
    uv: current.uv,
    feelslike_c: current.feelslike_c,
    feelslike_f: current.feelslike_f,
    vis_km: current.vis_km,
    vis_miles: current.vis_miles,
  };
});
</script>

<template>
  <Current
    :city="city"
    :current-temp="currentTemp"
    :low-temp="lowTemp"
    :condition-icon="condition.icon"
    :condition-text="condition.text"
  />
  <Today :hours="hours" />
  <Details :details="details" />
</template>
