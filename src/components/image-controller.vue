<template>
  <section class="glitch_text_controller">
    <h2>Glitch image controller</h2>
    <br>

    <label for="enabled">
      <input type="checkbox"
             name="enabled"
             v-model="enabled"
      > Enabled</label><br>

    <label for="src">
      <input type="text"
             name="src"
             v-model="src"
      > source url</label><br>

    <label for="blockname">
      <input type="text"
             name="blockName"
             v-model="blockName"
      > block name</label><br>

    <label for="elementName">
      <input type="text"
             name="elementName"
             v-model="elementName"
      > element name</label><br>

    <label for="hiddenModifierName">
      <input type="text"
             name="hiddenModifierName"
             v-model="hiddenModifierName"
      > hidden modifier name</label><br>

    <label for="mode">
      <select name="select" id="select" v-model="mode">
        <option v-for="option in Object.keys(modesAndOptions)" :value="option">{{ option }}</option>
      </select> mode
    </label><br>

    <block-option-controls v-if="mode === 'blocks'" :options="options" @update:options="updateOptions"/>

    <glitch-image
        v-bind="$attrs"
        :src="src"
        :mode="mode"
        :enabled="enabled"
        :block-name="blockName"
        :element-name="elementName"
        :hidden-modifier-name="hiddenModifierName"
        :options="options"
    />

    <h3>Code</h3>
    <pre>
      {{ code }}
    </pre>
  </section>
</template>

<script lang="ts">
import glitchImage from "./image.vue";
import blockOptionControls from "./block-option-controls.vue";
import {computed, defineComponent, ref} from "vue";
import { imageBlockDefaultOptions } from "../scripts/defaults/blockOptions";
import {GlitcherOptions} from "../scripts/imageGlitchers/glitcherInterface";

export default defineComponent({
  inheritAttrs: false,
  name: "glitch-image-controller",
  components: {
    glitchImage,
    blockOptionControls
  },
  setup() {
    const defaultBlockName = 'jgi-image';
    const defaultElementName = 'picture';
    const defaultHiddenModifierName = 'hidden'
    const defaultEnabled = true;
    const defaultMode = 'blocks';
    const modesAndOptions = {
      blocks: imageBlockDefaultOptions
    };

    const src = ref('/images/urban.png')
    const enabled = ref(defaultEnabled);
    const intensity = ref(0);
    const blockName = ref(defaultBlockName);
    const elementName = ref(defaultElementName);
    const hiddenModifierName = ref(defaultHiddenModifierName);
    const mode = ref(defaultMode);
    const options = ref(Object.assign({}, imageBlockDefaultOptions));
    const key = ref(0);

    const updateOptions = (receivedOptions: {[key: string]: string|number}): void => {
      Object.keys(options.value).forEach(optionsKey => delete options.value[optionsKey]);
      Object.keys(receivedOptions).forEach(optionsKey => options.value[optionsKey] = receivedOptions[optionsKey]);
    }

    const stringyfyOptionsForDisplay = (data: GlitcherOptions) => {
      return JSON.stringify(options.value)
          .replaceAll(',', ',\n    ')
          .replace('{', '{\n    ')
          .replace('}', '\n  }')
    }

    const code = computed(() => {
       return `
<glitch-image
  src="${src.value}" ${enabled.value !== defaultEnabled ? `
  :enabled="${enabled.value}"` : ''} ${blockName.value !== defaultBlockName ? `
  block-name="${blockName.value}"` : ''} ${elementName.value !== defaultElementName ? `
  element-name="${elementName.value}"` : ''} ${hiddenModifierName.value !== defaultHiddenModifierName ? `
  hidden-modifier-name="${hiddenModifierName.value}"` : ''} ${mode.value !== defaultMode ? `
  mode="${mode.value}"`: ''} ${JSON.stringify(options.value) !== JSON.stringify(modesAndOptions[mode.value]) ? `
  :options='${stringyfyOptionsForDisplay(options)}'` : ''}
/>`
    })

    return {
      enabled,
      intensity,
      blockName,
      elementName,
      hiddenModifierName,
      code,
      src,
      modesAndOptions,
      mode,
      options,
      updateOptions,
      key,
    }
  }
})
</script>
