import {GlitcherOptions} from "./glitcherInterface";
import {Block} from "../interfaces/blockInterface";

export abstract class AbstractGlitcher {
    protected context: CanvasRenderingContext2D;
    protected readonly img: HTMLImageElement
    protected readonly canvas: HTMLCanvasElement
    protected reducedMotion: boolean;

    protected constructor(img: HTMLImageElement, canvas: HTMLCanvasElement, options: GlitcherOptions|null = null) {
        this.img = img;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        this.reducedMotion = (!mediaQuery || mediaQuery.matches);
        mediaQuery.addEventListener("change", () => {
            this.reducedMotion = (mediaQuery.matches);
        });
    }

    protected drawBlock(block: Block) {
        this.context.putImageData(block.imageData, block.x, block.y)
    }

    resetCanvas() {
        if(!this.canvas || !this.img) return;
        let context = this.canvas.getContext('2d');
        if(!context) return;
        context.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.canvas.width, this.canvas.height);
    }
}
