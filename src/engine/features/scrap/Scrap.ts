import {Feature} from "@/engine/features/Feature";
import {ScrapSaveData} from "@/engine/features/scrap/ScrapSaveData";
import {App} from "@/App";
import {UpgradeList} from "@/engine/features/upgrades/UpgradeList";
import {Upgrade} from "@/engine/features/upgrades/Upgrade";
import {UpgradeSaveData} from "@/engine/features/upgrades/UpgradeSaveData";
import {UpgradeType} from "@/engine/features/upgrades/UpgradeType";
import {CurrencyBuilder} from "@/engine/features/wallet/CurrencyBuilder";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import {DiscreteUpgrade} from "@/engine/features/upgrades/DiscreteUpgrade";
import {SingleLevelUpgrade} from "@/engine/features/upgrades/SingleLevelUpgrade";
import {Currency} from "@/engine/features/wallet/Currency";
import {ScrapAction} from "@/engine/features/scrap/ScrapAction";
import {MultiRequirement} from "@/engine/tools/requirements/MultiRequirement";
import {StatisticRequirement} from "@/engine/features/statistics/requirements/StatisticRequirement";
import {StatisticId} from "@/engine/features/statistics/StatisticId";

export class Scrap extends Feature {
    name: string = "Scrap";
    saveKey: string = "scrap";

    upgrades: UpgradeList<Upgrade, UpgradeSaveData>;

    actions: ScrapAction[]

    constructor() {
        super("scrap");
        this.upgrades = new UpgradeList<Upgrade, UpgradeSaveData>(
            [
                new SingleLevelUpgrade("scrap-unlock-dig-automation", UpgradeType.ScrapAutomation, "Automatically dig for scraps", new Currency(30, CurrencyType.Scrap), 1),
                new SingleLevelUpgrade("scrap-unlock-metal-detector-automation", UpgradeType.ScrapAutomation, "Automate your metal detector", new Currency(150, CurrencyType.Scrap), 1),
                new SingleLevelUpgrade("scrap-unlock-recycle-automation", UpgradeType.ScrapAutomation, "Automatically recycle stuff", new Currency(500, CurrencyType.Scrap), 1),
                new SingleLevelUpgrade("scrap-unlock-plunder-copper-automation", UpgradeType.ScrapAutomation, "Automatically plunder copper", new Currency(1000, CurrencyType.Scrap), 1),

                new DiscreteUpgrade("scrap-dig-value", UpgradeType.ScrapValue, "Dig value", 9,
                    CurrencyBuilder.createArray([5, 10, 25, 50, 100, 250, 500, 750, 1000, 2500], CurrencyType.Scrap),
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], true),
                new DiscreteUpgrade("scrap-metal-detector-value", UpgradeType.ScrapValue, "Metal detector value", 9,
                    CurrencyBuilder.createArray([25, 50, 100, 250, 500, 750, 1000, 2500, 5000, 10000], CurrencyType.Scrap),
                    [5, 10, 15, 20, 25, 30, 35, 40, 45, 50], true),
                new DiscreteUpgrade("scrap-recycle-value", UpgradeType.ScrapValue, "Recycle value", 9,
                    CurrencyBuilder.createArray([500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500], CurrencyType.Scrap),
                    [25, 50, 75, 100, 125, 150, 175, 200, 225, 250], true),
                new DiscreteUpgrade("scrap-plunder-copper-value", UpgradeType.ScrapValue, "Copper value", 9,
                    CurrencyBuilder.createArray([1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000], CurrencyType.Scrap),
                    [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000], true),
                new DiscreteUpgrade("scrap-automation-speed", UpgradeType.ScrapAutomationSpeed, "Speedup all actions", 10,
                    CurrencyBuilder.createArray([50, 100, 250, 500, 750, 1000, 2500, 5000, 7500, 10000], CurrencyType.Scrap),
                    [1, 1.5, 2.0, 2.5, 3, 4, 5, 7.5, 10, 12.5, 15, 20], true),
            ]
        );

        this.actions = [
            new ScrapAction("Dig for scraps", 2, "scrap-unlock-dig-automation", "scrap-dig-value"),
            new ScrapAction("Metal detector", 6, "scrap-unlock-metal-detector-automation", "scrap-metal-detector-value", new MultiRequirement([new StatisticRequirement(StatisticId.TotalScrapGainedThisPrestige, 8)])),
            new ScrapAction("Recycle stuff", 20, "scrap-unlock-recycle-automation", "scrap-recycle-value", new MultiRequirement([new StatisticRequirement(StatisticId.TotalScrapGainedThisPrestige, 100)])),
            new ScrapAction("Plunder copper ", 50, "scrap-unlock-plunder-copper-automation", "scrap-plunder-copper-value", new MultiRequirement([new StatisticRequirement(StatisticId.TotalScrapGainedThisPrestige, 1000)])),
        ]
    }


    update(delta: number) {
        if (!this.canAccess()) {
            return;
        }

        const speedMultiplier = (this.upgrades.getUpgrade("scrap-automation-speed") as DiscreteUpgrade).getBonus();
        for (const action of this.actions) {
            action.progress(delta * speedMultiplier);
        }
    }

    load(data: ScrapSaveData): void {
        // Empty
    }


    canAccess(): boolean {
        return App.game.features.timeLine.canAccessScrap;
    }

    parseSaveData(json: Record<string, unknown>): ScrapSaveData {
        return new ScrapSaveData();
    }

    save(): ScrapSaveData {
        return new ScrapSaveData();
    }

    reset() {
        for (const upgrade of this.upgrades.list) {
            upgrade.level = 0;
        }
        for (const action of this.actions) {
            action.isStarted = false;
            action.value = 0;
        }
    }
}
