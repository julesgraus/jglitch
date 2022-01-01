import {getRandomIntInclusive} from "../helpers";
import {Block} from "../interfaces/blockInterface";
import {Pixels} from "../pixels";
import {Timeline} from "../timeline";
import {GlitcherInterface, GlitcherOptions} from "../interfaces/glitcherInterface";
import {AbstractGlitcher} from "./abstractGlitcher";
import {imageOffsetLinesDefaultOptions} from "../defaults/blockOptions";

export class OffsetLines extends AbstractGlitcher implements GlitcherInterface {
    protected name: string = 'OffsetLines'
    private blocks: Block[];
    private timeline: Timeline;
    private blockSizeY: number = imageOffsetLinesDefaultOptions.blockSizeY;
    private blockCount: number = imageOffsetLinesDefaultOptions.blockCount;
    private minDuration: number = imageOffsetLinesDefaultOptions.minDuration;
    private maxDuration: number = imageOffsetLinesDefaultOptions.maxDuration;
    private minDutyCyclePercentage:number = imageOffsetLinesDefaultOptions.minDutyCyclePercentage;
    private maxDutyCyclePercentage:number = imageOffsetLinesDefaultOptions.maxDutyCyclePercentage;
    private randomizeBlockSize: boolean = imageOffsetLinesDefaultOptions.randomizeBlockSize;

    constructor(options: OffsetLinesOptions|null = null) {
        super(options);
        this.blocks = [];
        this.timeline = new Timeline(this.minDuration)
    }

    private parseOptions() {
        if(!this.options) return;

        if(this.canvas) {
            if (this.options.blockSizeY && typeof this.options.blockSizeY === 'number') this.blockSizeY = this.canvas.height / this.options.blockSizeY;
        }

        if (this.options.minDutyCyclePercentage && typeof this.options.minDutyCyclePercentage === 'number') this.minDutyCyclePercentage = this.options.minDutyCyclePercentage;
        if (this.options.maxDutyCyclePercentage && typeof this.options.maxDutyCyclePercentage === 'number') this.maxDutyCyclePercentage = this.options.maxDutyCyclePercentage;
        if (this.options.minDuration && typeof this.options.minDuration === 'number') this.minDuration = this.options.minDuration;
        if (this.options.maxDuration && typeof this.options.maxDuration === 'number') this.maxDuration = this.options.maxDuration;
        if (this.options.blockCount && typeof this.options.blockCount === 'number') this.blockCount = this.options.blockCount;
        if (this.options.randomizeBlockSize && typeof this.options.randomizeBlockSize === 'boolean') this.randomizeBlockSize = this.options.randomizeBlockSize;
    }

    step(stepAmount: number): void {
        this.resetCanvas();
        if(!this.reducedMotion) this.timeline.moveNeedleWith(stepAmount)
    }

    private drawAfterEachBlock(blocks: Block[], todo: (PixelModifier: Pixels) => Pixels) {
        if(!blocks) return;
        blocks.forEach((block) => {
            todo(Pixels.make(block))
            this.drawBlock(block, block.x + block.offSetX, block.y + block.offSetY);
        })
    }

    private createNewBlocks(offsetX: number = 0, offsetY: number = 0, offsetXMax: number = 0, offsetYMax: number = 0) {
        this.blocks = [];
        if(!this.canvas || !this.context) return;

        for (let index = 0; index < this.blockCount; index++) {
            let xPos = 0;
            let yPos = getRandomIntInclusive(0, this.canvas.height);
            yPos -= (yPos % this.blockSizeY);

            let ySize = this.randomizeBlockSize ? getRandomIntInclusive(2, this.blockSizeY) : this.blockSizeY;

            this.blocks.push(new Block(
                this.context.getImageData(xPos, yPos, this.canvas.width, ySize),
                xPos, yPos,
                offsetXMax ? getRandomIntInclusive(offsetX, offsetXMax) : offsetX,
                offsetYMax ? getRandomIntInclusive(offsetY, offsetYMax) : offsetY
            ));
        }
    }

    private setupTimelines() {
        let duration = getRandomIntInclusive(this.minDuration, this.maxDuration);
        this.timeline = new Timeline(duration);

        this.timeline.betweenPercentage(0, getRandomIntInclusive(this.minDutyCyclePercentage, this.maxDutyCyclePercentage)).thenAlwaysDo(() => {
            this.drawAfterEachBlock(this.blocks, (pixels) => pixels)
        }).atEnd(() => {
            this.resetCanvas();
            this.createNewBlocks(-10, -10, 10, 10);
            this.setupTimelines()
        })
    }

    public setCanvasElement(canvasElement: HTMLCanvasElement) {
        super.setCanvasElement(canvasElement);
        this.createNewBlocks();
        this.parseOptions();
        this.setupTimelines();
    }
}

export interface OffsetLinesOptions extends GlitcherOptions {
    blockSizeY?: number|null,
    randomizeBlockSize?: boolean|null,
    blockCount?: number,
    minDuration?: number|null
    maxDuration?: number|null
    minDutyCyclePercentage?: number|null
    maxDutyCyclePercentage?: number|null
}
