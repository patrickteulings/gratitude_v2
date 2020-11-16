<template>
  <div class="gratitudeCard">
    <div class="gratitudeCard__inner">
      <small class="date"><span class="date__mood" :style="getMoodStyle(gratitude)"></span> {{ getReadableDate(gratitude.timeStamp.toDate()) }}</small>
      <h1 class="gratitudeCard__title">{{ gratitude.title }}</h1>
      <div class="gratitudeCard__body" v-html="gratitude.body"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Prop, toRef, toRefs } from 'vue'

// Components
import { IGratitude, IGratitudeWrapper } from '@/types/Gratitude'


// Composables
import { useDate } from '@/use/useDate'

export default defineComponent({
  props: {
    gratitudeData: {
      type: Object as PropType<IGratitudeWrapper>,
      required: true
    }
  },

  setup (props) {
    const getGratitudeData = (): IGratitude => {
      return { ...props.gratitudeData.data }
    }

    const getReadableDate = (_date: Date): string => useDate().formatDateToWordsWithLimit(_date, 10)

    const getMoodStyle = (_gratitude) => {
      const styleObj = {
        backgroundColor: (_gratitude.mood) ? _gratitude.mood.value : '#2FD9D9'
      }
      return styleObj
    }

    return {
      gratitude: getGratitudeData(),
      getMoodStyle,
      getReadableDate
    }
  }
})
</script>

<style scoped>

</style>
