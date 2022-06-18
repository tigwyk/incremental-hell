import {LightningReward} from "@/engine/features/lightning/LightningReward";


export class Tile {
    isReady: boolean = true;

    regenerateCurrent: number = 0;
    regenerateGoal: number;

    reward: LightningReward;
    nextReward: LightningReward;

    constructor(regenerateGoal: number, reward: LightningReward = LightningReward.Nothing) {
        this.regenerateGoal = regenerateGoal;
        this.reward = reward;
        this.nextReward = LightningReward.Nothing;
    }

    regenerate(delta: number) {
        this.regenerateCurrent += delta;
        if (this.regenerateCurrent > this.regenerateGoal) {
            this.regenerateCurrent = this.regenerateGoal;

            this.respawn();

        }
    }


    get color(): string {
        if (this.isReady) {
            return "saddlebrown";
        }
        return this.reward;
    }

    respawn() {
        this.isReady = true;
        this.reward = this.nextReward;
    }

    setReward(reward: LightningReward) {
        this.nextReward = reward;
    }


    strike(): LightningReward {
        if (!this.isReady) {
            return LightningReward.Nothing;
        }

        this.regenerateCurrent = 0;

        this.isReady = false;

        return this.reward
    }
}
