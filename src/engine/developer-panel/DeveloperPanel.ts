import {DeveloperPanelTab} from "@/engine/developer-panel/DeveloperPanelTab";

export class DeveloperPanel {
    tabs: DeveloperPanelTab[];

    constructor(tabs: DeveloperPanelTab[]) {
        this.tabs = tabs;
    }
}