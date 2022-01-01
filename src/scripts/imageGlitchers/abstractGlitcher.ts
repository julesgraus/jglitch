import {GlitcherInterface, GlitcherOptions} from "../interfaces/glitcherInterface";
import {Block} from "../interfaces/blockInterface";

export abstract class AbstractGlitcher implements GlitcherInterface {
    protected name: string = 'AbstractGlitcher'
    protected context: CanvasRenderingContext2D|null = null;
    protected img: HTMLImageElement|null = null
    protected canvas: HTMLCanvasElement|null = null
    protected reducedMotion: boolean;
    protected options: GlitcherOptions|null;

    protected constructor(options: GlitcherOptions|null = null) {
        this.options = options;
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        this.reducedMotion = (!mediaQuery || mediaQuery.matches);
        mediaQuery.addEventListener("change", () => {
            this.reducedMotion = (mediaQuery.matches);
        });
    }

    public setImageElement(imageElement: HTMLImageElement) {
        this.img = imageElement;
    }

    public setCanvasElement(canvasElement: HTMLCanvasElement) {
        this.canvas = canvasElement;
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    protected drawBlock(block: Block, x: number|null = null, y:number|null = null) {
        if(this.context)
        this.context.putImageData(block.imageData, x === null ? block.x : x, y === null ? block.y : y)
    }

    resetCanvas() {
        if(!this.canvas || !this.img) return;
        let context = this.canvas.getContext('2d');
        if(!context) return;
        context.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.canvas.width, this.canvas.height);
    }

    abstract step(stepAmount: number): void
}
