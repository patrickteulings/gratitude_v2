<template>
  <div class="view detail">
    <section class="detail">
      <div class="section__inner">
        <div class="detail__meta" v-if="getGratitude" :style="[getMood(getGratitude), parallax()]" style="color: #fff;">
          <span class="date">{{ getDate(getGratitude) }}</span><span class="weather" v-if="getWeather(getGratitude)">{{ getWeather(getGratitude).temp }}&deg;C <i :class="getWeather(getGratitude).icon"></i></span>
        </div>
      </div>
    </section>
    <section class="section detail__title">
      <div class="section__inner">
        <h1 v-if="getGratitude" :style="getMood(getGratitude)">
          {{ getGratitude.title }}
        </h1>
      </div>
    </section>
    <section class="section detail__body">
      <div class="section__inner">
        <p v-if="getGratitude" v-html="getGratitude.body"></p>
        <p v-else></p>
    </div>
    </section>
  </div>
</template>

<script lang="ts">
// Core
import { reactive, toRefs, defineComponent, computed, onMounted, watch } from 'vue'
import router from '@/router'
import store from '@/store'
import { useScroll } from '@/use/useScroll'

// Composables
import useDate from '@/use/useDate'

// Interface
import { IGratitude } from '@/types/Gratitude'

export default defineComponent({
  components: {

  },
  setup () {
    const state = reactive({
      data: 'gewoon een test',
      count: 0,
      selectedGratitude: null,
      user: store.getters['userStore/getUser'],
      value: 'een value',
      scrollY: 0,
      scroll: useScroll()
    })

    const getGratitude = computed(() => {
      const filtered = store.getters['gratitudeStore/getGratitudes'].find(item => item.id === router.currentRoute.value.params.id)
      // return filtered || { data: { title: `It's called...`, body: 'gratitude' } }
      return filtered.data
    })

    const getDate = (gratitude: IGratitude) => useDate().getDefaultFormat(gratitude.timeStamp.toDate())

    const getMood = (gratitude: IGratitude) => {
      return {
        color: (gratitude.mood) ? gratitude.mood.value : '#FFFFFF'
      }
      // return (gratitude.data.mood.value) ? gratitude.data.mood.value : '#FFFFFF'
    }

    const getWeather = (gratitude: IGratitude) => {
      return (gratitude.weather.temp && gratitude.weather.weatherID) ? { temp: Math.round(gratitude.weather.temp), icon: `wi wi-owm-${gratitude.weather.weatherID}` } : null
    }

    const parallax = () => {
      return {
        transform: `translateY(${(state.scrollY < 80) ? Math.round(state.scrollY / 2) : 40}px)`
      }
    }

    const handleScroll = (scrollObject) => {
      state.scrollY = scrollObject
    }

    onMounted(() => {
      if (!store.getters['gratitudeStore/loadGratitudes']) {
        store.dispatch('gratitudeStore/loadGratitudes', state.user)
      }
    })

    watch(state.scroll, (oldScrollPosition, newScrollPosition) => {
      const { scrollY } = newScrollPosition

      handleScroll(scrollY)
    })

    return {
      ...toRefs(state),
      router,
      getGratitude,
      getDate,
      getMood,
      getWeather,
      parallax,
      temperature: computed(() => store.getters['gratitudeStore/getWeather'])
    }
  }
})
</script>

<style lang="scss" scoped></style>
