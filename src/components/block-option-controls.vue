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
import {GlitcherOptions} from "../scripts/imageGlitchers/glitcherInterface";
import {imageBlockDefaultOptions} from "../scripts/defaults/blockOptions";

export default defineComponent({
  name: 'block-option-controls',
  emits: ['update:options'],
  props: {
    options: {
      type: Object as () => GlitcherOptions
    }
  },
  setup(props, {emit}) {
    let options = ref<GlitcherOptions>(Object.assign({}, props.options))

    watch(() => props.options, (newValue: GlitcherOptions|undefined) => {
      options.value = Object.assign({}, imageBlockDefaultOptions, newValue)
    })

    watch(() => options, () => emit('update:options', options.value), {deep: true})

    return {
      options
    };
  }
})
</script>
