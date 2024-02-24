import { skipHydrate } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { Forecast } from '~/types';

const prefersCelciusKey = 'prefersCelcius';

export const useWeatherStore = defineStore('weatherStore', () => {
  const prefersCelcius = useStorage(prefersCelciusKey, false);
  const recentForecasts = ref<Forecast[]>([]);

  function addRecentForecast(forecast: Forecast) {
    const index = recentForecasts.value.findIndex((f) => f.location.name === forecast.location.name);
    if (index === -1) {
      recentForecasts.value.unshift(forecast);
    }

    if (recentForecasts.value.length > 5) {
      recentForecasts.value.pop();
    }
  }

  function removeRecentForecast(forecast: Forecast) {
    recentForecasts.value = recentForecasts.value.filter((f) => f.location.name !== forecast.location.name);
  }

  function clearRecentForecasts() {
    recentForecasts.value = [];
  }

  return {
    prefersCelcius: skipHydrate(prefersCelcius),
    recentForecasts,

    addRecentForecast,
    removeRecentForecast,
    clearRecentForecasts,
  };
});
