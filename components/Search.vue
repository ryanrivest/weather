<script setup lang="ts">
import { useFocus, useGeolocation } from '@vueuse/core';
import { watchDebounced, onClickOutside } from '@vueuse/core';
import type { Forecast, WeatherLocation } from '~/types';

const { coords, error, resume, pause } = useGeolocation({ immediate: false });
const location = defineModel<WeatherLocation>();

const input = ref();
const inputValue = ref('');
const results = ref();
const loading = ref(false);

const locations = ref<WeatherLocation[]>([]);
const currentSearch = ref(inputValue.value);

const store = useWeatherStore();
const { recentForecasts } = storeToRefs(store);

onMounted(async () => {
  await getLocation();
});

const { focused: inputFocus } = useFocus(input);

const showRecent = ref(false);

watch(inputValue, (value) => {
  if (value) {
    showRecent.value = false;
  }
});

watch(inputFocus, (focused) => {
  if (focused) {
    showRecent.value = !currentSearch.value && recentForecasts.value.length > 0;
  } else {
    setTimeout(() => {
      showRecent.value = false;
    }, 150);
  }
});

const searchResults = computed(() => {
  return locations.value.map((location) => {
    let text = `${location.name}, ${location.region}`;

    if (location.country !== 'United States of America') {
      text = `${text}, ${location.country}`;
    }

    return {
      location: location,
      text: text,
    };
  });
});

async function autocomplete() {
  if (currentSearch.value === inputValue.value) {
    return;
  }

  currentSearch.value = inputValue.value;
  locations.value = [];

  await fetch();
}

async function fetch() {
  if (!inputValue.value) {
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
  inputValue.value = '';
  currentSearch.value = '';
  locations.value = [];
}

watchDebounced(
  inputValue,
  async () => {
    autocomplete();
  },
  { debounce: 500, maxWait: 1500 }
);

onClickOutside(results, () => {
  clearSearch();
});

async function getLocation() {
  resume();

  const { latitude, longitude } = coords.value;

  if (!error.value && latitude !== Infinity && longitude !== Infinity) {
    const locations = await search(`${latitude}, ${longitude}`);
    location.value = locations[0];
    pause();
  }
}

function selectLocation(selectedLocation: WeatherLocation) {
  location.value = selectedLocation;
  showRecent.value = false;
  clearSearch();
}

function removeRecent(forecast: Forecast) {
  store.removeRecentForecast(forecast);
}

function clearRecent() {
  store.clearRecentForecasts();
}
</script>

<template>
  <div class="relative" :class="$attrs.class">
    <div class="relative">
      <input
        ref="input"
        v-model="inputValue"
        class="w-full rounded-lg bg-indigo-50 px-4 py-1.5 text-gray-900 outline-2 outline-indigo-400 drop-shadow-md placeholder:text-gray-900/60 focus:drop-shadow-none"
        type="text"
        placeholder="Search for cities"
      />

      <a
        v-if="inputValue.length"
        class="absolute right-1.5 top-1.5 cursor-pointer text-gray-900/60 hover:text-gray-900"
        title="Clear search"
        @click="clearSearch"
      >
        <Icon name="heroicons:x-mark-20-solid" size="1.5em" />
      </a>

      <a
        v-if="!inputValue.length"
        class="absolute right-1.5 top-1.5 cursor-pointer text-gray-900/60 hover:text-gray-900"
        title="Use current location"
        @click="getLocation"
      >
        <Icon name="ic:twotone-my-location" size="1.5em" />
      </a>
    </div>

    <div ref="results" class="absolute z-10 my-2 w-full rounded-lg bg-indigo-50 text-gray-900 drop-shadow-md">
      <div v-if="loading" lass="py-1.5">
        <div class="flex text-gray-600">
          <Icon class="indigo-400" name="svg-spinners:12-dots-scale-rotate" color="gray" size="1.5em" />
          <div class="inline-block pl-1.5">Searching...</div>
        </div>
      </div>

      <div v-if="!loading && currentSearch" class="py-1.5">
        <div v-if="searchResults.length">
          <ul>
            <li
              v-for="searchResult in searchResults"
              :key="searchResult.location.id"
              class="flex cursor-pointer items-center gap-x-3 px-4 py-1.5 hover:bg-indigo-400 hover:text-white"
              @click="selectLocation(searchResult.location)"
            >
              {{ searchResult.text }}
            </li>
          </ul>
        </div>
        <div v-else class="px-4">No results found</div>
      </div>

      <div v-if="showRecent" class="py-1.5">
        <div>
          <div class="flex items-center">
            <div class="px-4 text-lg font-semibold">Recent</div>
            <a class="ml-auto mr-2 cursor-pointer text-sm text-indigo-400 hover:text-indigo-600" @click="clearRecent"
              >Clear all</a
            >
          </div>
          <ul>
            <li
              v-for="forecast in recentForecasts"
              :key="forecast.location.id"
              class="flex cursor-pointer items-center gap-x-3 overflow-x-hidden px-4 py-1.5 hover:bg-indigo-400 hover:text-white"
              @click="selectLocation(forecast.location)"
            >
              <div>
                <img
                  :src="forecast.current.condition.icon"
                  :alt="forecast.current.condition.text"
                  width="24"
                  height="24"
                />
              </div>

              <div class="font-bold">
                {{ formatTemp(store.prefersCelcius ? forecast.current.temp_c : forecast.current.temp_f) }}
              </div>
              <div>
                <div>{{ forecast.location.name }}</div>
                <div class="text-xs opacity-60">{{ forecast.location.country }}</div>
              </div>
              <div class="ml-auto">
                <a
                  class="cursor-pointer text-gray-900/60 hover:text-gray-900"
                  title="Remove"
                  @click.stop="removeRecent(forecast)"
                >
                  <Icon name="heroicons:trash" size="1.5em" />
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
