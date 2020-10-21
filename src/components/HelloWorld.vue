<template>
  <div class="hello">
    {{orientation.alpha}} bla
    <DateBar @dateSelected="onDateSelection" @resetDateSelection="onResetDateSelection"/>
    <MonthsAgo :currentDate="monthTemp" @onclicked="goToDetailPage"/>
    <GratitudeCard style="position: relative; z-index: 2;" v-for="gratitude in filteredGratitudes" :key="gratitude.id" :gratitudeData="gratitude" @click="goToDetailPage(gratitude)"/>
    <div v-if="filteredGratitudes.length">yes, gevonden
    </div><div v-else>Not yet</div>
  </div>
</template>

<script lang="ts">
// Core
import { defineComponent, reactive, computed, onMounted, toRefs, watch } from 'vue'
import store from '@/store'
import router from '@/router'

// Components
import DateBar from '@/components/ui/DateBar.vue'
import GratitudeCard from '@/components/cards/GratitudeCard.vue'
import MonthsAgo from '@/components/toast/MonthsAgo.vue'

// Composables
import useDate from '@/use/useDate'
import useGratitudeFilters from '@/use/gratitude/useGratitudeFilters'
import { GratitudeWrapper, Gratitude } from '@/types/Gratitude'
import { useGyro } from '@/use/gyro'

// Interfaces


// Go Time
export default defineComponent({
  name: 'HelloWorld',

  props: {
    msg: String
  },

  components: {
    DateBar,
    GratitudeCard,
    MonthsAgo
  },

  setup () {
    const state = reactive({
      filteredGratitudes: [] as Array<GratitudeWrapper>,
      monthTemp: new Date(),
      orientation: useGyro(),
      scrollTop: 0
    })

    const test = reactive(() => {
      console.log('iets', useGyro())
    })

    const gratitudes = computed(() => {
      return state.filteredGratitudes
    })

    const gratitudeList = () =>
      state.filteredGratitudes.sort(
        (a, b) => b.data.timeStamp.toDate() - a.data.timeStamp.toDate()
      )


    const getReadableDate = (_date: Date): string => useDate().formatDateToWordsWithLimit(_date, 10)

    const onDateSelection = (_date: Date): void => {
      state.filteredGratitudes = useGratitudeFilters().getGratitudesPerDay(_date)
      // Temp, delete this
      state.monthTemp = _date
    }

    const onResetDateSelection = (date: Date): void => {
      state.filteredGratitudes = store.getters['gratitudeStore/getGratitudes']
      state.filteredGratitudes = gratitudeList()
    }


    // @to[do] Add Request Animation Fram
    const handleChange = (val) => {
      state.scrollTop += (val / 10)
      window.scrollTo(0, state.scrollTop)
    }

    watch(state.orientation, (first, second) => {
      const { alpha, beta, gamma } = second
      handleChange(beta)
    })


    onMounted(() => {
      const user = computed(() => store.getters['userStore/getUser'])

      store.dispatch('gratitudeStore/loadGratitudesPromise', user.value).then((result: firebase.firestore.QuerySnapshot) => {
        result.forEach((item: firebase.firestore.DocumentData) => {
          const what: GratitudeWrapper = { data: item.data(), id: item.id }

          state.filteredGratitudes.push(what)
          store.dispatch('gratitudeStore/addSingleGratitude', what)
        })
        state.filteredGratitudes = gratitudeList()
      })
    })

    const goToDetailPage = (gratitude: GratitudeWrapper): void => {
      router.push({ name: 'gratitude/detail', params: { id: gratitude.id } })
    }

    return {
      test,
      ...toRefs(state),
      // filtered,
      gratitudes,
      gratitudeList,
      getReadableDate,
      goToDetailPage,
      onDateSelection,
      onResetDateSelection
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
