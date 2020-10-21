<template>
  <span v-html="test">
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { IconProps } from '@/types/Icon'

export default defineComponent({
  props: {
    iconProperties: {
      type: Object as PropType<IconProps>,
      required: true
    }
  },
  setup (props) {
    console.log(props.iconProperties)
    // const test = 'test'
    const paths = {
      'check': '20 6 9 17 4 12',
      'unCheck': '20 6 9 17 4 12'
    }

    console.log(paths[props.iconProperties.name])

    const test = `<svg xmlns="http://www.w3.org/2000/svg" width="${props.iconProperties.size}" height="${props.iconProperties.size}" viewBox="0 0 24 24" fill="none" stroke=${props.iconProperties.strokeColor} stroke-width="${props.iconProperties.strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="${paths[props.iconProperties.name]}"></polyline></svg>`

    return {
      test
    }
  }
})
</script>

<style scoped>

</style>
