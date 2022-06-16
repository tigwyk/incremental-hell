import {Setting} from "@/engine/features/settings/Setting";
import {SettingId} from "@/engine/features/settings/SettingId";
import {Requirement} from "@/engine/tools/requirements/Requirement";
import {SettingOption} from "@/engine/features/settings/SettingOption";

/**
 * A setting that can only be on or off.
 * The options can't have requirements but this can be solved by using the correct defaultValue and requirement.
 */
export class BooleanSetting extends Setting<boolean> {

    constructor(id: SettingId, displayName: string, defaultValue: boolean, requirement?: Requirement) {
        super(id, displayName, [
            new SettingOption<boolean>("On", true),
            new SettingOption<boolean>("Off", false)
        ], defaultValue, requirement);
    }

    public toggle(): void {
        this.value = !this.value;
    }
}
