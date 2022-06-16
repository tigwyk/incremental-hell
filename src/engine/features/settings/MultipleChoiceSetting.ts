import {Setting} from "@/engine/features/settings/Setting";
import {SettingId} from "@/engine/features/settings/SettingId";
import {SettingOption} from "@/engine/features/settings/SettingOption";
import {Requirement} from "@/engine/tools/requirements/Requirement";

export class MultipleChoiceSetting<T> extends Setting<T> {

    constructor(id: SettingId, displayName: string, options: SettingOption<T>[], defaultValue: T, requirement?: Requirement) {
        super(id, displayName, options, defaultValue, requirement);

        if (!this.validValue(this.defaultValue)) {
            throw new RangeError(`${this.defaultValue} is not a valid value for setting ${this.id}.`);
        }
    }
}
