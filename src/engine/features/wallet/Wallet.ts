import {Currency} from "./Currency";
import {CurrencyType} from "./CurrencyType";

import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import {Feature} from "@/engine/features/Feature";
import {WalletSaveData} from "@/engine/features/wallet/WalletSaveData";
import {AbstractField} from "@/engine/developer-panel/fields/AbstractField";
import {NumberField} from "@/engine/developer-panel/fields/NumberField";
import {FunctionField} from "@/engine/developer-panel/fields/FunctionField";
import {RangeField} from "@/engine/developer-panel/fields/RangeField";


export class Wallet extends Feature {
    private _currencies: Record<CurrencyType, number> = {} as Record<CurrencyType, number>
    private _multipliers: Record<CurrencyType, number> = {} as Record<CurrencyType, number>

    private _onCurrencyGain = new SimpleEventDispatcher<Currency>();

    private readonly _supportedCurrencies: CurrencyType[];

    constructor(supportedCurrencies: CurrencyType[]) {
        super("wallet");

        this._supportedCurrencies = supportedCurrencies;

        // Initialize currencies and multipliers
        for (const type of this._supportedCurrencies) {
            this._currencies[type as CurrencyType] = 0;
            this._multipliers[type as CurrencyType] = 1;
        }
    }

    public resetTemporaryCurrencies() {
        this._currencies[CurrencyType.Wood] = 0;
        this._currencies[CurrencyType.Grain] = 0;
        this._currencies[CurrencyType.Souls] = 0;
        this._currencies[CurrencyType.Bronze] = 0;
        this._currencies[CurrencyType.Silver] = 0;
        this._currencies[CurrencyType.Gold] = 0;
        this._currencies[CurrencyType.Gasoline] = 0;
        this._currencies[CurrencyType.Oil] = 0;
        this._currencies[CurrencyType.Scrap] = 0;
        this._currencies[CurrencyType.Lightning] = 0;
        this._currencies[CurrencyType.Plutonium] = 0;
    }

    public getAmount(type: CurrencyType): number {
        if (!this.supportsCurrencyType(type)) {
            return 0;
        }
        return this._currencies[type];
    }

    /**
     * Gain the specified currency and apply the global multiplier
     */
    public gainCurrency(currency: Currency): void {
        currency.multiply(this.getCurrencyMultiplier(currency.type));

        if (!currency.isValid()) {
            console.warn(`Could not add currency ${currency.toString()}`);
            return;
        }
        if (!this.supportsCurrencyType(currency.type)) {
            console.warn(`Currency not supported ${currency.toString()}`);
            return;
        }

        this._onCurrencyGain.dispatch(currency);
        this._currencies[currency.type] += currency.amount;
    }

    /**
     * Return true if the currency is valid and the player has the specified amount.
     */
    public hasCurrency(currency: Currency): boolean {
        if (!this.supportsCurrencyType(currency.type)) {
            return false;
        }
        return this._currencies[currency.type] >= currency.amount;
    }

