import {SaveData} from "@/engine/features/saving/SaveData";
import {TimeLineState} from "@/engine/features/timeline/TimeLineState";

export class TimeLineSaveData extends SaveData {
    state: TimeLineState;


    constructor(state: TimeLineState) {
        super();
        this.state = state;
    }
}
