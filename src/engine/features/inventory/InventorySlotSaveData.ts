import {ItemId} from "@/engine/features/items/ItemId";

export interface InventorySlotSaveData {
    id: ItemId;
    amount: number;
    data: object;
}
