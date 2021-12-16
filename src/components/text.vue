<template>
  <div>
    <span aria-hidden="true" :class="props.class + '__before'">{{ value }}</span>
    <span :class="props.class">{{ value }}</span>
    <span aria-hidden="true" :class="props.class + '__after'">{{ value }}</span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "glitch-image",
  props: {
    value: {
      type: String,
      default: ''
    },
    class: {
      type: String,
      default: 'glitch_image'
    }
  },
  setup(props) {

  }
})
</script>
