import { skipHydrate } from 'pinia';
import { useStorage } from '@vueuse/core';

const prefersCelciusKey = 'prefersCelcius';

export const useWeatherStore = defineStore('weatherStore', () => {
  const prefersCelcius = useStorage(prefersCelciusKey, false);

  return {
    prefersCelcius: skipHydrate(prefersCelcius),
  };
});
