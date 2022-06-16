import {KeyBind} from "@/engine/tools/hotkeys/KeyBind";
import {BooleanRequirement} from "@/engine/tools/requirements/BooleanRequirement";
import {KeyEventType} from "@/engine/tools/hotkeys/KeyEventType";


/**
 * A KeyBind helper class that allows you to pass any arbitrary condition you might have.
 * Your condition should return a boolean.
 */
export class CustomConditionKeyBind extends KeyBind {

    constructor(keys: string | string[], description: string, callback: Function, condition: Function, eventType: KeyEventType = KeyEventType.KeyDown) {
        super(keys, description, callback, new BooleanRequirement("", condition), eventType);
    }
}
