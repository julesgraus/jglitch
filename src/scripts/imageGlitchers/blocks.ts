import {getRandomIntInclusive} from "../helpers";
import {Block} from "../interfaces/blockInterface";
import {Pixels} from "../pixels";
import {Timeline} from "../timeline";
import {GlitcherInterface, GlitcherOptions} from "./glitcherInterface";
import {AbstractGlitcher} from "./abstractGlitcher";

export class Blocks extends AbstractGlitcher implements GlitcherInterface<Blocks> {
    private blocks: Block[] = [];
    private timeline: Timeline;
    private readonly blockSizeX: number = 10;
    private readonly blockSizeY: number = 10;
    private readonly blockCount: number = 4;
    private readonly minDuration: number = 4000;
    private readonly maxDuration: number = 4000;
    private readonly intensity: number = 1;

    constructor(img: HTMLImageElement, canvas: HTMLCanvasElement, options: BlockOptions|null = null) {
        super(img, canvas, options);
        let canvasPixelCount = canvas.width * canvas.height;

        if(options) {
            if (options.blockSizeX) this.blockSizeX = canvas.width / options.blockSizeX;
            if (options.blockSizeY) this.blockSizeY = canvas.height / options.blockSizeY;
            if (options.minDuration) this.minDuration = options.minDuration;
            if (options.maxDuration) this.maxDuration = options.maxDuration;
            if (options.intensity) this.intensity = options.intensity;
        }

        let blockPixelCount = this.blockSizeX * this.blockSizeY;
        this.blockCount = canvasPixelCount / blockPixelCount

        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.timeline = new Timeline(this.minDuration)
        this.createNewBlocks();
        this.setupTimelines();
    }

    step(stepAmount: number): void {
        if(!this.reducedMotion) this.timeline.moveNeedleWith(stepAmount)
    }

    private drawAfterEachBlock(blocks: Block[], todo: (PixelModifier: Pixels) => Pixels) {
        if(!blocks) return;
        blocks.forEach((block) => {
            todo(Pixels.make(block))
            this.drawBlock(block);
        })
    }

    private createNewBlocks() {
        this.blocks = [];
        for (let index = 0; index < this.blockCount; index++) {
            let xPos = getRandomIntInclusive(0, this.canvas.width);
            let yPos = getRandomIntInclusive(0, this.canvas.height);
            xPos -= (xPos % this.blockSizeX);
            yPos -= (yPos % this.blockSizeY);

            this.blocks.push(new Block(
                this.context.getImageData(xPos, yPos, this.blockSizeX, this.blockSizeY),
                xPos, yPos
            ));
        }
    }

    private setupTimelines() {
        let duration = getRandomIntInclusive(this.minDuration, this.maxDuration);
        this.timeline = new Timeline(duration);

        let intensity = this.intensity;
        let r = getRandomIntInclusive(1, 20) * intensity;
        let g = getRandomIntInclusive(1, 20) * intensity;
        let b = getRandomIntInclusive(1, 20) * intensity;

        let rloop = [r, r * (intensity * .1), r * (intensity * .3)];
        let gloop = [g, g * (intensity * .1), g * (intensity * .3)];
        let bloop = [b, b * (intensity * .1), b * (intensity * .3)];


        let chunkSize = this.blocks.length / 3;

        let chunkedBlocks: Block[][] = [];
        let length = this.blocks.length
        for (let i = 0; i < length; i += chunkSize) {
            chunkedBlocks.push(this.blocks.slice(i, i + chunkSize));
        }

        this.timeline.betweenPercentage(0, 50).thenAlwaysDo(() => {
            for(let index = 0; index < 3; index++) {
                this.drawAfterEachBlock(chunkedBlocks[index], (pixels) => pixels.lightenOrDarkenChannels(rloop[index], gloop[index], bloop[index]))
            }
        }).betweenPercentage(50, 100).thenAlwaysDo(() => {
            for(let index = 0; index < 3; index++) {
                this.drawAfterEachBlock(chunkedBlocks[index], (pixels) => pixels.restoreOriginalChannels(rloop[index], gloop[index], bloop[index]))
            }
        }).atEnd(() => {
            this.resetCanvas();
            this.createNewBlocks();
            this.setupTimelines()
        })
    }
}

export interface BlockOptions extends GlitcherOptions {
    blockSizeX?: number|null,
    blockSizeY?: number|null,
    minDuration?: number|null
    maxDuration?: number|null
    intensity?: number|null
}
