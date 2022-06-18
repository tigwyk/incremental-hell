/**
 * Statistics class to keep track of increasing numbers
 */
import {StatisticId} from "@/engine/features/statistics/StatisticId";
import {NumberStatistic} from "@/engine/features/statistics/NumberStatistic";
import {Feature} from "@/engine/features/Feature";
import {AbstractStatistic} from "@/engine/features/statistics/AbstractStatistic";
import {StatisticsSaveData} from "@/engine/features/statistics/StatisticsSaveData";
import {StatisticsValue} from "@/engine/features/statistics/StatisticsValueType";
import {Features} from "@/engine/Features";
import {Currency} from "@/engine/features/wallet/Currency";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import {ArrayStatistic} from "@/engine/features/statistics/ArrayStatistic";

export class Statistics extends Feature {

    list: Record<StatisticId, AbstractStatistic>


    constructor() {
        super('statistics');
        this.list = {} as Record<StatisticId, AbstractStatistic>;
    }

    initialize(features: Features): void {
        this.registerStatistic(new NumberStatistic(StatisticId.TotalMoneyGained, 'Total money'));
        this.registerStatistic(new NumberStatistic(StatisticId.TotalScrapGained, 'Total scrap'));
        this.registerStatistic(new NumberStatistic(StatisticId.TotalOilGained, 'Total oil'));
        this.registerStatistic(new NumberStatistic(StatisticId.TotalGasolineGained, 'Total gasoline'));
        this.registerStatistic(new NumberStatistic(StatisticId.TotalLightningGained, 'Total lightning'));
        this.registerStatistic(new NumberStatistic(StatisticId.TotalPlutoniumGained, 'Total plutonium'));
        this.registerStatistic(new NumberStatistic(StatisticId.TotalScrapGainedThisPrestige, 'Total scrap this prestige'));
        this.registerStatistic(new NumberStatistic(StatisticId.TotalOilGainedThisPrestige, 'Total oil this prestige'));
        this.registerStatistic(new NumberStatistic(StatisticId.TotalGasolineGainedThisPrestige, 'Total gasoline this prestige'));
        this.registerStatistic(new NumberStatistic(StatisticId.TotalLightningGainedThisPrestige, 'Total lightning this prestige'));
        this.registerStatistic(new NumberStatistic(StatisticId.TotalPlutoniumGainedThisPrestige, 'Total plutonium this prestige'));

        features.wallet.onCurrencyGain.subscribe((currency: Currency) => {
            if (currency.type === CurrencyType.Money) {
                this.incrementNumberStatistic(StatisticId.TotalMoneyGained, currency.amount);
            }
            if (currency.type === CurrencyType.Scrap) {
                this.incrementNumberStatistic(StatisticId.TotalScrapGained, currency.amount);
                this.incrementNumberStatistic(StatisticId.TotalScrapGainedThisPrestige, currency.amount);
            }
            if (currency.type === CurrencyType.Oil) {
                this.incrementNumberStatistic(StatisticId.TotalOilGained, currency.amount);
                this.incrementNumberStatistic(StatisticId.TotalOilGainedThisPrestige, currency.amount);
            }
            if (currency.type === CurrencyType.Gasoline) {
                this.incrementNumberStatistic(StatisticId.TotalGasolineGained, currency.amount);
                this.incrementNumberStatistic(StatisticId.TotalGasolineGainedThisPrestige, currency.amount);
            }
        });
    }

    getCurrencyStatisticThisPrestige(type: CurrencyType): NumberStatistic {
        switch (type) {
            case CurrencyType.Scrap: {
                return this.getStatistic(StatisticId.TotalScrapGainedThisPrestige) as NumberStatistic;
            }
            default: {
                return this.getStatistic(StatisticId.TotalScrapGainedThisPrestige) as NumberStatistic;
            }
        }
    }

    incrementNumberStatistic(id: StatisticId, amount = 1): void {
        if (!this.hasStatistic(id)) {
            console.warn(`Could not find statistic with id ${id}`)
            return;
        }
        const statistic = this.list[id];
        if (statistic instanceof NumberStatistic) {
            statistic.value += amount;
        }
    }

    incrementArrayStatistic(id: StatisticId, index: number, amount = 1): void {
        if (!this.hasStatistic(id)) {
            console.warn(`Could not find statistic with id ${id}`)
            return;
        }
        const statistic = this.list[id];
        if (statistic instanceof ArrayStatistic) {
            const newValue = statistic.value[index] + amount;
            statistic.value.splice(index, 1, newValue)
        }
    }

    public getStatistic(id: StatisticId): AbstractStatistic | null {
        if (!this.hasStatistic(id)) {
            console.warn(`Could not find statistic with id ${id}`)
            return null;
        } else {
            return this.list[id];
        }
    }

    private hasStatistic(id: StatisticId): boolean {
        return id in this.list
    }

    public registerStatistic(statistic: AbstractStatistic) {
        this.list[statistic.id] = statistic;
    }

    load(data: StatisticsSaveData): void {
        for (const id in data.list) {
            if (Object.prototype.hasOwnProperty.call(data.list, id)) {
                if (this.hasStatistic(id as StatisticId)) {
                    this.list[id as StatisticId].value = data.list[id as StatisticId];
                } else {
                    console.warn(`Could not load statistic ${id}`)
                }
            }
        }
    }

    parseSaveData(json: Record<string, unknown>): StatisticsSaveData {
        const data = new StatisticsSaveData();
        const list = json.list as Record<string, StatisticsValue>;
        for (const id in list) {
            if (Object.prototype.hasOwnProperty.call(list, id)) {
                data.addStatistic(id as StatisticId, list[id])
            }
        }
        return data;
    }

    save(): StatisticsSaveData {
        const data = new StatisticsSaveData();
        for (const id in this.list) {
            data.addStatistic(id as StatisticId, this.list[id as StatisticId].value);
        }
        return data;
    }

}