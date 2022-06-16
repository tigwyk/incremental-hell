import {Achievement} from "@/engine/features/achievements/Achievement";
import {ManualRequirement} from "@/engine/tools/requirements/ManualRequirement";
import {AchievementId} from "@/engine/features/achievements/AchievementId";

export class CustomAchievement extends Achievement {

    constructor(key: AchievementId, title: string, description: string, image: string) {
        super(key, title, description, image, new ManualRequirement());
    }

    forceComplete() {
        (this.requirement as ManualRequirement).forceCompletion();
    }
}