import {SaveData} from "@/engine/tools/saving/SaveData";
import {SettingId} from "@/engine/features/settings/SettingId";

export interface SettingSaveData extends SaveData {
    id: SettingId;
    value: any;
}

export interface SettingsSaveData extends SaveData {
    list: SettingSaveData[];
}
