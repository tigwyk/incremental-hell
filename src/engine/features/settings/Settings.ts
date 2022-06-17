import {Feature} from "@/engine/features/Feature";
import {SettingsSaveData} from "@/engine/features/settings/SettingsSaveData";
import {Setting} from "@/engine/features/settings/Setting";
import {SettingId} from "@/engine/features/settings/SettingId";
import {AbstractField} from "@/engine/developer-panel/fields/AbstractField";
import {FunctionField} from "@/engine/developer-panel/fields/FunctionField";
import {BooleanSetting} from "@/engine/features/settings/BooleanSetting";

export class Settings extends Feature {
    list: Setting<any>[];

    constructor() {
        super("settings");
        this.list = [];
    }

    add(setting: Setting<any>) {
        if (!this.getSetting(setting.id)) {
            this.list.push(setting);
        }
    }

    initialize() {
        this.add(new BooleanSetting(SettingId.ShowSaveMessage, "Show save message", true));
        this.add(new BooleanSetting(SettingId.AutoConvertOil, 'Automate', false));
    }

    setSetting<T>(id: SettingId, value: T) {
        const setting = this.getSetting(id);
        if (setting) {
            setting.set(value);
        } else {
            console.warn(`Setting ${id} does not exist`);
        }

    }

    getSetting<T>(id: SettingId): Setting<T> | null {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].id == id) {
                return this.list[i];
            }
        }
        console.warn(`Setting ${id} does not exist`);
        return null;
    }


    load(data: SettingsSaveData): void {
        for (const settingSave of data.list) {
            this.getSetting(settingSave.id)?.set(settingSave.value);
        }
    }

    save(): SettingsSaveData {

        return {
            list: this.list.map(setting => {
                return {
                    id: setting.id,
                    value: setting.value
                }
            })
        }

    }

    getDeveloperPanelFields(): AbstractField[] {
        return [
            new FunctionField(() => {
                alert('test')
            }, 'Test'),
        ]
    }

}
