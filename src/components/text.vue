<template>
  <div :class="templateClass">
    <span aria-hidden="true" :class="[templateClass + '__label', templateClass + '__label--before']">{{ value }}</span>
    <span :class="templateClass">{{ value }}</span>
    <span aria-hidden="true" :class="[templateClass + '__label', templateClass + '__label--after']">{{ value }}</span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "glitch-text",
  props: {
    value: {
      type: String,
      default: ''
    },
    class: {
      type: String,
      default: 'glitch_text'
    }
  },
  setup(props) {
    return {
      templateClass: props.class
    }
  }
})
</script>

<style lang="scss">
  @import "../style/text";
</style>
