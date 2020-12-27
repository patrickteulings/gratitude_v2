<template>
  <section class="section navigationDrawer" :class="[menuOpen ? 'opened' : 'closed']">
    <div class="section__inner">
      <button class="btn--reset btn--hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- <button class="btn" @click="toggleMenu">menu</button> -->
      <a class="tempClass" @click.prevent="navigateTo('/')" href="/">Home / thuis</a>
      <a class="tempClass" @click.prevent="navigateTo('/about')" href="/about">About</a>
      <a class="tempClass" @click.prevent="navigateTo('/gratitude/new')" href="/gratitude/new">New</a>
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

    const openMenu = (): void => {
      menuOpen.value = true
    }

    const closeMenu = (): void => {
      menuOpen.value = false
    }

    const toggleMenu = (): void => {
      (menuOpen.value === true) ? closeMenu() : openMenu()
    }

    const navigateTo = (_path: string): void => {
      router.push({ path: _path })
      closeMenu()
    }

    return {
      toggleMenu,
      openMenu,
      closeMenu,
      menuOpen,
      navigateTo
    }
  }
})
</script>

<style scoped lang="scss">

</style>
