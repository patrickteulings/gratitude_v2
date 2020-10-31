<template>
  <div>
    <div @keyup="handleKeyUp" :class="[equalToPlaceHolder ? 'placeholder' : '', getClassname()]" contenteditable="true" v-html="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref, toRefs, PropType, SetupContext } from 'vue'
import { UseBeastie } from '@/use/useBeastie'

const ContentEditable = defineComponent({
  props: {
    className: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup (props, context: SetupContext) {
    const beasty = ref<string>('')
    const content = ref<string>('')
    const equalToPlaceHolder = ref<boolean>(true)

    const getClassname = () => {
      return props.className
    }

    // Handles placeholder text and classnames
    // Beware!! Only do this on KeyUp because of scrolling glitches on keydown
    const handleKeyUp = (e: { target: HTMLInputElement }): void => {
      const el: HTMLInputElement = e.target

      // Reset to placeholder if no text is entered
      if (!el.innerText.length) el.innerText = beasty.value

      // handles classname if there is / is not any text / placeholder
      equalToPlaceHolder.value = (el.innerText === beasty.value)

      context.emit('update-content', el.innerHTML)
    }

    onMounted(() => {
      beasty.value = UseBeastie()
      content.value = beasty.value
    })

    return {
      beasty,
      handleKeyUp,
      content,
      equalToPlaceHolder,
      getClassname
    }
  }
})

export default ContentEditable

</script>


<style scoped lang="scss">

.placeholder {
  opacity: 0.5;
}
</style>
