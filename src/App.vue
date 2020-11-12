<template>
  <div id="app">
    <top-bar />
    <div v-if="loading">
      <SplashScreen />
    </div>
    <div v-if="user && !loading">
      <Suspense>
        <template #default>
          <route-wrapper />
        </template>
        <template #fallback>
          <h1>
            Add a loading template here
          </h1>
        </template>
      </Suspense>
    </div>
    <div v-if="response.results">
      {{ response.results[9].address_components[0].long_name }} <br>
      {{ locationLoading }} {{ msg }} {{ latitude }} {{ longitude }}
    </div>
    <login-form v-else-if="!user && !loading" />
    <div v-else>No satisfying user found</div>
    <div v-if="error">error</div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/gratitude/new">add gratitude</router-link>
    </div>
  </div>
</template>

<script lang="ts">
// Core
import { defineComponent, computed, watch } from 'vue'
import store from '@/store/index'

// Components
import TopBar from '@/components/navigation/TopBar.vue'
import LoginForm from '@/components/user/LoginForm.vue'
import SplashScreen from '@/components/splash/SplashScreen.vue'
import RouteWrapper from '@/components/RouteWrapper.vue'

// Composables
import { useLogin } from '@/use/auth/useLogin'
import useAuth from '@/use/auth/useAuth'
import useLocation from '@/use/useLocation'
import { IResponse } from '@/types/Gratitude'
import { ILocation } from '@/types/Location'
// Setup
export default defineComponent({
  name: 'App',

  components: {
    TopBar,
    LoginForm,
    SplashScreen,
    RouteWrapper
  },

  setup () {
    const { user, loading, error } = useAuth()
    const loginState = useLogin()
    const { latitude, longitude, msg, response, locationLoading = false } = useLocation()

    // Watch Gyro updates
    watch([response, latitude], ([first, firstLat], [second, sencondLat]) => {
      if (response !== null) {
        const resp = response.value as IResponse
        let cityName = ''
        if (resp.results) {
          cityName = resp.results[9].address_components[0].long_name
        }
        const location = { coordinates: { latitude: latitude.value, longitude: longitude.value }, city: cityName }
        store.dispatch('gratitudeStore/setLocation', location)
      }
      if (latitude !== null) {
        console.log('latitude!!!!', latitude.value)
      }
    })

    return {
      user,
      loading,
      latitude,
      longitude,
      response,
      msg,
      locationLoading,
      error: computed(() => (loginState.error || error).value),
      logout: loginState.logout
    }
  }
})
</script>

<style lang="scss" src="@/styles/style.scss">
.app-wrapper {
  overflow-x: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
