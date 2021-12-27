<template>
  <section class="glitch_text_controller">
    <h2>Glitch text controller</h2>

    <glitch-text
        v-bind="$attrs"
        :value="value"
        :enabled="enabled"
        :hover-intensity="hoverIntensity"
        :intensity="intensity"
        :block-name="blockName"
        :element-name="elementName"
        :glitch-modifier-name="glitchModifierName"
        :glitch-element-modifiers="glitchElementModifiers"
    />
    <br>

    <label for="enabled">
      <input type="checkbox"
             name="enabled"
             v-model="enabled"
      > Enabled</label><br>

    <label for="value">
      <input type="text"
             name="value"
             v-model="value"
      > Value</label><br>
    <br>

    <label for="intensity">
      <input type="range"
             name="intensity"
             min="0"
             max="0.05"
             step="0.001"
             v-model.number="intensity"
      > Intensity</label><br>

    <label for="hover-intensity">
      <input type="range"
             name="hover-intensity"
             min="0"
             max="0.05"
             step="0.001"
             v-model.number="hoverIntensity"
      > Hover Intensity</label><br>
    <br>

    <label for="block-name">
      <input type="text"
             name="block-name"
             v-model="blockName"
      > Block name (BEM)</label><br>
    <br>

    <label for="element-name">
      <input type="text"
             name="element-name"
             v-model="elementName"
      > Element name (BEM)</label><br>
    <br>

    <label for="glitch-modifier-name">
      <input type="text"
             name="glitch-modifier-name"
             v-model="glitchModifierName"
      > Glitch modifier name (BEM)</label><br>
    <br>

    <label for="glitch-element-modifiers">
      <input type="text"
             name="glitch-element-modifiers"
             v-model="glitchElementModifiersInput"
      > Glitch element modifiers (BEM, Comma separated)</label><br>
    <br>

    <h3>Code</h3>
    <pre>
      {{ code }}
    </pre>
  </section>
</template>

<script lang="ts">
import glitchText from "./text.vue";
import {computed, defineComponent, ref} from "vue";

export default defineComponent({
  inheritAttrs: false,
  name: "glitch-text-controller",
  components: {
    glitchText
  },
  setup() {
    const defaultGlitchElementModifiers = ['bottom', 'top'];
    const defaultBlockName = 'jgt';
    const defaultElementName = 'word';
    const defaultGlitchModifierName = 'glitch'
    const defaultEnabled = true;

    const enabled = ref(defaultEnabled);
    const hoverIntensity = ref(0);
    const intensity = ref(0);
    const glitchElementModifiers = ref(defaultGlitchElementModifiers);
    const blockName = ref(defaultBlockName);
    const elementName = ref(defaultElementName);
    const glitchModifierName = ref(defaultGlitchModifierName);
    const value = ref('glitch');

    const glitchElementModifiersInput = computed({
      get(): string {
        return glitchElementModifiers.value.join(',')
      },
      set(newValue: string): void {
        glitchElementModifiers.value = newValue.split(',')
      },
    });

    const code = computed(() => {
       return `
<glitch-text
  value="${value.value}" ${enabled.value !== defaultEnabled ? `
  :enabled="${enabled.value}"` : ''} ${hoverIntensity.value > 0 ? `
  :hover-intensity="${hoverIntensity.value}"` : ''} ${intensity.value > 0 ? `
  :intensity="${intensity.value}"` : ''} ${blockName.value !== defaultBlockName ? `
  block-name="${blockName.value}"` : ''} ${elementName.value !== defaultElementName ? `
  element-name="${elementName.value}"` : ''} ${glitchModifierName.value !== defaultGlitchModifierName ? `
  glitch-modifier-name="${glitchModifierName.value}"` : ''} ${glitchElementModifiersInput.value !== defaultGlitchElementModifiers.join(',') ? `
  glitch-element-modifiers="${glitchElementModifiers.value}"` : ""}
/>
       `
    })

    return {
      glitchElementModifiersInput,
      glitchElementModifiers,
      enabled,
      hoverIntensity,
      intensity,
      blockName,
      elementName,
      glitchModifierName,
      value,
      code
    }
  }
})
</script>
