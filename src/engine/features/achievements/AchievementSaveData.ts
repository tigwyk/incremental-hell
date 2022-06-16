import {SaveData} from "@/engine/tools/saving/SaveData";
import {AchievementId} from "@/engine/features/achievements/AchievementId";

/**
 * Unlocked achievements are saved as a list of keys
 */
export class AchievementsSaveData implements SaveData {
    list: AchievementId[];

    constructor() {
        this.list = [];
    }

    addAchievement(key: AchievementId): void {
        this.list.push(key);
    }

}