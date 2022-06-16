import {ItemId} from "@/engine/features/items/ItemId";
import {ItemType} from "@/engine/features/items/ItemType";
import {Saveable} from "@/engine/tools/saving/Saveable";
import {SaveData} from "@/engine/tools/saving/SaveData";

export abstract class AbstractItem implements Saveable {
    name: string;
    id: ItemId;
    type: ItemType;
    description: string;
    maxStack: number

    protected constructor(name: string, description: string, id: ItemId, type: ItemType, maxStack: number = Infinity) {
        this.name = name;
        this.description = description;
        this.id = id;
        this.type = type;
        this.maxStack = maxStack;
    }

    // Save and load. Only needed if this item store additional data
    saveKey: string = this.id;

    load(data: object): void {
        // Empty
    }

    save(): SaveData {
        return {};
    }
}
