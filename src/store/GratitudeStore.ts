import { reactive } from 'vue'
import { db } from '@/config/firebaseConfigTypeScript'
import { Gratitude } from '@/types/Gratitude'

const ADD_MULTIPLE_GRATITUDES = 'ADD_MULTIPLE_GRATITUDES'
const ADD_GRATITUDE = 'ADD_GRATITUDE'
const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION'

export const GratitudeStore = {
  namespaced: true,
  state: reactive({
    user: null,
    gratitudes: [],
    location: null
  }),


  mutations: {
    ADD_MULTIPLE_GRATITUDES: (state: any, payload: Array<Gratitude>) => {
      console.log(state.gratitudes)
    },
    ADD_GRATITUDE: (state: any, payload: Gratitude) => {
      state.gratitudes.push(payload)
    },
    SET_CURRENT_LOCATION: (state: any, payload: Gratitude) => {
      console.log('SET_CURRENT_LOCATION')
      // state.gratitudes.push(payload)
    }
  },

  actions: {
    // loadGratitudes: (context: any, user: any): Promise<firebase.firestore.QuerySnapshot> => {
    loadGratitudes: (context: any, user: any): void => {
      console.log('user', user)
      const { commit } = context
      const ref = db.collection('users').doc(user.uid).collection('gratitudes').get()

      ref.then((result: firebase.firestore.QuerySnapshot) => {
        result.forEach((item: firebase.firestore.DocumentData) => {
          commit(ADD_GRATITUDE,
            {
              data: item.data(),
              id: item.id
            })
          // context.dispatch('addSingleGratitude', {
          //   data: item.data(),
          //   id: item.id
          // })
        })
      })
    },
    loadGratitudesPromise: (context: any, user: any) => {
      const { commit } = context
      const ref = db.collection('users').doc(user.uid).collection('gratitudes')
      return ref.get()
    },

    addGratitudes: (context, gratitudes: Array<Gratitude>): void => {
      const { state, commit } = context
      commit(ADD_MULTIPLE_GRATITUDES, gratitudes)
    },

    addSingleGratitude: (context, gratitude: Gratitude): void => {
      const { state, commit } = context
      commit(ADD_GRATITUDE, gratitude)
    },

    setLocation: (context, location): void => {
      const { state, commit } = context
      console.log('STORE', location)
      // commit(SET_CURRENT_LOCATION)
    }
  },

  getters: {
    getGratitudes: (state) => {
      return state.gratitudes
    }
  }
}
