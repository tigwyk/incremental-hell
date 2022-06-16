import {SaveData} from "@/engine/tools/saving/SaveData";
import {InventorySlotSaveData} from "@/engine/features/inventory/InventorySlotSaveData";

export interface InventorySaveData extends SaveData {
    slots: InventorySlotSaveData[];
}
