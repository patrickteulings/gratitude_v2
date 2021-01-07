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
        <drop-down :listData="moods" @onupdate="handleMoodUpdate"></drop-down>
      </div>
    </section>
    <section class="addGratitude__actions">
      <div class="section__inner">
        <button class="btn" @click="submitNewGratitude()">Add Gratitude</button>
        <span v-if="isSubmitting === true">loading...</span>
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
import { IMood } from '@/types/Mood'

interface IState {
  moods: Array<IMood>;
  user: IUser;
  title: string;
  body: string;
  selectedMood: IMood | null;
  isSubmitting: boolean;
}

export default defineComponent({
  components: {
    ContentEditable,
    DropDown
  },

  setup () {
    const state: IState = reactive({
      moods: store.getters['moodStore/getMoods'],
      user: store.getters['userStore/getUser'],
      title: '',
      body: '',
      selectedMood: null,
      isSubmitting: false
    })

    // Handle emitted new Title text from ContentEditable
    const handleTitleUpdate = (content: string): void => {
      state.title = content
    }

    // Handle emitted new Body text from ContentEditable
    const handleBodyUpdate = (content: string): void => {
      state.body = content
    }

    const handleMoodUpdate = (mood: IMood) => {
      state.selectedMood = mood
    }

    // Let's save this to Firestore
    const submitNewGratitude = () => {
      state.isSubmitting = true

      const newGratitude: IGratitude = {
        title: state.title,
        body: state.body,
        location: store.getters['gratitudeStore/getLocation'],
        timeStamp: new Date(),
        dayStamp: useDate().getDayStamp(),
        weather: store.getters['gratitudeStore/getWeather'],
        mood: state.selectedMood,
        user: state.user
      }
      // Save to firebase
      store.dispatch('gratitudeStore/saveGratitude', newGratitude).then(() => {
        setTimeout(() => { state.isSubmitting = false }, 1900)
      })
    }

    // Well, get the formatted date
    const getDate = (): string => useDate().getDefaultFormat(new Date())

    onMounted(() => {
      for (const mood of state.moods) {
        if (mood.label && mood.label.toLowerCase() === 'neutral') {
          state.selectedMood = mood
        }
      }
      console.log(state.selectedMood)
    })

    return {
      ...toRefs(state),
      router,
      getDate,
      submitNewGratitude,
      handleTitleUpdate,
      handleBodyUpdate,
      handleMoodUpdate
    }
  }
})
</script>

<style lang="scss" scoped></style>
