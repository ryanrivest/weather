import { joinURL, withQuery } from 'ufo';

export default defineEventHandler(async (event) => {
  // proxy weather API traffic
  const runtimeConfig = useRuntimeConfig();
  const weatherConfig = runtimeConfig.weather;

  const path = event.path.replace(/^\/api\//, ''); // /api/forecast.json -> /v1/forecast.json
  const target = joinURL(weatherConfig.apiBaseUrl, path);

  return proxyRequest(event, withQuery(target, { key: weatherConfig.apiKey }));
});
