<script setup lang="ts">
import { watchDebounced } from '@vueuse/core';
import type { SearchLocation } from '~/types';

const input = ref('');
const error = ref<unknown>();
const count = ref<undefined | number>();

const locations = ref<SearchLocation[]>([]);
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
  count.value = undefined;
  locations.value = [];

  await fetch();
}

async function fetch() {
  if (!input.value) {
    return;
  }

  try {
    const data = await searchLocations(currentSearch.value);
    count.value = data.length;
    locations.value.push(...data);
  } catch (e: any) {
    error.value = e;
  }
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
  { debounce: 1000, maxWait: 5000 }
);
</script>

<template>
  <div class="relative" :class="$attrs.class">
    <input
      v-model="input"
      v-focus
      class="w-full rounded-lg bg-indigo-50 px-4 py-1.5 text-gray-900 outline-2 outline-indigo-400 drop-shadow-md placeholder:text-gray-900/60 focus:drop-shadow-none"
      type="text"
      placeholder="Search for cities"
    />
    <!-- <div class="absolute my-2 w-full rounded-lg bg-indigo-50 px-4 py-1.5 text-gray-900 drop-shadow-md">
      No results found
    </div> -->
    <div
      v-if="searchResults.length"
      class="absolute my-2 w-full rounded-lg bg-indigo-50 px-4 py-1.5 text-gray-900 drop-shadow-md"
    >
      <ul>
        <li v-for="result in searchResults" :key="result.key">
          {{ result.value }}
        </li>
      </ul>
    </div>
  </div>
</template>
