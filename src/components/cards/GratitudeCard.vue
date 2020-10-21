<template>
  <div class="gratitudeCard">
    <div class="gratitudeCard__inner">
      <small class="date" :style="getDateStyle(gratitude)">{{ getReadableDate(gratitude.timeStamp.toDate()) }}</small>
      <h1>{{ gratitude.title }}</h1>
      <p>{{ gratitude.body }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Prop, toRef, toRefs } from 'vue'

// Components
import { Gratitude, GratitudeWrapper } from '@/types/Gratitude'


// Composables
import { useDate } from '@/use/useDate'

export default defineComponent({
  props: {
    gratitudeData: {
      type: Object as PropType<GratitudeWrapper>,
      required: true
    }
  },

  setup (props) {
    const getGratitudeData = (): Gratitude => {
      return { ...props.gratitudeData.data }
    }

    const getReadableDate = (_date: Date): string => useDate().formatDateToWordsWithLimit(_date, 10)

    const getDateStyle = (_gratitude) => {
      const styleObj = {
        color: _gratitude.color || '#ff9900'
      }

      return styleObj
    }
    return {
      gratitude: getGratitudeData(),
      getDateStyle,
      getReadableDate
    }
  }
})
</script>

<style scoped>

</style>
