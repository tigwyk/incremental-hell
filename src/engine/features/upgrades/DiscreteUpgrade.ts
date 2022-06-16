import {Upgrade} from "@/engine/features/upgrades/Upgrade";
import {Currency} from "@/engine/features/wallet/Currency";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import {UpgradeType} from "@/engine/features/upgrades/UpgradeType";

export class DiscreteUpgrade extends Upgrade {

    costList: Currency[] = [];
    bonusList: number[] = []

    constructor(id: string, type: UpgradeType, displayName: string, maxLevel: number, costList: Currency[], bonusList: number[], increasing: boolean) {
        super(id, type, displayName, maxLevel, increasing);
        this.costList = costList;
        this.bonusList = bonusList;
    }

    getCost(): Currency {
        if (this.isMaxLevel()) {
            return new Currency(Infinity, CurrencyType.Scrap);
        }
        return this.costList[this.level];
    }


    getBonus(level: number = this.level): number {
        return this.bonusList[level];
    }

}
