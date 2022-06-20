import {Feature} from "@/engine/features/Feature";
import {App} from "@/App";
import {UpgradeList} from "@/engine/features/upgrades/UpgradeList";
import {Upgrade} from "@/engine/features/upgrades/Upgrade";
import {UpgradeSaveData} from "@/engine/features/upgrades/UpgradeSaveData";
import {GasolineSaveData} from "@/engine/features/gasoline/GasolineSaveData";
import {GasolineAction} from "@/engine/features/gasoline/GasolineAction";
import {Currency} from "@/engine/features/wallet/Currency";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import {DiscreteUpgrade} from "@/engine/features/upgrades/DiscreteUpgrade";
import {UpgradeType} from "@/engine/features/upgrades/UpgradeType";
import {CurrencyBuilder} from "@/engine/features/wallet/CurrencyBuilder";
import {OilSpeedup} from "@/engine/features/gasoline/OilSpeedup";
import {ScrapMachineAction} from "@/engine/features/gasoline/ScrapMachineAction";
import {MultiRequirement} from "@/engine/tools/requirements/MultiRequirement";
import {StatisticRequirement} from "@/engine/features/statistics/requirements/StatisticRequirement";
import {StatisticId} from "@/engine/features/statistics/StatisticId";
import {SettingId} from "@/engine/features/settings/SettingId";

export class Gasoline extends Feature {
    name: string = "Gasoline";
    saveKey: string = "gasoline";

    oilUpgrades: UpgradeList<Upgrade, UpgradeSaveData>;

    actions: GasolineAction[]

    // How often we've converted oil to gasoline already
    conversionCount: number;

    oilSpeedups: OilSpeedup[];
    selectedOilSpeedup: number;

    constructor() {
        super("gasoline");

        this.oilUpgrades = new UpgradeList<Upgrade, UpgradeSaveData>([]);
        this.actions = [];
        this.oilSpeedups = [];
        this.conversionCount = 0;
        this.selectedOilSpeedup = 0;
    }

    initialize() {
        this.oilUpgrades = new UpgradeList<Upgrade, UpgradeSaveData>(
            [
                new DiscreteUpgrade("oil-global-value", UpgradeType.OilValue, "Increase oil value", 13,
                    CurrencyBuilder.createArray([20, 50, 100, 250, 500, 1000, 2000, 4000, 10000, 25000, 50000, 100000, 250000], CurrencyType.Oil), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12.5, 15, 17.5, 20], true),
                new DiscreteUpgrade("gasoline-machine-speed", UpgradeType.GasolineMachineSpeed, "Increase action speed", 15,
                    CurrencyBuilder.createArray([30, 100, 500, 1000, 5000, 10000, 15000, 25000, 50000, 100000, 250000, 500000, 1000000, 2500000, 5000000], CurrencyType.Oil), [1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14], true),
                new DiscreteUpgrade("gasoline-conversion-value", UpgradeType.GasolineConversionValue, "Oil to Gasoline", 17,
                    CurrencyBuilder.createArray([100, 175, 250, 300, 500, 750, 1000, 1500, 2000, 3000, 4000, 5000, 10000, 20000, 40000, 80000, 150000], CurrencyType.Oil), [0, 1, 1.2, 1.5, 1.7, 2, 2.25, 2.5, 2.75, 3, 3.5, 4, 5, 6, 7, 8, 9, 10], true),
                new DiscreteUpgrade("gasoline-unlock-oil-speedup", UpgradeType.UnlockOilSpeedup, "Unlock Greasing", 7,
                    // Grease prices are 5x the oil/s
                    CurrencyBuilder.createArray([5, 25, 250, 1250, 5000, 50000, 500000], CurrencyType.Oil), [0, 1, 2, 3, 4, 5, 6, 7], true),
            ]
        )

