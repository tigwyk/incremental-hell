import {Achievement} from "@/engine/features/achievements/Achievement";
import {AchievementId} from "@/engine/features/achievements/AchievementId";
import {Feature} from "@/engine/features/Feature";
import {AchievementsSaveData} from "@/engine/features/achievements/AchievementSaveData";
import {Features} from "@/engine/Features";
import {ArrayStatisticRequirement} from "@/engine/features/statistics/requirements/ArrayStatisticRequirement";
import {StatisticId} from "@/engine/features/statistics/StatisticId";
import {ArrayStatistic} from "@/engine/features/statistics/ArrayStatistic";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import {CustomAchievement} from "@/engine/features/achievements/CustomAchievement";
import {NumberStatisticRequirement} from "@/engine/features/statistics/requirements/NumberStatisticRequirement";
import {NumberStatistic} from "@/engine/features/statistics/NumberStatistic";

export class Achievements extends Feature {
    name: string = "Achievements";
    saveKey: string = 'achievements';

    list: Record<AchievementId, Achievement>

    // Delay between checking for achievements
    private readonly ACHIEVEMENT_CHECK_TIME: number = 2.0;
    private checkCounter: number = 0;

    private _onUnlock = new SimpleEventDispatcher<Achievement>();

    /**
     * Emitted whenever an achievement is unlocked.
     */
    public get onUnlock(): ISimpleEvent<Achievement> {
        return this._onUnlock.asEvent();
    }

    constructor() {
        super('achievements');
        this.list = {} as Record<AchievementId, Achievement>;
    }

    initialize(features: Features): void {
        this.registerAchievement(
            new CustomAchievement(AchievementId.AtLeastOneSuperPower,
                "I wonder what inspired this feature",
                'Go on an Adventure with at least one bonus',
                'cards/hatchet-bronze.svg',
            )
        );
        this.registerAchievement(
            new Achievement(AchievementId.TotalMoney100,
                "It's something",
                'Gain 100 money in total',
                'coins.svg',
                new NumberStatisticRequirement(features.statistics.getStatistic(StatisticId.TotalMoneyGained) as NumberStatistic, 100),
            ),
        );
        this.registerAchievement(
            new Achievement(AchievementId.TotalMoney1000,
                "It's a bit more",
                'Gain 1000 money in total',
                'coins.svg',
                new NumberStatisticRequirement(features.statistics.getStatistic(StatisticId.TotalMoneyGained) as NumberStatistic, 1000),
            ),
        );
        this.registerAchievement(
            new Achievement(AchievementId.TotalMoney10000,
                "This is where the fun begins",
                'Gain 10000 money in total',
                'coins.svg',
                new NumberStatisticRequirement(features.statistics.getStatistic(StatisticId.TotalMoneyGained) as NumberStatistic, 10000),
            ),
        );
    }

    update(delta: number) {
        this.checkCounter += delta;
        if (this.checkCounter >= this.ACHIEVEMENT_CHECK_TIME) {
            this.checkForAchievementsCompleted();
            this.checkCounter = 0;
        }
    }

    public checkForAchievementsCompleted() {
        for (const key in this.list) {
            const achievement = this.list[key as AchievementId];
            if (achievement.requirementsCompleted()) {
                const isJustUnlocked = achievement.unlock();
                if (isJustUnlocked) {
                    this._onUnlock.dispatch(achievement);
                }
            }
        }
    }

    private registerAchievement(achievement: Achievement) {
        this.list[achievement.key] = achievement;
    }

    public getAchievement(key: AchievementId): Achievement | null {
        if (!this.hasAchievement(key)) {
            console.warn(`Could not find achievement with key ${key}`)

            return null;
        } else {
            return this.list[key];
        }
    }

    private hasAchievement(key: AchievementId): boolean {
        return key in this.list
    }


    load(data: AchievementsSaveData): void {
        for (const key of data.list) {
            const achievement = this.getAchievement(key);
            if (achievement !== null) {
                achievement.unlocked = true
            }
        }
    }


    save(): AchievementsSaveData {
        const data = new AchievementsSaveData();
        for (const key in this.list) {
            if (this.list[key as AchievementId].unlocked) {
                data.addAchievement(key as AchievementId);
            }
        }
        return data;
    }

}