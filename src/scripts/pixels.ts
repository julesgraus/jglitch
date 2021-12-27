import {Block} from "./interfaces/blockInterface";

export class Pixels {
    block: Block;

    constructor(block: Block) {
        this.block = block;
    }

    public lightenOrDarken(value: number) {
        let data = this.block.imageData.data;
        //4 bytes represent 1 pixel. The byres are Red, Green, Blue, Alpha.
        for (let i = 0; i < data.length; i += 4) {
            data[i] += value; // red
            data[i + 1] += value; // green
            data[i + 2] += value; // blue
        }
        this.block.processedCount++;
        return this
    }

    public lightenOrDarkenChannels(r: number = 0, g: number = 0, b: number = 0, a: number = 0) {
        let data = this.block.imageData.data;
        //4 bytes represent 1 pixel. The byres are Red, Green, Blue, Alpha.
        for (let i = 0; i < data.length; i += 4) {
            data[i] += r; // red
            data[i + 1] += g; // green
            data[i + 2] += b; // blue
            data[i + 3] += a; // alpha
        }
        this.block.processedCount++;
        return this
    }

    public setChannelsAt(r: number = 0, g: number = 0, b: number = 0, a: number = 0) {
        let data = this.block.imageData.data;
        //4 bytes represent 1 pixel. The byres are Red, Green, Blue, Alpha.
        for (let i = 0; i < data.length; i += 4) {
            data[i] = r; // red
            data[i + 1] = g; // green
            data[i + 2] = b; // blue
            data[i + 3] = a; // alpha
        }
        this.block.processedCount++;
        return this
    }

    public invert() {
        let data = this.block.imageData.data;
        //4 bytes represent 1 pixel. The byres are Red, Green, Blue, Alpha.
        for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i]; // red
            data[i + 1] = 255 - data[i + 1]; // green
            data[i + 2] = 255 - data[i + 2]; // blue
        }
        this.block.processedCount++;
        return this;
    }

    public restoreOriginalChannels(r: number|null = 0, g: number|null = 0, b: number|null = 0, a: number|null = 0) {
        let originalData = this.block.originalImageData.data;
        let data = this.block.imageData.data;
        //4 bytes represent 1 pixel. The byres are Red, Green, Blue, Alpha.
        for (let i = 0; i < data.length; i += 4) {
            for(let channel = 0; channel < 3; channel++) {
                let channelRestoreValue = arguments[channel];
                if(channelRestoreValue === 0) data[i + channel] = originalData[i + channel];
                else if(channelRestoreValue !== null) {
                    let diff = data[i + channel] - originalData[i + channel];
                    if(diff > 0 && diff > channelRestoreValue) diff = channelRestoreValue;
                    else if(diff < 0 && diff * -1 > channelRestoreValue) diff = channelRestoreValue * -1;
                    data[i + channel] -= diff;
                }
            }
        }
        this.block.processedCount++;
        return this
    }

    static make(block: Block) {
        return new Pixels(block);
    }
}
