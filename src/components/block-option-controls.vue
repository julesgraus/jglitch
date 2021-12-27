<template>
  <label for="intensity">
    <input type="range"
           name="intensity"
           min="0.01"
           max="1"
           step="0.01"
           v-model.number="options.intensity"
    > Intensity</label><br>

  <label for="minDuration">
    <input type="range"
           name="minDuration"
           min="100"
           max="4000"
           step="100"
           v-model.number="options.minDuration"
    > minDuration</label><br>

  <label for="maxDuration">
    <input type="range"
           name="maxDuration"
           min="100"
           max="4000"
           step="100"
           v-model.number="options.maxDuration"
    > maxDuration</label><br>

  <label for="blockSizeX">
    <input type="range"
           name="blockSizeX"
           min="1"
           max="32"
           step="1"
           v-model.number="options.blockSizeX"
    > blockSizeX</label><br>

  <label for="blockSizeY">
    <input type="range"
           name="blockSizeY"
           min="1"
           max="32"
           step="1"
           v-model.number="options.blockSizeY"
    > blockSizeY</label><br>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from "vue";
import {BlockOptions} from "../scripts/imageGlitchers/blocks";

export default defineComponent({
  name: 'block-option-controls',
  emits: ['options'],
  setup(props, {emit}) {
    let options = ref<BlockOptions>({
      blockSizeX: 32,
      blockSizeY: 32,
      minDuration: 100,
      maxDuration: 200,
      intensity: 1,
    })

    emit('options', options.value)
    watch(options.value, () => emit('options', options.value))

    return {
      options
    };
  }
})
</script>
