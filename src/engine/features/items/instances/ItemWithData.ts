import {ItemId} from "@/engine/features/items/ItemId";
import {AbstractItem} from "@/engine/features/items/AbstractItem";
import {ItemType} from "@/engine/features/items/ItemType";

export class ItemWithData extends AbstractItem {
    customData: number;

    constructor(customData: number = 3) {
        super('Item with data', `This custom data is also saved`, ItemId.ItemWithData, ItemType.Default, 1);
        this.customData = customData;
    }

    save(): object {
        return {
            customData: this.customData
        }
    }

    load(data: any) {
        this.customData = data.customData ?? this.customData;
        this.description = `This custom data is also saved. It is now (${this.customData})`;
    }
}
