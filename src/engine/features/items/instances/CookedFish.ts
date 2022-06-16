import {ItemId} from "@/engine/features/items/ItemId";
import {ItemType} from "@/engine/features/items/ItemType";
import {AbstractConsumable} from "@/engine/features/items/Consumable";

export class CookedFish extends AbstractConsumable {
    constructor() {
        super('Cooked Fish', 'Delicious', ItemId.CookedFish, ItemType.Consumable);
    }

    consumeLabel: string = "Eat";

    canConsume(): boolean {
        return true;
    }

    consume(): void {
        // Empty
    }
}
