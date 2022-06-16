import {Feature} from "@/engine/features/Feature";
import {SaveData} from "@/engine/tools/saving/SaveData";
import {MoneyPouch} from "@/engine/features/items/instances/MoneyPouch";
import {Features} from "@/engine/Features";
import {ItemWithData} from "@/engine/features/items/instances/ItemWithData";
import {EmptyItem} from "@/engine/features/items/instances/EmptyItem";
import {RawFish} from "@/engine/features/items/instances/RawFish";
import {CookedFish} from "@/engine/features/items/instances/CookedFish";

export class ItemList extends Feature {

    _features = undefined as unknown as Features

    constructor() {
        super('item-list');
    }


    initialize(features: Features) {
        super.initialize(features);
        this._features = features;
    }

    get empty(): EmptyItem {
        return new EmptyItem();
    }

    get moneyPouch(): MoneyPouch {
        return new MoneyPouch(this._features.wallet)
    }

    get itemWithData(): ItemWithData {
        return new ItemWithData();
    }

    get rawFish(): RawFish {
        return new RawFish();
    }
    get cookedFish(): CookedFish {
        return new CookedFish();
    }

    load(): void {
        // Empty
    }

    save(): SaveData {
        return {}
    }
}
