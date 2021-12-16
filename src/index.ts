import {App, Plugin} from "vue";
import text from "./components/text.vue";
import {GlitchConfig} from "./scripts/config";

export function install(app: App, ...options: any[]) {
    console.log(options);
}

export const jglitch: Plugin = {
    install
};

export default jglitch
