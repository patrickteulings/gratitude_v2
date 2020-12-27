<template>
  <div class="hero">
    <div class="hero__inner">
      <div class="hero__date">{{ getToday() }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDate } from '@/use/useDate'

export default defineComponent({
  setup () {
    const today = new Date()

    const getToday = (): string => {
      return useDate().getToday(today)
    }
    return {
      today,
      getToday
    }
  }
})
</script>

<style scoped>

</style>
