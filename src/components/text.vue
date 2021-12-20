<template>
  <div :class="[blockName]" :style="controlledStyle" :key="forceUpdateKey">
    <span aria-hidden="true"
      v-for="positionModifierPart in glitchElementModifiers"
      :key="positionModifierPart"
      :class="[
        bemClass(blockName, elementName),
        !enabled || bemClass(blockName, elementName, glitchModifierName),
        bemClass(blockName, elementName, positionModifierPart),
      ]"
    >{{ value }}</span>
    <span :class="[
        bemClass(blockName, elementName),
        !enabled || bemClass(blockName, elementName, glitchModifierName),
    ]">{{ value }}</span>
  </div>
</template>

<script lang="ts">
import { bemClass } from "../scripts/helpers";
import {computed, defineComponent, ref, watch} from "vue";

export default defineComponent({
  name: "glitch-text",
  props: {
    value: {
      type: String,
      required: true
    },
    enabled: {
      type: Boolean,
      default: true
    },
    intensity: {
      type: Number,
      default: null,
    },
    hoverIntensity: {
      type: Number,
      default: null
    },
    blockName: {
      type: String,
      default: 'jgt'
    },
    elementName: {
      type: String,
      default: 'word'
    },
    glitchModifierName: {
      type: String,
      default: 'glitch'
    },
    glitchElementModifiers: {
      type: Array,
      default: () => {
        return ['bottom', 'top'];
      }
    }
  },
  setup(props) {
    /**
     * Inline style, controlled with javascript
     */
    const controlledStyle = computed(() => {
      let style: {[key: string]: number|string} = {}
      if(props.intensity) style['--intensity'] = props.intensity + 'em';
      if(props.hoverIntensity) style['--hover-intensity'] = props.hoverIntensity + 'em';
      return style;
    })

    //Needed to force safari to re-render the component, and re-init the @keyframes animation.
    let forceUpdateKey = ref(0);
    watch(() => [props.intensity, props.hoverIntensity], () => forceUpdateKey.value++)

    return {
      forceUpdateKey,
      controlledStyle,
      bemClass
    }
  }
})
</script>
