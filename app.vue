<script setup lang="ts">
  import { watchDebounced } from '@vueuse/core'
  import type { SearchLocation } from '~/types'

  const input = ref('')
  const error = ref<unknown>()
  const count = ref<undefined | number>()

  const locations = ref<SearchLocation[]>([])
  const currentSearch = ref(input.value)

  async function autocomplete() {
    if (currentSearch.value === input.value) {
      return
    }

    currentSearch.value = input.value
    count.value = undefined
    locations.value = []

    await fetch()
  }

  async function fetch() {
    if (!input.value) {
      return
    }

    try {
      const data = await searchLocations(currentSearch.value)
      count.value = data.length
      locations.value.push(...data)
    }
    catch (e: any) {
      error.value = e
    }
  }

  const vFocus = {
    mounted(el: HTMLElement) {
      el.focus()
    }
  }

  watchDebounced(input, async () => {
    autocomplete()
  }, { debounce: 1000, maxWait: 5000 })
</script>

<template>
  <div>
    <input
      v-model="input"
      v-focus
      type="text"
      placeholder="Search for cities..."
    />
  </div>

  <div v-if="locations">
    <pre>
      {{ locations }}
    </pre>
  </div>
</template>
