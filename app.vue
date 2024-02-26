<script setup lang="ts">
import type { WeatherLocation } from './types';

const location = ref<WeatherLocation>();
const prefersCelcius = ref(false);

const store = useWeatherStore();

const { data } = await useFetch('/api/ip');

onMounted(async () => {
  await getLocation();
});

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

async function getLocation() {
  if (!data.value) {
    return;
  }

  const ip = data.value.ip != '127.0.0.1' ? data.value.ip : 'auto:ip';

  const locations = await search(ip);
  location.value = locations[0];
}
</script>

<template>
  <main class="gray-100 container mx-auto h-screen max-w-4xl p-5">
    <div
      class="space-between justify-content flex w-full flex-wrap items-center gap-4 md:flex-nowrap md:justify-normal md:gap-0"
    >
      <img src="/images/logo.svg" alt="Just Weather Logo" class="mx-auto h-7 w-full md:ml-auto md:mr-0 md:w-auto" />
      <div class="mx-auto flex w-full grow items-center gap-4 md:ml-8">
        <Search v-model="location" class="grow" />
        <ClientOnly>
          <TempToggle v-model="prefersCelcius" class="flex-shrink-0" />
        </ClientOnly>
      </div>
    </div>

    <Weather v-if="location" v-model="location" />
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
