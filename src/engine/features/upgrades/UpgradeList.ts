import {Upgrade} from "@/engine/features/upgrades/Upgrade";
import {Saveable} from "@/engine/features/saving/Saveable";
import {UpgradeListSaveData} from "@/engine/features/upgrades/UpgradeListSaveData";
import {UpgradeSaveData} from "@/engine/features/upgrades/UpgradeSaveData";
import {UpgradeType} from "@/engine/features/upgrades/UpgradeType";

export class UpgradeList<GenericUpgrade extends Upgrade, GenericUpgradeSaveData extends UpgradeSaveData> implements Saveable {
    list: GenericUpgrade[];


    constructor(list: GenericUpgrade[]) {
        this.list = list;
    }

    addUpgrade(upgrade: GenericUpgrade): void {
        this.list.push(upgrade)
    }

    getUpgrade(key: string): Upgrade | null {
        for (const upgrade of this.list) {
            if (upgrade.id === key) {
                return upgrade;
            }
        }
        return null;
    }

    getTotalMultiplierForType(type: UpgradeType): number {
        let multiplier = 1;
        for (const upgrade of this.list.filter(upgrade => upgrade.type === type)) {
            multiplier *= upgrade.getBonus(upgrade.level);
        }
        return multiplier;
    }

    saveKey: string = "upgrades";

    load(data: UpgradeListSaveData<GenericUpgradeSaveData>): void {
        for (const upgradeSave of data.upgrades) {
            const upgrade = this.getUpgrade(upgradeSave.key);
            if (upgrade == null) {
                console.warn(`Could not load upgrade ${upgradeSave.key}`);
            } else {
                upgrade.load(upgradeSave);
            }
        }
    }

    parseSaveData(json: Record<string, unknown>): UpgradeListSaveData<GenericUpgradeSaveData> {
        const data = new UpgradeListSaveData<GenericUpgradeSaveData>();
        const list = json?.upgrades as GenericUpgradeSaveData[];
        if (list == null) {
            return data;
        }
        for (const key of list) {
            data.addUpgrade(key);
        }
        return data;
    }

    save(): UpgradeListSaveData<GenericUpgradeSaveData> {
        const data = new UpgradeListSaveData<GenericUpgradeSaveData>();
        for (const upgrade of this.list) {
            data.addUpgrade(upgrade.save() as GenericUpgradeSaveData);
        }
        return data;
    }


}
