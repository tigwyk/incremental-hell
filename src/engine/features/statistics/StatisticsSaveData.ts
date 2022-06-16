import {StatisticsValue} from "./StatisticsValueType";
import {StatisticId} from "@/engine/features/statistics/StatisticId";

export class StatisticsSaveData {
    list: Record<StatisticId, StatisticsValue>;

    constructor() {
        this.list = {} as Record<StatisticId, StatisticsValue>;
    }

    addStatistic(id: StatisticId, value: StatisticsValue): void {
        this.list[id] = value;
    }

}