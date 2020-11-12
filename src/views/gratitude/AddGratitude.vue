<template>
  <div class="view addGratitude">
    <section class="addGratitude__date">
      <div class="section__inner">
        <div class="date">{{ getDate() }}</div>
      </div>
    </section>
    <section class="addGratitude__title">
      <div class="section__inner">
        <ContentEditable className="contenteditableHeader" @update-content="handleTitleUpdate" />
      </div>
    </section>
    <section class="addGratitude__body">
      <div class="section__inner">
        <ContentEditable className="contenteditableBody paragraph" @update-content="handleBodyUpdate" />
      </div>
    </section>
    <section class="addGratitude__dropdown">
      <div class="section__inner">
        <drop-down :listData="mood"></drop-down>
      </div>
    </section>
    <section class="addGratitude__actions">
      <div class="section__inner">
        <button @click="submitNewGratitude()">submit</button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
// Core
import { reactive, toRefs, defineComponent, onMounted } from 'vue'
import router from '@/router'
import store from '@/store'

// Composables
import useDate from '@/use/useDate'

// Components
import ContentEditable from '@/components/contenteditable/Contenteditable.vue'
import DropDown from '@/components/ui/DropDown.vue'

// Interfaces
import { IUser } from '@/types/UserType'
import { IGratitude } from '@/types/Gratitude'

export default defineComponent({
  components: {
    ContentEditable,
    DropDown
  },

  setup () {
    const state = reactive({
      mood: store.getters['moodStore/getMoods'],
      user: store.getters['userStore/getUser'],
      title: '',
      body: ''
    })
    console.log('moods', store.getters['moodStore/getMoods'])
    // Handle emitted new Title text from ContentEditable
    const handleTitleUpdate = (content: string): void => {
      state.title = content
    }

    // Handle emitted new Body text from ContentEditable
    const handleBodyUpdate = (content: string): void => {
      state.body = content
    }

    // Let's save this to Firestore
    const submitNewGratitude = () => {
      const newGratitude: IGratitude = {
        title: state.title,
        body: state.body,
        location: store.getters['gratitudeStore/getLocation'],
        timeStamp: new Date(),
        dayStamp: useDate().getDayStamp(),
        weather: {},
        user: state.user
      }
      // Save to firebase
      store.dispatch('gratitudeStore/saveGratitude', newGratitude)
    }

    // Well, get the formatted date
    const getDate = (): string => useDate().getDefaultFormat(new Date())

    onMounted(() => {
      if (!store.getters['gratitudeStore/loadGratitudes']) {
        store.dispatch('gratitudeStore/loadGratitudes', state.user)
      }
    })

    return {
      ...toRefs(state),
      router,
      getDate,
      submitNewGratitude,
      handleTitleUpdate,
      handleBodyUpdate
    }
  }
})
</script>

<style lang="scss" scoped></style>
