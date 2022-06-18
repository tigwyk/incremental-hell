import {Feature} from "@/engine/features/Feature";
import {App} from "@/App";
import {TimeLineState} from "@/engine/features/timeline/TimeLineState";
import {UpgradeList} from "@/engine/features/upgrades/UpgradeList";
import {Upgrade} from "@/engine/features/upgrades/Upgrade";
import {UpgradeSaveData} from "@/engine/features/upgrades/UpgradeSaveData";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import {Currency} from "@/engine/features/wallet/Currency";
import {PlutoniumSaveData} from "@/engine/features/plutonium/PlutoniumSaveData";

export class Plutonium extends Feature {
    name: string = "Plutonium";
    saveKey: string = "plutonium";

    upgrades: UpgradeList<Upgrade, UpgradeSaveData>;

    nextPlutoniumGain: number;

    constructor() {
        super("plutonium");
        this.upgrades = new UpgradeList<Upgrade, UpgradeSaveData>(
            []
        );


        this.nextPlutoniumGain = Date.now();
    }

    update(delta: number) {
        if (!this.canAccess()) {
            return;
        }
        if (Date.now() > this.nextPlutoniumGain) {
            App.game.features.wallet.gainCurrency(new Currency(1, CurrencyType.Plutonium));
            this.nextPlutoniumGain = Date.now() + 1000;
        }
    }

    load(data: PlutoniumSaveData): void {
        // Empty
    }


    canAccess(): boolean {
        return App.game.features.timeLine.canAccessPlutonium;
    }

    parseSaveData(json: Record<string, unknown>): PlutoniumSaveData {
        return new PlutoniumSaveData();
    }

    save(): PlutoniumSaveData {
        return new PlutoniumSaveData();
    }

    reset() {
        // Empty
    }
}

