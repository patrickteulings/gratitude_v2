
import { reactive, onMounted, toRefs } from 'vue'

interface OState {
  absolute: boolean | null;
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
}

export const useGyro = () => {
  const state: OState = reactive({
    absolute: null,
    alpha: null,
    beta: null,
    gamma: null
  })

  const handleOrientation = (event: DeviceOrientationEvent) => {
    state.absolute = event.absolute
    state.alpha = event.alpha
    state.beta = event.beta
    state.gamma = event.gamma

    console.log(state)
  }

  onMounted(() => {
    window.addEventListener('deviceorientation', handleOrientation)
  })

  return {
    ...toRefs(state)
  }
}
