<template>
  <div>
    <div v-if="user" class="topbar">
      <button class="btn--reset btn--hamburger">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="avatar--small">
        <img :src="user.photoURL" :alt="user.displayName">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Core
import { defineComponent, computed } from 'vue'
import store from '@/store'

// Interfaces
import { IUser } from '@/types/UserType'

export default defineComponent({
  setup () {
    const user = computed(() => store.getters['userStore/getUser'])

    return {
      user
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
