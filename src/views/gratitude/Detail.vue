<template>
  <div class="view detail">
    <section class="detail detail__title">
      <div class="section__inner">
        <h1 v-if="getGratitude">
          {{ getGratitude.data.title }}
        </h1>
        <div class="detail__date" v-if="getGratitude" :style="{'color': getMood(getGratitude)}">
          {{ getDate(getGratitude) }}
        </div>
      </div>
    </section>
    <section class="section detail__body">
      <div class="section__inner">
        <p v-if="getGratitude">
          {{ getGratitude.data.body }}
        </p>
        <p v-else>
          Gratitude
        </p>
    </div>
    </section>
  </div>
</template>

<script lang="ts">
// Core
import { reactive, toRefs, defineComponent, computed, onMounted } from 'vue'
import router from '@/router'
import store from '@/store'

// Composables
import useDate from '@/use/useDate'

// Interfaces
import { GratitudeWrapper } from '@/types/Gratitude'

export default defineComponent({
  setup () {
    const state = reactive({
      count: 0,
      selectedGratitude: null,
      user: store.getters['userStore/getUser']
    })

    const getGratitude = computed(() => {
      const filtered = store.getters['gratitudeStore/getGratitudes'].find(item => item.id === router.currentRoute.value.params.id)
      // return filtered || { data: { title: `It's called...`, body: 'gratitude' } }
      return filtered
    })

    const getDate = (gratitude) => useDate().getDefaultFormat(gratitude.data.timeStamp.toDate())

    const getMood = (gratitude) => gratitude.data.color


    onMounted(() => {
      if (!store.getters['gratitudeStore/loadGratitudes']) {
        store.dispatch('gratitudeStore/loadGratitudes', state.user)
      }
    })

    return {
      ...toRefs(state),
      router,
      getGratitude,
      getDate,
      getMood
    }
  }
})
</script>

<style lang="scss" scoped></style>
