<template>
  <section class="section navigationDrawer" :class="[menuOpen ? 'opened' : 'closed']">
    <div class="section__inner">
      <button class="btn--reset btn--hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- <button class="btn" @click="toggleMenu">menu</button> -->
      <router-link class="tempClass" to="/">Home</router-link>
      <router-link class="tempClass" to="/about">About</router-link>
      <router-link class="tempClass" to="/gratitude/new">New</router-link>
    </div>
  </section>
</template>

<script lang="ts">
// Core
import { defineComponent, ref } from 'vue'
import router from '@/router'

export default defineComponent({
  name: 'NavigationDrawer',
  setup () {
    const menuOpen = ref<boolean>(false)

    const openMenu = () => {
      menuOpen.value = true
    }

    const closeMenu = () => {
      menuOpen.value = false
    }

    const toggleMenu = () => {
      (menuOpen.value === true) ? closeMenu() : openMenu()
    }

    return {
      toggleMenu,
      openMenu,
      closeMenu,
      menuOpen
    }
  }
})
</script>

<style scoped lang="scss">

</style>
