import {DiscreteUpgrade} from "@/engine/features/upgrades/DiscreteUpgrade";
import {Currency} from "@/engine/features/wallet/Currency";
import {UpgradeType} from "@/engine/features/upgrades/UpgradeType";

/**
 * An upgrade with a max level of 1
 */
export class SingleLevelUpgrade extends DiscreteUpgrade {

    constructor(id: string, type: UpgradeType, displayName: string, cost: Currency, bonus: number) {
        super(id, type, displayName, 1, [cost], [0, bonus], true);
    }

    isBought(): boolean {
        return this.isMaxLevel();
    }

}
