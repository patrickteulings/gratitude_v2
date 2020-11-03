import { toRefs, reactive } from 'vue'
import { Response } from '@/types/Gratitude'

interface State {
  response: Response;
  fetchError: boolean | null;
  fetching: boolean;
}


export default function () {
  // our reactive properties...
  const state: State = reactive({
    response: { results: null, status: null },
    fetchError: null,
    fetching: true
  })

  const getStreetAddressFrom = async (url: string, options: object) => {
    try {
      const response = await fetch(url, options)
      const json = await response.json()
      state.response = json
      console.log('state.response')
      console.log(state.response)
    } catch (error) {
      state.fetchError = error
    } finally {
      state.fetching = false
    }
  }

  // return all of the properties from the function
  return {
    ...toRefs(state),
    getStreetAddressFrom
  }
}
