import {AbstractItem} from "@/engine/features/items/AbstractItem";
import {ItemId} from "@/engine/features/items/ItemId";
import {ItemType} from "@/engine/features/items/ItemType";

export class RawFish extends AbstractItem {
    constructor() {
        super('Raw Fish', 'Maybe you can cook it?', ItemId.RawFish, ItemType.Default);
    }
}
