import {App} from "@/App";
import {Requirement} from "@/engine/tools/requirements/Requirement";
import {StatisticId} from "@/engine/features/statistics/StatisticId";

export class StatisticRequirement extends Requirement {
    id: StatisticId;
    _targetValue: number;


    constructor(id: StatisticId, targetValue: number) {
        super();
        this.id = id;
        this._targetValue = targetValue;
    }

    lockedReason(): string {
        return `The statistic ${App.game.features.statistics.getStatistic(this.id)?.id} needs to be at least ${this.targetValue}`;
    }

    getActualValue(): number {
        return App.game.features.statistics.getStatistic(this.id)?.value as number;
    }

    getTargetValue(): number {
        return this._targetValue;
    }

    get targetValue(): number {
        return this._targetValue;
    }
    
    get actualValue(): number {
        return App.game.features.statistics.getStatistic(this.id)?.value as number;
    }

    get hint(): string {
        return `The statistic ${App.game.features.statistics.getStatistic(this.id)?.description} needs to be at least ${this.targetValue}`;
    }
}
