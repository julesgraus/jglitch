import {PercentageTimeframe} from "./percentageTimeframe";
import {getRandomIntInclusive} from "./helpers";

export class Timeline {
    private readonly _duration: number

    private _percentage: number;
    private _needlePosition: number
    private _atEndCallBack: null|((timeline: Timeline) => void);
    private timeframes: PercentageTimeframe[];

    constructor(duration: number) {
        this._duration = duration;
        this.timeframes = [];
        this._needlePosition = 0;
        this._percentage = 0
        this._atEndCallBack = null;
    }

    public moveNeedleWith(delta: number) {
        this.updateNeedlePositionWith(delta);
        this.updatePercentage()
        this.triggerFrameActions()
    }

    get percentage(): number {
        return this._percentage;
    }

    public betweenPercentage(minPercentage: number, tillPercentage: number): PercentageTimeframe {
        let timeframe = new PercentageTimeframe(this, minPercentage, tillPercentage);
        this.timeframes.push(timeframe)
        return timeframe;
    }

    betweenRandomPercentage(minDurationInPercent: number, maxDurationInPercent: number, minStartDelayInPercent: number, maxStartDelayInPercent: number): PercentageTimeframe {
        let minPercentage;
        let tillPercentage;
        if (this.timeframes.length > 0) {
            let lastTimeFrame = this.timeframes[this.timeframes.length - 1];
            minPercentage = lastTimeFrame.endPercentage + getRandomIntInclusive(minStartDelayInPercent, maxStartDelayInPercent);
            tillPercentage = getRandomIntInclusive(minPercentage + 1, minPercentage + getRandomIntInclusive(minDurationInPercent, maxDurationInPercent));
        } else {
            minPercentage = getRandomIntInclusive(0, getRandomIntInclusive(minStartDelayInPercent, maxStartDelayInPercent));
            tillPercentage = getRandomIntInclusive(minPercentage + 1, minPercentage + getRandomIntInclusive(minDurationInPercent, maxDurationInPercent));
            if (tillPercentage > 100) tillPercentage = 100;
        }

        let timeframe = new PercentageTimeframe(this, minPercentage, tillPercentage);
        this.timeframes.push(timeframe);
        return timeframe
    }

    public atEnd(callback: null|((timeline: Timeline) => void) = null) {
        this._atEndCallBack = callback;
    }

    public showFrameTimes() {
        let frameData = this.timeframes.map((timeframe) => {
            return {
                startPercentage: timeframe.startPercentage,
                endPercentage: timeframe.endPercentage
            };
        })

        console.table(frameData);
    }

    private updateNeedlePositionWith(moveAmount: number) {
        this._needlePosition += moveAmount;
        if(this._needlePosition >= this._duration) this.needleAtEnd()
    }

    private needleAtEnd() {
        this._needlePosition = this._needlePosition - this._duration;
        this.resetTimeFrameActivationCounts();

        if(this._atEndCallBack) this._atEndCallBack(this);
    }

    private updatePercentage() {
        return this._percentage = Math.round(Timeline.partAsPercentage(this._needlePosition, this._duration))
    }

    private static partAsPercentage(part:number, whole:number) {
        return 100 * (part / whole);
    }

    private triggerFrameActions() {
        this.timeframes.forEach(timeframe => timeframe.trigger(this.percentage))
    }

    private resetTimeFrameActivationCounts() {
        this.timeframes.forEach(timeframe => timeframe.resetActivationCount())
    }
}
