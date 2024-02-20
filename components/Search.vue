<script setup lang="ts">
import { useGeolocation } from '@vueuse/core';
import { watchDebounced, onClickOutside } from '@vueuse/core';
import type { WeatherLocation } from '~/types';

const input = ref('');
const results = ref();
// const error = ref<unknown>();
const loading = ref(false);

const locations = ref<WeatherLocation[]>([]);
const currentSearch = ref(input.value);

const searchResults = computed(() => {
  return locations.value.map((location) => {
    let value = `${location.name}, ${location.region}`;

    if (location.country !== 'United States of America') {
      value = `${value}, ${location.country}`;
    }

    return {
      key: location.id,
      value: value,
    };
  });
});

async function autocomplete() {
  if (currentSearch.value === input.value) {
    return;
  }

  currentSearch.value = input.value;
  locations.value = [];

  await fetch();
}

async function fetch() {
  if (!input.value) {
    return;
  }

  loading.value = true;

  try {
    const data = await search(currentSearch.value);
    locations.value.push(...data);
  } catch (e: any) {
    error.value = e;
  }

  loading.value = false;
}

function clearSearch() {
  input.value = '';
  currentSearch.value = '';
  locations.value = [];
}

const vFocus = {
  mounted(el: HTMLElement) {
    el.focus();
  },
};

watchDebounced(
  input,
  async () => {
    autocomplete();
  },
  { debounce: 500, maxWait: 1500 }
);

onClickOutside(results, () => {
  clearSearch();
});

const { coords, error, resume, pause } = useGeolocation({ immediate: false });
const location = defineModel<WeatherLocation>();

async function getLocation() {
  resume();

  const { latitude, longitude } = coords.value;

  if (!error.value && latitude !== Infinity && longitude !== Infinity) {
    const locations = await search(`${latitude}, ${longitude}`);
    location.value = locations[0];
    pause();
  }
}

onMounted(async () => {
  await getLocation();
});
</script>

<template>
  <div class="relative" :class="$attrs.class">
    <div class="relative">
      <input
        v-model="input"
        v-focus
        class="w-full rounded-lg bg-indigo-50 px-4 py-1.5 text-gray-900 outline-2 outline-indigo-400 drop-shadow-md placeholder:text-gray-900/60 focus:drop-shadow-none"
        type="text"
        placeholder="Search for cities"
      />

      <a
        v-if="input.length"
        class="absolute right-1.5 top-1.5 cursor-pointer"
        title="Clear search"
        @click="clearSearch"
      >
        <Icon name="heroicons:x-mark-20-solid" color="gray" size="1.5em" />
      </a>

      <a
        v-if="!input.length"
        class="absolute right-1.5 top-1.5 cursor-pointer"
        title="Use current location"
        @click="getLocation"
      >
        <Icon name="ic:twotone-my-location" color="gray" size="1.5em" />
      </a>
    </div>

    <div v-if="loading" class="absolute my-2 w-full rounded-lg bg-indigo-50 px-4 py-1.5 text-gray-900 drop-shadow-md">
      <div class="flex text-gray-600">
        <Icon class="indigo-400" name="svg-spinners:12-dots-scale-rotate" color="gray" size="1.5em" />
        <div class="inline-block pl-1.5">Searching...</div>
      </div>
    </div>

    <div
      v-if="!loading && currentSearch"
      ref="results"
      class="absolute my-2 w-full rounded-lg bg-indigo-50 px-4 py-1.5 text-gray-900 drop-shadow-md"
    >
      <div v-if="searchResults.length">
        <ul>
          <li v-for="result in searchResults" :key="result.key">
            {{ result.value }}
          </li>
        </ul>
      </div>
      <div v-else>No results found</div>
    </div>
  </div>
</template>
