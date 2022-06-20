import {App} from "@/App";
import {MultiRequirement} from "@/engine/tools/requirements/MultiRequirement";
import {DiscreteUpgrade} from "@/engine/features/upgrades/DiscreteUpgrade";
import {GasolineAction} from "@/engine/features/gasoline/GasolineAction";
import {Currency} from "@/engine/features/wallet/Currency";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";

export class ScrapMachineAction extends GasolineAction {
    constructor(goal: number, upgrade: DiscreteUpgrade, requirements: MultiRequirement = new MultiRequirement([])) {
        super(goal, upgrade, requirements);
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
        return new Currency(this.upgrade.getBonus() * App.game.features.gasoline.getScrapMultiplier(), CurrencyType.Scrap);
    }

    gainReward(): void {
        App.game.features.wallet.gainCurrency( this.reward() );
    }

}
