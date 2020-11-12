<template>
  <div class="dropdown dropDownWrapper" :class="classModifier">
    <div class="dropdown__trigger" :class="{'is-open' : isOpen}" :style="getItemColor(selected)" @click="toggleDropdown">{{ getFormattedItemLabel(selected) }}</div>
    <div class="dropdown__list" :class="{'is-open' : isOpen}">
      <div class="dropdown__item" :class="[isSelectedItem(colorItem) ? 'hidden': '']" :style="getItemColor(colorItem)" @click="setSelectedItem(colorItem)" v-for="(colorItem) in listData" :key="colorItem.value">
        {{ getFormattedItemLabel(colorItem) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">

// Core
import { defineComponent, reactive, onMounted, onBeforeUnmount, toRefs } from 'vue'
import store from '@/store'


// Helpers
// import { EventBus } from '@/helpers/eventbus'

// Interfaces
import { IMood } from '@/types/Mood'


export default defineComponent({
  name: 'DropDown',

  props: {
    listData: Array,
    classModifier: String
  },

  setup (props, { emit }) {
    const state = reactive({
      selected: {},
      isOpen: false
    })

    const getItemColor = (colorSetting: IMood): string => {
      return `color: ${colorSetting.value}`
    }

    const setSelectedItem = (colorItem: IMood): void => {
      state.selected = colorItem
      // closeDropDown()
      emit('onupdate', colorItem)
    }

    const getFormattedItemLabel = (colorItem: IMood): string => {
      return (colorItem.label !== undefined) ? colorItem.label : ''
    }

    const isSelectedItem = (item: IMood) => {
      return state.selected === item
    }

    const openDropDown = (): void => {
      console.log('open', store.getters['moodStore/getMoods'])
      state.isOpen = true
    }

    const closeDropDown = (): void => {
      state.isOpen = false
    }

    const toggleDropdown = (): void => {
      (state.isOpen) ? closeDropDown() : openDropDown()
    }

    const resetDropdown = (): void => {
      state.selected = {}
    }

    const handleOutsideClick = (e: Event): void => {
      const target = e.target as HTMLElement

      e.stopPropagation()

      if (!target.closest('.dropDownWrapper')) closeDropDown()
    }

    const addEvents = (): void => {
      document.addEventListener('click', (e) => handleOutsideClick(e))
      document.addEventListener('touchstart', (e) => handleOutsideClick(e))
      // EventBus.$on('resetContentEditable', () => resetDropdown())
    }

    const removeEvents = (): void => {
      document.removeEventListener('click', (e) => handleOutsideClick(e))
      document.removeEventListener('touchstart', (e) => handleOutsideClick(e))
    }

    onMounted(() => {
      addEvents()
    })

    onBeforeUnmount(() => {
      removeEvents()
    })

    return {
      ...toRefs(state),
      getItemColor,
      getFormattedItemLabel,
      setSelectedItem,
      isSelectedItem,
      closeDropDown,
      openDropDown,
      toggleDropdown,
      handleOutsideClick,
      addEvents,
      removeEvents
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
