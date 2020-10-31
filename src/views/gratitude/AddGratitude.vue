<template>
  <div class="view addGratitude">
    <section class="addGratitude__date">
      <div class="section__inner">
        <div class="date">{{ getDate() }}</div>
      </div>
    </section>
    <section class="addGratitude__title">
      <div class="section__inner">
        <ContentEditable className="contenteditableHeader" @update-content="handleTitleUpdate"/>
      </div>
    </section>
    <section class="addGratitude__body">
      <div class="section__inner">
        <ContentEditable className="contenteditableBody paragraph" @update-content="handleBodyUpdate"/>
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

export default defineComponent({
  components: {
    ContentEditable
  },
  setup () {
    const state = reactive({
      mood: [{ label: 'Happy', colorValue: '#D996C7' }, { label: 'Strong', colorValue: '#C6C150' }, { label: 'Hard times but learning', colorValue: '#942C3F' }, { label: 'Pretty ok', colorValue: '#68B2D0' }], // Move to user-store!!
      user: store.getters['userStore/getUser'],
      title: '',
      body: ''
    })

    // Handle emitted new Title text from ContentEditable
    const handleTitleUpdate = (content: string): void => {
      state.title = content
    }

    // Handle emitted new Body text from ContentEditable
    const handleBodyUpdate = (content: string): void => {
      state.body = content
    }

    const submitNewGratitude = () => {
      console.log('adasda')
    }

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
