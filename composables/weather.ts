import type { Forecast, WeatherLocation } from '~/types';

async function fetchWeather(
  url: string,
  params: Record<string, string | number | boolean | undefined> = {}
): Promise<any> {
  const runtimeConfig = useRuntimeConfig();
  return await $fetch(url, {
    baseURL: runtimeConfig.public.apiBaseUrl,
    params,
  });
}

export function search(query: string): Promise<WeatherLocation[]> {
  return fetchWeather('search.json', { q: query });
}

export function fetchForecast(query: string): Promise<Forecast> {
  return fetchWeather('forecast.json', { q: query, days: 1, aqi: 'no', alerts: 'no' });
}
