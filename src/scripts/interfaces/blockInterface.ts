export class Block {
    public x: number = 0;
    public y: number = 0;
    public offSetX: number = 0;
    public offSetY: number = 0;
    public processedCount = 0;
    public readonly imageData: ImageData;
    public readonly originalImageData: ImageData;

    constructor(imageData: ImageData, x: number = 0, y: number = 0, offsetX: number = 0, offsetY:number = 0) {
        this.imageData = imageData;
        this.originalImageData = new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height)
        this.x = x;
        this.y = y;
        this.offSetX = offsetX;
        this.offSetY = offsetY;
    }

    public resetImageData() {
        this.imageData.data.set(new Uint8ClampedArray(this.originalImageData.data));
    }
}
