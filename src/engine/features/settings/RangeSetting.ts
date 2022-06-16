import {Setting} from "@/engine/features/settings/Setting";
import {Requirement} from "@/engine/tools/requirements/Requirement";
import {SettingId} from "@/engine/features/settings/SettingId";
import {SettingOption} from "@/engine/features/settings/SettingOption";

/**
 * A setting which allows any floating point value between min and max (both inclusive).
 */
export class RangeSetting extends Setting<number> {
    min: number;
    max: number;

    constructor(id: SettingId, displayName: string, min: number, max: number, defaultValue: number, requirement?: Requirement) {
        // Pass the default value as an option
        super(id, displayName, [new SettingOption<number>("Default", defaultValue)], defaultValue, requirement);

        if (min >= max || max <= min) {
            throw new RangeError(`Invalid range settings (min: ${min}, max: ${max}) for setting ${this.id}`)
        }
        this.min = min;
        this.max = max;

        if (!this.validValue(this.defaultValue)) {
            throw new RangeError(`${this.defaultValue} is not a valid value for setting ${this.id}.`);
        }
    }

    validValue(value: number): boolean {
        return value >= this.min && value <= this.max;
    }
}
