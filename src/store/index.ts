import { createStore } from 'vuex'
import { SetupContext } from 'vue'
import { UserStore } from '@/store/UserStore.ts'
import { GratitudeStore } from '@/store/GratitudeStore.ts'

export default createStore({
  state: {
    user: null
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userStore: UserStore,
    gratitudeStore: GratitudeStore
  }
})
