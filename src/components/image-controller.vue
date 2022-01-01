<template>
  <section class="glitch_text_controller">
    <h2>Glitch image controller</h2>
    <br>

    <label for="mode">
      <select name="select" id="select" v-model="mode">
        <option v-for="option in Object.keys(modesAndOptions)" :value="option">{{ option }}</option>
      </select> AbstractGlitcher instance
    </label><br>

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

    <block-option-controls v-if="mode === 'blocks'" :options="options" @update:options="updateOptions"/>
    <offset-lines-option-controls v-if="mode === 'offsetLines'" :options="options" @update:options="updateOptions"/>

    <glitch-image
        v-bind="$attrs"
        :src="src"
        :enabled="enabled"
        :block-name="blockName"
        :element-name="elementName"
        :hidden-modifier-name="hiddenModifierName"
        :glitcher="glitcher"
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
import {computed, defineComponent, ref, watch} from "vue";
import {imageBlockDefaultOptions, imageOffsetLinesDefaultOptions} from "../scripts/defaults/blockOptions";
import {GlitcherOptions} from "../scripts/interfaces/glitcherInterface";
import {Blocks} from "../scripts/imageGlitchers/blocks";
import {AbstractGlitcher} from "../scripts/imageGlitchers/abstractGlitcher";
import {OffsetLines} from "../scripts/imageGlitchers/offsetLines";
import offsetLinesOptionControls from "./offsetlines-option-controls.vue";

export default defineComponent({
  inheritAttrs: false,
  name: "glitch-image-controller",
  components: {
    glitchImage,
    blockOptionControls,
    offsetLinesOptionControls
  },
  setup() {
    const defaultBlockName = 'jgi-image';
    const defaultElementName = 'picture';
    const defaultHiddenModifierName = 'hidden'
    const defaultEnabled = true;
    const defaultMode = 'blocks';
    const modesAndOptions = {
      blocks: imageBlockDefaultOptions,
      offsetLines: imageOffsetLinesDefaultOptions
    };

    const src = ref('/images/urban.png')
    const enabled = ref(defaultEnabled);
    const intensity = ref(0);
    const blockName = ref(defaultBlockName);
    const elementName = ref(defaultElementName);
    const hiddenModifierName = ref(defaultHiddenModifierName);
    const mode = ref<keyof typeof modesAndOptions>(defaultMode);
    const options = ref(Object.assign({}, imageBlockDefaultOptions));
    const key = ref(0);
    const glitcher = ref<AbstractGlitcher>();

    glitcher.value = new Blocks(options.value);

    const updateOptions = (receivedOptions: {[key: string]: string|number}): void => {
      Object.keys(options.value).forEach(optionsKey => delete options.value[optionsKey]);
      Object.keys(receivedOptions).forEach(optionsKey => options.value[optionsKey] = receivedOptions[optionsKey]);
      updateGlitcher()
    }

    const updateGlitcher = () => {
      switch (mode.value) {
        case "offsetLines":
          glitcher.value = new OffsetLines(options.value);
          break;
        case 'blocks':
        default:
          glitcher.value = new Blocks(options.value);
      }
    }

    const stringyfyOptionsForDisplay = (data: GlitcherOptions) => {
      return JSON.stringify(options.value)
          .replaceAll(',', ',\n    ')
          .replace('{', '{\n    ')
          .replace('}', '\n  }')
    }

    watch(() => mode.value, () => {
      updateOptions(modesAndOptions[mode.value]);
    })

    const code = computed(() => {
       return `
<glitch-image
  src="${src.value}" ${enabled.value !== defaultEnabled ? `
  :enabled="${enabled.value}"` : ''} ${blockName.value !== defaultBlockName ? `
  block-name="${blockName.value}"` : ''} ${elementName.value !== defaultElementName ? `
  element-name="${elementName.value}"` : ''} ${hiddenModifierName.value !== defaultHiddenModifierName ? `
  hidden-modifier-name="${hiddenModifierName.value}"` : ''}
  :glitcher='new ${mode.value}(${ JSON.stringify(options.value) !== JSON.stringify(modesAndOptions[mode.value]) ? stringyfyOptionsForDisplay(options) : ''})'
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
      glitcher
    }
  }
})
</script>
