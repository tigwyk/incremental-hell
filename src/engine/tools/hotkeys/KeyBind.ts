import {Requirement} from "@/engine/tools/requirements/Requirement";
import {KeyEventType} from "@/engine/tools/hotkeys/KeyEventType";
import {NoRequirement} from "@/engine/tools/requirements/NoRequirement";

export class KeyBind {
    keys: string | string[];
    description: string;
    callback: Function;
    requirement: Requirement;
    eventType: KeyEventType;

    /**
     * @param keys Can be any string that is accepted by Mousetrap (https://craig.is/killing/mice)
     * @param description
     * @param callback
     * @param requirement
     * @param eventType
     */
    constructor(keys: string | string[], description: string, callback: Function, requirement: Requirement = new NoRequirement(), eventType: KeyEventType = KeyEventType.KeyDown) {
        this.keys = keys;
        this.description = description;
        this.callback = callback;
        this.requirement = requirement;
        this.eventType = eventType;
    }
}
