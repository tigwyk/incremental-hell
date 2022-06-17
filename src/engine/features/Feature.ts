import {Saveable} from "@/engine/tools/saving/Saveable";
import {SaveData} from "@/engine/tools/saving/SaveData";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import {Features} from "@/engine/Features";
import {AbstractField} from "@/engine/developer-panel/fields/AbstractField";

/**
 * An abstract class that all features should extend for.
 */
export abstract class Feature implements Saveable {

    /**
     * Initialize all feature attributes.
     * Note that you should not assume other features exist already here
     * @param saveKey
     */
    protected constructor(saveKey: string) {
        this.saveKey = saveKey;
    }

    /**
     * Called in dev mode, decides which fields to show in the developer panel.
     */
    getDeveloperPanelFields(): AbstractField[] {
        return []
    }

    /**
     * Called after all features are created.
     * Can be used to subscribe to other features events
     */
    initialize(features: Features): void {
        // This method intentionally left blank
    }

    /**
     * Runs when the game gets started. Can be run multiple times if the player can stop the game
     */
    start(): void {
        // This method intentionally left blank
    }

    /**
     * Runs when the game gets stopped. NOT when the game closes
     */
    stop(): void {
        // This method intentionally left blank
    }

    /**
     * Default false to avoid not implementing the proper restrictions
     */
    canAccess(): boolean {
        return false;
    }

    /**
     * Override in features if specified
     * IMPORTANT: Make sure to always return 1 as the default
     */
    getTotalCurrencyMultiplier(type: CurrencyType) {
        return 1;
    }

    getScrapMultiplier(): number {
        return 1;
    }

    getOilMultiplier(): number {
        return 1;
    }

    getGasolineMultiplier(): number {
        return 1;
    }

    getLightningMultiplier(): number {
        return 1;
    }

    getPlutoniumMultiplier(): number {
        return 1;
    }

    /**
     * Gets called every Game.TICK_DURATION
     * @param delta time since last update
     */
    update(delta: number): void {
        // Override in subclass if needed
    }

    // Saving logic
    saveKey: string;

    abstract load(data: SaveData): void;

    abstract save(): SaveData;


}
