import {Requirement} from "@/engine/tools/requirements/Requirement";
import {NoRequirement} from "@/engine/tools/requirements/NoRequirement";

export class Outcome<T> {
    public item: T;
    public weight: number;
    public requirement: Requirement

    constructor(item: T, weight: number, requirement: Requirement = new NoRequirement()) {
        this.item = item;
        this.weight = weight;
        this.requirement = requirement;
    }

    canGet(): boolean {
        return this.requirement.isCompleted;
    }
}