<template>
  <teleport to='#loader'>
    <div
      class="d-flex justify-content-center align-items-center h-100 loading-container"
      :style="{backgroundColor: background || ''}"
    >
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p v-if="text" class="text-primary small">{{ text }}</p>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'

export default defineComponent({
  props: {
    text: String,
    background: String
  },
  setup() {
    const node = document.createElement('div')
    node.id = 'loader'
    document.body.appendChild(node)
    onUnmounted(() => {
      document.body.removeChild(node)
    })
  }
})
</script>

<style scoped>
.loading-container {
  background: rgba(255, 255, 255, .5);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.loading-content {
  text-align: center;
}
</style>
