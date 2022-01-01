<template>
  <label for="block_count">
    <input type="range"
           name="intensity"
           min="1"
           max="64"
           step="1"
           v-model.number="options.blockCount"
    > Block count</label><br>

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

  <label for="minDutyCyclePercentage">
    <input type="range"
           name="minDutyCyclePercentage"
           min="1"
           max="100"
           step="1"
           v-model.number="options.minDutyCyclePercentage"
    > minDutyCyclePercentage</label><br>

  <label for="maxDutyCyclePercentage">
    <input type="range"
           name="maxDutyCyclePercentage"
           min="1"
           max="100"
           step="1"
           v-model.number="options.maxDutyCyclePercentage"
    > maxDutyCyclePercentage</label><br>

  <label for="blockSizeY">
    <input type="range"
           name="blockSizeY"
           min="1"
           max="32"
           step="1"
           v-model.number="options.blockSizeY"
    > blockSizeY</label><br>

  <label for="randomizeBlockSize">
    <input type="checkbox"
           name="randomizeBlockSize"
           v-model="options.randomizeBlockSize"
    > randomizeBlockSize</label><br>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from "vue";
import {GlitcherOptions} from "../scripts/interfaces/glitcherInterface";
import {imageBlockDefaultOptions} from "../scripts/defaults/blockOptions";

export default defineComponent({
  name: 'offsetLines-option-controls',
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
