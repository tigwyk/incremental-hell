import {SaveData} from "@/engine/tools/saving/SaveData";

export interface WalletSaveData extends SaveData {
    money: number;
    scrap: number;
    gasoline: number;
    oil: number;
}
