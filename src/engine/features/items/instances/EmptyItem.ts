import {AbstractItem} from "@/engine/features/items/AbstractItem";
import {ItemId} from "@/engine/features/items/ItemId";
import {ItemType} from "@/engine/features/items/ItemType";

export class EmptyItem extends AbstractItem {

    constructor() {
        super('Empty', '', ItemId.Empty, ItemType.Empty, 0);
    }
}
