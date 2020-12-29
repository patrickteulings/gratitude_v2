import { toRefs, reactive } from 'vue'
import useGeoLocationApi from '@/use/useGeolocationApi'
import { GOOGLE_API_KEY } from '@/config/google'

interface IState {
  msg: string | null;
  locationLoading: boolean;
  error: boolean | null;
  latitude: number | null;
  longitude: number | null;
}


export default function () {
  // our reactive properties...
  const state: IState = reactive({
    msg: null,
    locationLoading: true,
    status: '',
    error: false,
    latitude: null,
    longitude: null
  })

  const { response, fetching, fetchError, getStreetAddressFrom } = useGeoLocationApi()

  const success = (position: GeolocationCoordinates) => {
    state.locationLoading = false
    state.msg = 'Location success'
    state.latitude = position.latitude
    state.longitude = position.longitude

    getStreetAddressFrom(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${state.latitude},${state.longitude}&key=${GOOGLE_API_KEY}`, {})
  }


  const error = (positionError: GeolocationPositionError) => {
    if (positionError) {
      console.log(positionError.code)
      state.locationLoading = false
      state.error = true
    }
    // Code
    // 1: permission denied
    // 2: position unavailable
    // 3: timeout
  }

  // make the firebase call to listen for change in auth state,
  // we have set initial loading status to true so nothing happens on UI
  // side until loading is set to false
  if (!navigator.geolocation) {
    state.msg = 'Geolocation is not supported by your browser'
  } else {
    state.msg = 'Locating…'
    navigator.geolocation.getCurrentPosition(success, error)
  }

  // return all of the properties from the function
  return {
    ...toRefs(state),
    response
  }
}
