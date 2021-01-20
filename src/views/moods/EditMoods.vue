<template>
  <div class="view moods-edit">
    <section class="section moods-edit">
      <div class="section__inner">
        <div>
          <h1>
            Editing some moods baby

            <!-- {{ moods }} -->
          </h1>
          <div v-if="moods.length">
            <div v-for="mood in moods" :key="mood.id">
              <div class=""></div>
              {{ mood }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// Core
import { reactive, toRefs, defineComponent, onMounted } from 'vue'
import store from '@/store'


export default defineComponent({
  setup () {
    const state = reactive({
      count: 0,
      moods: store.getters['moodStore/getMoods']
    })

    onMounted(() => {
      console.log('MOODS', state.moods)
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