        this.actions = [
            new GasolineAction(
                1,
                new DiscreteUpgrade("gasoline-first-machine", UpgradeType.GasolineMachine, "Dig randomly", 10,
                    CurrencyBuilder.createArray([1, 5, 10, 20, 30, 40, 50, 70, 100, 150], CurrencyType.Gasoline), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], true)
            ),
            new GasolineAction(
                3,
                new DiscreteUpgrade("gasoline-second-machine", UpgradeType.GasolineMachine, "Purify the Ocean", 3,
                    CurrencyBuilder.createArray([5, 10, 15], CurrencyType.Gasoline), [0, 3, 6, 9], true)
                , new MultiRequirement([new StatisticRequirement(StatisticId.TotalGasolineGainedThisPrestige, 3)]),
            ),
            new GasolineAction(
                5,
                new DiscreteUpgrade("gasoline-third-machine", UpgradeType.GasolineMachine, "Oil Drill", 12,
                    CurrencyBuilder.createArray([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120], CurrencyType.Gasoline), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144], true)
                , new MultiRequirement([new StatisticRequirement(StatisticId.TotalGasolineGainedThisPrestige, 10)]),
            ),
            new GasolineAction(
                10,
                new DiscreteUpgrade("gasoline-fourth-machine", UpgradeType.GasolineMachine, "Purify the Ocean again", 3,
                    CurrencyBuilder.createArray([30, 60, 90], CurrencyType.Gasoline), [0, 10, 20, 40], true)
                , new MultiRequirement([new StatisticRequirement(StatisticId.TotalGasolineGainedThisPrestige, 30)]),
            ),

            new GasolineAction(
                20,
                new DiscreteUpgrade("gasoline-fifth-machine", UpgradeType.GasolineMachine, "Drilling Platform", 3,
                    CurrencyBuilder.createArray([250, 500, 1000], CurrencyType.Gasoline), [0, 200, 500, 1000], true)
                , new MultiRequirement([new StatisticRequirement(StatisticId.TotalGasolineGainedThisPrestige, 250)]),
            ),
            new ScrapMachineAction(
                250,
                new DiscreteUpgrade("gasoline-scrap-machine", UpgradeType.GasolineMachine, "Scrap Machine", 5,
                    CurrencyBuilder.createArray([App.game.features.timeLine.GASOLINE_GOAL, App.game.features.timeLine.GASOLINE_GOAL * 1.5, App.game.features.timeLine.GASOLINE_GOAL * 2, App.game.features.timeLine.GASOLINE_GOAL * 3, App.game.features.timeLine.GASOLINE_GOAL * 4, App.game.features.timeLine.GASOLINE_GOAL * 5], CurrencyType.Gasoline), [0, 3, 15, 30, 150, 300], true)
                , new MultiRequirement([new StatisticRequirement(StatisticId.TotalGasolineGainedThisPrestige, 1000)]),
            )
        ]

        this.oilSpeedups = [
            new OilSpeedup("None", 0, 1),
            new OilSpeedup("1.5x", 1, 1.5),
            new OilSpeedup("2x", 5, 2),
            new OilSpeedup("3x", 50, 3),
            new OilSpeedup("4x", 250, 4),
            new OilSpeedup("5x", 1000, 5),
            new OilSpeedup("6x", 10000, 6),
            new OilSpeedup("7x", 100000, 7),
        ]

    }

    getOilMultiplier(): number {
        return this.oilUpgrades.getTotalMultiplierForType(UpgradeType.OilValue);
    }

    conversionCost(): number {
        return this.conversionCount + 1
    }

    conversionGasolineGain(): number {
        return this.oilUpgrades.getTotalMultiplierForType(UpgradeType.GasolineConversionValue);
    }

    convertOil() {
        if (this.conversionGasolineGain() <= 0) {
            return;
        }
        const cost = new Currency(this.conversionCost(), CurrencyType.Oil)
        if (!App.game.features.wallet.hasCurrency(cost)) {
            return;
        }

        this.conversionCount++;
        App.game.features.wallet.loseCurrency(cost);
        App.game.features.wallet.gainCurrency(new Currency(this.conversionGasolineGain(), CurrencyType.Gasoline));
    }

    update(delta: number) {
        if (!this.canAccess()) {
            return;
        }

        if (App.game.features.settings.getSetting(SettingId.AutoConvertOil)?.value) {
            // Give the player a small buffer so their oil speedup doesn't run out.
            for (let i = 0; i < 100; i++) {
                const cost = new Currency(this.conversionCost() + this.oilSpeedups[this.selectedOilSpeedup].oilPerSecond, CurrencyType.Oil)
                if (App.game.features.wallet.hasCurrency(cost)) {
                    this.convertOil();
                } else {
                    break;
                }

            }
        }

        const speedMultiplier = (this.oilUpgrades.getUpgrade("gasoline-machine-speed") as DiscreteUpgrade).getBonus();

        // Oil speedups
        const speedup = this.oilSpeedups[this.selectedOilSpeedup];
        let oilSpeedupMultiplier;

        const speedupCost = new Currency(speedup.oilPerSecond * delta, CurrencyType.Oil);
        if (!App.game.features.wallet.hasCurrency(speedupCost)) {
            this.selectedOilSpeedup--;
            oilSpeedupMultiplier = 1
        } else {
            oilSpeedupMultiplier = speedup.speedMultiplier;
            App.game.features.wallet.loseCurrency(speedupCost)
        }

        for (const action of this.actions) {
            action.progress(delta * speedMultiplier * oilSpeedupMultiplier);
        }
    }

    load(data: GasolineSaveData): void {
        // Empty
    }


    canAccess(): boolean {
        return App.game.features.timeLine.canAccessGasoline;
    }

    parseSaveData(json: Record<string, unknown>): GasolineSaveData {
        return new GasolineSaveData();
    }

    save(): GasolineSaveData {
        return new GasolineSaveData();
    }

    reset() {
        for (const upgrade of this.oilUpgrades.list) {
            upgrade.level = 0;
        }
        for (const action of this.actions) {
            action.isStarted = false;
            action.value = 0;
            action.upgrade.level = 0;
        }
        this.conversionCount = 0;

    }
}

