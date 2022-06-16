import {StatisticId} from "@/engine/features/statistics/StatisticId";
import {StatisticsValue} from "@/engine/features/statistics/StatisticsValueType";

export abstract class AbstractStatistic {
    id: StatisticId;
    description: string;
    abstract value: StatisticsValue;

    protected constructor(id: StatisticId, description: string) {
        this.id = id;
        this.description = description;
    }

}