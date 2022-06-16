import {AbstractConsumable} from "@/engine/features/items/Consumable";
import {ItemId} from "@/engine/features/items/ItemId";
import {ItemType} from "@/engine/features/items/ItemType";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import {Currency} from "@/engine/features/wallet/Currency";
import {Wallet} from "@/engine/features/wallet/Wallet";

export class MoneyPouch extends AbstractConsumable {
    consumeLabel: string = "Open";
    _wallet: Wallet;

    moneyToGain: number = 10;

    constructor(wallet: Wallet) {
        super('Money Pouch', 'Open for some coins', ItemId.MoneyPouch, ItemType.Consumable);
        this._wallet = wallet;
    }

    canConsume(): boolean {
        return true;
    }

    consume(): void {
        this._wallet.gainCurrency(new Currency(this.moneyToGain, CurrencyType.Diamond));
    }

    consumeMultiple(amount: number) {
        this._wallet.gainCurrency(new Currency(this.moneyToGain * amount, CurrencyType.Diamond));
    }
}
