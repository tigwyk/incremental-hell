import {MultiRequirement} from "@/engine/tools/requirements/MultiRequirement";

export abstract class ProgressBar {
    value: number;
    goal: number;

    isStarted: boolean;
    requirements: MultiRequirement;

    protected constructor(goal: number, requirements: MultiRequirement) {
        this.value = 0;
        this.goal = goal;
        this.isStarted = false;
        this.requirements = requirements;
    }

    public start() {
        if (this.isStarted) {
            console.warn("Cannot start twice");
            return;
        }
        this.isStarted = true;
        this.value = 0;
    }

    public progress(delta: number) {
        if (!this.isStarted) {
            if (this.canRepeat()) {
                this.start();
            }
            return;
        }
        this.value = Math.min(this.goal, this.value + delta);

        if (this.isCompleted) {
            this.complete();
        }
    }

    get percentage() {
        return this.value / this.goal;
    }

    public abstract canRepeat(): boolean;

    public repeat() {
        this.value = 0;
    }

    public get isCompleted() {
        return this.value >= this.goal;
    }

    public complete() {
        this.gainReward();
        if (this.canRepeat()) {
            this.repeat();
        } else {
            this.value = 0;
            this.isStarted = false;
        }

    }

    abstract gainReward(): void;
}
