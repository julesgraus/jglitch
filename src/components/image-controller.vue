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

    <label for="mode">
      <select name="select" id="select" v-model="mode">
        <option v-for="option in modes" :value="option">{{ option }}</option>
      </select> mode
    </label><br>

    <block-option-controls v-if="mode === 'blocks'" @options="updateOptions"/>

    <glitch-image
        style="width: 100%; height: 200px"
        v-bind="$attrs"
        :src="src"
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

export default defineComponent({
  inheritAttrs: false,
  name: "glitch-image-controller",
  components: {
    glitchImage,
    blockOptionControls
  },
  setup() {
    const defaultBlockName = 'glitch-image';
    const defaultElementName = 'picture';
    const defaultHiddenModifierName = 'hidden'
    const defaultEnabled = true;
    const defaultMode = 'blocks';
    const modes = ['blocks'];

    const src = ref('/images/urban.png')
    const enabled = ref(defaultEnabled);
    const intensity = ref(0);
    const blockName = ref(defaultBlockName);
    const elementName = ref(defaultElementName);
    const hiddenModifierName = ref(defaultHiddenModifierName);
    const mode = ref(defaultMode);
    const options = ref({});
    const key = ref(0);

    const updateOptions = (receivedOptions: {[key: string]: string|number}): void => {
      Object.keys(options.value).forEach(optionsKey => delete options.value[optionsKey]);
      Object.keys(receivedOptions).forEach(optionsKey => options.value[optionsKey] = receivedOptions[optionsKey]);
    }

    const code = computed(() => {
       return `
<glitch-image
  src="${src.value}" ${enabled.value !== defaultEnabled ? `
  :enabled="${enabled.value}"` : ''} ${blockName.value !== defaultBlockName ? `
  :block-name="${blockName.value}"` : ''}
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
      modes,
      mode,
      options,
      updateOptions,
      key,
    }
  }
})
</script>