    /**
     * Return true if all currencies are valid and the player has the specified amount.
     */
    hasCurrencies(costs: Currency[]) {
        for (const cost of costs) {
            if (!this.hasCurrency(cost)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Remove the currency amount from the specified currency.
     * IMPORTANT: This method does not care if amounts go negative
     * @param currency
     */
    public loseCurrency(currency: Currency): void {
        if (!currency.isValid() || !this.supportsCurrencyType(currency.type)) {
            console.warn(`Could not lose currency ${currency.toString()}`);
            return;
        }
        this._currencies[currency.type] -= currency.amount;
    }

    public loseAll() {
        this._currencies[CurrencyType.Money] = 0;
        this._currencies[CurrencyType.Scrap] = 0;
        this._currencies[CurrencyType.Salt] = 0;
        this._currencies[CurrencyType.Diamond] = 0;
        this._currencies[CurrencyType.Gasoline] = 0;
        this._currencies[CurrencyType.Oil] = 0;
        this._currencies[CurrencyType.Lightning] = 0;
        this._currencies[CurrencyType.Plutonium] = 0;
    }

    public loseMultipleCurrencies(currencies: Currency[]) {
        for (const currency of currencies) {
            this.loseCurrency(currency);
        }
    }

    public payMultipleIfPossible(currencies: Currency[]): boolean {
        if (this.hasCurrencies(currencies)) {
            this.loseMultipleCurrencies(currencies);
            return true;
        }
        return false;
    }

    /**
     * Subtracts the specified currency and returns true if the wallet has enough.
     * Otherwise return false and don't subtract anything
     * @param currency
     * @constructor
     */
    public payIfPossible(currency: Currency): boolean {
        if (this.hasCurrency(currency)) {
            this.loseCurrency(currency);
            return true;
        }
        return false;
    }

    /**
     * Return 1 if the multiplier is not set
     */
    public getCurrencyMultiplier(type: CurrencyType): number {
        return this._multipliers[type] ?? 1;
    }

    public setCurrencyMultiplier(multiplier: number, type: CurrencyType): void {
        if (multiplier <= 0 || isNaN(multiplier) || !this.supportsCurrencyType(type)) {
            return;
        }
        this._multipliers[type] = multiplier;
    }

    public supportsCurrencyType(type: CurrencyType): boolean {
        return this._supportedCurrencies.includes(type);
    }

    public canAccess(): boolean {
        return true;
    }

    public save(): WalletSaveData {
        return {
            money: this._currencies[CurrencyType.Money],
            scrap: this._currencies[CurrencyType.Scrap],
            gasoline: this._currencies[CurrencyType.Gasoline],
            oil: this._currencies[CurrencyType.Oil],
            lightning: this._currencies[CurrencyType.Lightning],
            plutonium: this._currencies[CurrencyType.Plutonium],
        }
    }

    public load(data: WalletSaveData): void {
        this._currencies[CurrencyType.Money] = data.money ?? this._currencies[CurrencyType.Money];
    }

    /**
     * Emitted whenever a currency is gained
     * @private
     */
    public get onCurrencyGain(): ISimpleEvent<Currency> {
        return this._onCurrencyGain.asEvent();
    }

    public get money(): number {
        return this._currencies.Money;
    }

    public set money(value: number) {
        this._currencies.Money = value;
    }

    public get wood(): number {
        return this._currencies.Wood;
    }

    public set wood(value: number) {
        this._currencies.Wood = value;
    }

    public get grain(): number {
        return this._currencies.Grain;
    }

    public set grain(value: number) {
        this._currencies.Grain = value;
    }

    public get souls(): number {
        return this._currencies.Souls;
    }

    public set souls(value: number) {
        this._currencies.Souls = value;
    }

    public get bronze(): number {
        return this._currencies.Bronze;
    }

    public set bronze(value: number) {
        this._currencies.Bronze = value;
    }

    public get silver(): number {
        return this._currencies.Silver;
    }

    public set silver(value: number) {
        this._currencies.Silver = value;
    }

    public get gold(): number {
        return this._currencies.Gold;
    }

    public set gold(value: number) {
        this._currencies.Gold = value;
    }

    public get diamond(): number {
        return this._currencies.Diamonds;
    }

    public set diamond(value: number) {
        this._currencies.Diamonds = value;
    }

    public get scrap(): number {
        return this._currencies.Scrap;
    }

    public set scrap(value: number) {
        this._currencies.Scrap = value;
    }

    public get gasoline(): number {
        return this._currencies.Gasoline;
    }

    public set gasoline(value: number) {
        this._currencies.Gasoline = value;
    }

    public get oil(): number {
        return this._currencies.Oil;
    }

    public set oil(value: number) {
        this._currencies.Oil = value;
    }

    public get lightning(): number {
        return this._currencies.Lightning;
    }

    public set lightning(value: number) {
        this._currencies.Lightning = value;
    }

    public get plutonium(): number {
        return this._currencies.Plutonium;
    }

    public set plutonium(value: number) {
        this._currencies.Plutonium = value;
    }

    getDeveloperPanelFields(): AbstractField[] {
        return [
            new NumberField('money', 'Money'),
            new NumberField('scrap', 'Scrap'),
            new NumberField('gasoline', 'Gasoline'),
            new NumberField('oasoline', 'Oil'),
            new NumberField('souls', 'Souls'),
            new NumberField('lightning', 'Lightning'),
            new NumberField('plutonium', 'Plutonium'),
            new FunctionField(() => {
                this.money = 10
            }, 'Set money to 10').setCssClass('btn-blue'),
            new RangeField('money', 0, 100, 2, 'Money Slider'),
        ]
    }
}
