import {Timeline} from "./timeline";

export class PercentageTimeframe {
    private readonly timeline: Timeline;
    private readonly _startPercentage: number;
    private readonly _tillPercentage: number;

    private activationCount: number
    private toActivateAmount: number|null
    private action: null|((timeframe: PercentageTimeframe) => void);

    constructor(timeline: Timeline, minPercentage: number, tillPercentage: number) {
        this.activationCount = 0;
        this._startPercentage = minPercentage;
        this._tillPercentage = tillPercentage;
        this.timeline = timeline;
        this.action = null;
        this.toActivateAmount = null;
    }

    public thenOnceDo(action: (timeframe: PercentageTimeframe) => void): Timeline {
        this.toActivateAmount = 1;
        this.action = action;
        return this.timeline;
    }

    public thenACoupleOfTimesDo(action: (timeframe: PercentageTimeframe) => void, times: number): Timeline {
        this.toActivateAmount = times;
        this.action = action;
        return this.timeline;
    }

    public thenAlwaysDo(action: (timeframe: PercentageTimeframe) => void): Timeline {
        this.toActivateAmount = null;
        this.action = action;
        return this.timeline;
    }

    public trigger(timelinePercentage: number): PercentageTimeframe {
        if(
            this.action === null ||
            (this.toActivateAmount !== null && this.toActivateAmount <= this.activationCount)
        ) return this;

        if(timelinePercentage > this._startPercentage && timelinePercentage <= this._tillPercentage) {
            this.action(this);
            this.activationCount++
        }
        return this;
    }

    public resetActivationCount() {
        this.activationCount = 0;
    }

    get startPercentage() {
        return this._startPercentage;
    }

    get endPercentage() {
        return this._tillPercentage;
    }
}
