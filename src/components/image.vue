<template>
  <div :class="this.blockName">
    <img :class="[imageLoaded && !processing ? bemClass(this.blockName, this.elementName, this.hiddenModifierName) : '']"
      :src="src"
      :alt="$attrs['alt'] || 'glitching image'"
       v-bind="$attrs"
       ref="imageRef"
       @load="loadedImage"
    >
    <canvas :class="[!imageLoaded || processing ? bemClass(this.blockName, this.elementName, this.hiddenModifierName) : '']"
      ref="canvasRef"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, nextTick, onMounted, onUnmounted, ref, watch} from "vue";
import {bemClass, debounce} from "../scripts/helpers";
import {AbstractGlitcher} from "../scripts/imageGlitchers/abstractGlitcher";

export default defineComponent({
  name: "glitch-image",
  inheritAttrs: false,
  props: {
    src: {
      type: String,
      required: true
    },
    enabled: {
      type: Boolean,
      default: true
    },
    blockName: {
      type: String,
      default: 'jgi-image'
    },
    elementName: {
      type: String,
      default: 'picture'
    },
    hiddenModifierName: {
      type: String,
      default: 'hidden'
    },
    glitcher: {
      type: Object as () => AbstractGlitcher,
      required: true
    },
    options: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    let canvasRef = ref<HTMLCanvasElement|null>(null);
    let imageRef = ref<HTMLImageElement|null>(null);
    let processing = ref(true);
    let imageLoaded = ref(false);
    let started = ref<Boolean>(false);
    let previousTimestamp = ref<number|null>(null);
    let requestAnimationFrameId: number|null = null

    const sizeCanvas = function(image: HTMLImageElement): Promise<HTMLImageElement> {
      processing.value = true;
      return new Promise((resolve, reject) => {
        //Only on the next tick, the image will be rendered, and then it has a height and width.
        if(!imageRef.value || !canvasRef.value) {
          reject();
          return;
        }

        canvasRef.value.width = imageRef.value.offsetWidth;
        canvasRef.value.height = imageRef.value.offsetHeight;
        resolve(image)
      })
    }

    const drawImageOnCanvas = function (image: HTMLImageElement) {
      if(!canvasRef.value) return;
      let context = canvasRef.value.getContext('2d');
      if(!context) return;
      context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvasRef.value.width, canvasRef.value.height);
      processing.value = false;
    }

    const loadedImage = function(loadEvent: Event) {
      imageLoaded.value = true;
      let imageElement = loadEvent.target as HTMLImageElement
      sizeCanvas(imageElement).then(drawImageOnCanvas).then(() => glitch())
    }

    const glitch = function() {
      stop();
      props.glitcher.setCanvasElement(canvasRef.value as HTMLCanvasElement)
      props.glitcher.setImageElement(imageRef.value as HTMLImageElement)
      if(props.enabled) start();
    }

    const updateCanvasSize = function () {
      processing.value = true;
      let imageElement = imageRef.value as HTMLImageElement
      nextTick(() => {
        sizeCanvas(imageElement).then(drawImageOnCanvas).then(() => glitch())
      })
    }

    const updateCanvasSizeDebounced = debounce(updateCanvasSize, 100)

    const start = function() {
      started.value = true
      requestAnimationFrameId = window.requestAnimationFrame(step);
    }

    const stop = function () {
      if(requestAnimationFrameId) window.cancelAnimationFrame(requestAnimationFrameId);
      started.value = false;
      previousTimestamp.value = null;
    }

    const step = function (timestamp: number) {
      if(!props.glitcher) return;
      if (previousTimestamp.value === null) previousTimestamp.value = timestamp;
      const delta = timestamp - previousTimestamp.value;

      props.glitcher.step(delta);

      previousTimestamp.value = timestamp;
      if(started.value) requestAnimationFrameId = window.requestAnimationFrame(step);
    }

    watch(() => {
      return [
        props.src,
        props.enabled,
        props.blockName,
        props.elementName,
        props.hiddenModifierName,
        props.options,
        Object.keys(props.glitcher)
      ];
    }, () => {
      glitch()
    }, {})

    onMounted(() => {
      window.addEventListener('resize', updateCanvasSizeDebounced)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateCanvasSizeDebounced)
      stop()
    })

    return {
      processing,
      imageLoaded,
      canvasRef,
      imageRef,
      loadedImage,
      bemClass
    }
  }
})
</script>
