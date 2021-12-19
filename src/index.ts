import {App, Plugin} from "vue";
import text from "./components/text.vue";
import textController from "./components/text-controller.vue";
import {GlitchConfig} from "./scripts/config";

export function install(app: App, options: GlitchConfig) {
    app.component('glitch-text', text)
    app.component('glitch-text-controller', textController)
}

export const jglitch: Plugin = {
    install
};

export default jglitch
