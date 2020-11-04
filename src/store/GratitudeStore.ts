import { reactive } from 'vue'
import { db } from '@/config/firebaseConfigTypeScript'

// Types.Interfaces
import { IGratitude } from '@/types/Gratitude'
import { ILocation } from '@/types/Location'

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
    ADD_MULTIPLE_GRATITUDES: (state: any, payload: Array<IGratitude>) => {
      console.log(state.gratitudes)
    },
    ADD_GRATITUDE: (state: any, payload: IGratitude) => {
      state.gratitudes.push(payload)
    },
    SET_CURRENT_LOCATION: (state: any, payload: ILocation) => {
      console.log('SET_CURRENT_LOCATION')
      state.location = payload
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

    addGratitudes: (context, gratitudes: Array<IGratitude>): void => {
      const { state, commit } = context
      commit(ADD_MULTIPLE_GRATITUDES, gratitudes)
    },

    addSingleGratitude: (context, gratitude: IGratitude): void => {
      const { state, commit } = context
      commit(ADD_GRATITUDE, gratitude)
    },

    setLocation: (context, location: ILocation): void => {
      const { state, commit } = context
      console.log('STORE', location)
      commit(SET_CURRENT_LOCATION, location)
    }
  },

  getters: {
    getGratitudes: (state) => {
      return state.gratitudes
    }
  }
}
