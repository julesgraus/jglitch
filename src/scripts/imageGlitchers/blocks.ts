import {getRandomIntInclusive} from "../helpers";
import {Block} from "../interfaces/blockInterface";
import {Pixels} from "../pixels";
import {Timeline} from "../timeline";
import {GlitcherInterface, GlitcherOptions} from "../interfaces/glitcherInterface";
import {AbstractGlitcher} from "./abstractGlitcher";
import {imageBlockDefaultOptions} from "../defaults/blockOptions";

export class Blocks extends AbstractGlitcher implements GlitcherInterface {
    protected name: string = 'Blocks'
    private blocks: Block[];
    private timeline: Timeline;
    private blockSizeX: number = imageBlockDefaultOptions.blockSizeX;
    private blockSizeY: number = imageBlockDefaultOptions.blockSizeY;
    private minDuration: number = imageBlockDefaultOptions.minDuration;
    private maxDuration: number = imageBlockDefaultOptions.maxDuration;
    private intensity: number = imageBlockDefaultOptions.intensity;
    private blockCount: number =  4;

    constructor(options: BlockOptions|null = null) {
        super(options);
        this.blocks = [];
        this.timeline = new Timeline(this.minDuration)
    }

    private parseOptions() {
        if(!this.options) return;

        let canvasPixelCount = 0;
        if(this.canvas) {
            canvasPixelCount = this.canvas.width * this.canvas.height;
            if (this.options.blockSizeX && typeof this.options.blockSizeX === 'number') this.blockSizeX = this.canvas.width / this.options.blockSizeX;
            if (this.options.blockSizeY && typeof this.options.blockSizeY === 'number') this.blockSizeY = this.canvas.height / this.options.blockSizeY;
        }

        if (this.options.minDuration && typeof this.options.minDuration === 'number') this.minDuration = this.options.minDuration;
        if (this.options.maxDuration && typeof this.options.maxDuration === 'number') this.maxDuration = this.options.maxDuration;
        if (this.options.intensity && typeof this.options.intensity === 'number') this.intensity = this.options.intensity;

        let blockPixelCount = this.blockSizeX * this.blockSizeY;
        this.blockCount = canvasPixelCount / blockPixelCount
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
        if(!this.canvas || !this.context) return;

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

    setCanvasElement(canvasElement: HTMLCanvasElement) {
        super.setCanvasElement(canvasElement);
        this.createNewBlocks();
        this.parseOptions();
        this.setupTimelines();
    }
}

export interface BlockOptions extends GlitcherOptions {
    blockSizeX?: number|null,
    blockSizeY?: number|null,
    minDuration?: number|null
    maxDuration?: number|null
    intensity?: number|null
}
