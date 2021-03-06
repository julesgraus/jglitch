import {App, Plugin} from "vue";
import glitchText from "./components/text.vue";
import glitchImage from "./components/image.vue";
import glitchTextController from "./components/text-controller.vue";
import glitchImageController from "./components/image-controller.vue";
import { Blocks } from "./scripts/imageGlitchers/blocks";
import {GlitchConfig} from "./scripts/config";

// Declare install function executed by Vue.use()
export function install(app: App, options: GlitchConfig) {
    app.component('glitch-text', glitchText)
    app.component('glitch-image', glitchImage)
    app.component('glitch-text-controller', glitchTextController)
    app.component('glitch-image-controller', glitchImageController)
}

// Create module definition for app.use(),
// for example when importing it like this 'import jglitch from "jglitch"'
// you can pass the imported jglitch variable to a vue app like this "app.use(jglitch)"
export const jglitch: Plugin = {
    install
};
export default jglitch;

//To allow to be used as modules (webpack for example);
export {
    glitchText,
    glitchImage,
    glitchTextController,
    glitchImageController,
    Blocks
}
