import {ProgressBar} from "@/engine/progressbars/ProgressBar";
import {App} from "@/App";
import {MultiRequirement} from "@/engine/tools/requirements/MultiRequirement";
import {DiscreteUpgrade} from "@/engine/features/upgrades/DiscreteUpgrade";
import {Currency} from "@/engine/features/wallet/Currency";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";

export class GasolineAction extends ProgressBar {
    upgrade: DiscreteUpgrade;

    constructor(goal: number, upgrade: DiscreteUpgrade, requirements: MultiRequirement = new MultiRequirement([])) {
        super(goal, requirements);
        this.upgrade = upgrade
    }


    start() {
        if (this.isStarted) {
            console.warn("Cannot start twice");
            return;
        }
        this.isStarted = true;
        this.value = 0;
    }

    canRepeat(): boolean {
        return this.upgrade.level > 0;
    }

    reward(): Currency {
        return new Currency(this.upgrade.getBonus() * App.game.features.gasoline.getOilMultiplier(), CurrencyType.Oil);
    }

    gainReward(): void {
        App.game.features.wallet.gainCurrency( this.reward() );

    }

}
