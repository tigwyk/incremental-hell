import {ProgressBar} from "@/engine/progressbars/ProgressBar";
import {App} from "@/App";
import {MultiRequirement} from "@/engine/tools/requirements/MultiRequirement";
import {SingleLevelUpgrade} from "@/engine/features/upgrades/SingleLevelUpgrade";
import {DiscreteUpgrade} from "@/engine/features/upgrades/DiscreteUpgrade";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import {Currency} from "@/engine/features/wallet/Currency";

export class ScrapAction extends ProgressBar {
    description: string;
    automationUpgrade: string;
    valueUpgrade: string;

    constructor(description: string, goal: number, automationUpgrade: string, valueUpgrade: string, requirements: MultiRequirement = new MultiRequirement([])) {
        super(goal, requirements);
        this.description = description;
        this.automationUpgrade = automationUpgrade;
        this.valueUpgrade = valueUpgrade
    }

    canRepeat(): boolean {
        return (App.game.features.scrap.upgrades.getUpgrade(this.automationUpgrade) as SingleLevelUpgrade).isBought();
    }

    scrapReward(): number {
        const upgrade = (App.game.features.scrap.upgrades.getUpgrade(this.valueUpgrade) as DiscreteUpgrade);
        return upgrade.getBonus();
    }

    gainReward(): void {
        return App.game.features.wallet.gainCurrency(new Currency(this.scrapReward(), CurrencyType.Scrap));

    }

}
