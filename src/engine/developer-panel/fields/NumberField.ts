import {AbstractField} from "@/engine/developer-panel/fields/AbstractField";

export class NumberField extends AbstractField {


    constructor(propertyName: string, label?: string) {
        super(propertyName, label);
        this.setComponentName('igt-number-field');
    }

}