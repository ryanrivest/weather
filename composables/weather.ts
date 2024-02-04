import type { SearchLocation } from '~/types';

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

export function searchLocations(query: string): Promise<SearchLocation[]> {
  return fetchWeather('search.json', { q: query });
}
