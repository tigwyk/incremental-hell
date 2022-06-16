import {AbstractStatistic} from "@/engine/features/statistics/AbstractStatistic";
import {StatisticId} from "@/engine/features/statistics/StatisticId";

export class ArrayStatistic extends AbstractStatistic {
    value: number[];

    constructor(id: StatisticId, description: string, value: number[]) {
        super(id, description);
        this.value = value;
    }


}