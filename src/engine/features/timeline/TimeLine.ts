import {Feature} from "@/engine/features/Feature";
import {TimeLineState} from "@/engine/features/timeline/TimeLineState";
import {TimeLineSaveData} from "@/engine/features/timeline/TimeLineSaveData";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import {Currency} from "@/engine/features/wallet/Currency";
import {App} from "@/App";
import {StatisticId} from "@/engine/features/statistics/StatisticId";
import {NumberStatistic} from "@/engine/features/statistics/NumberStatistic";


export class TimeLine extends Feature {
    name: string = "Timeline";
    saveKey: string = "timeline";

    state: TimeLineState;

    canAccessScrap: boolean = false;
    canAccessGasoline: boolean = false;
    canAccessLightning: boolean = false;
    canAccessPlutonium: boolean = false;

    public readonly SCRAP_GOAL: number = 10000;
    public readonly GASOLINE_GOAL: number = 10000;
    public readonly OIL_GOAL: number = 100;


    public readonly START_STATE: TimeLineState = TimeLineState.Scrap;

    constructor() {
        super("timeline");
        this.state = this.START_STATE;
    }


    initialize() {
        this.giveStartingCurrency();
    }

    update(delta: number) {
        if (App.game.features.wallet.getAmount(CurrencyType.Scrap) > 0) {
            this.canAccessScrap = true;
        }
    }

    timeTravel() {
        if (!this.canTimeTravel()) {
            return;
        }


        App.game.features.wallet.loseAll();
        App.game.features.scrap.reset();

        // Reset prestige statistics
        (App.game.features.statistics.getStatistic(StatisticId.TotalScrapGainedThisPrestige) as NumberStatistic).value = 0;

        this.canAccessScrap = false;
        this.canAccessGasoline = false;
        this.canAccessLightning = false;
        this.canAccessPlutonium = false;

        this.state = Math.min(TimeLineState.FluxCapacitor, this.state + 1);
        this.giveStartingCurrency();
    }

    canTimeTravel() {
        return App.game.features.wallet.hasCurrency(new Currency(this.SCRAP_GOAL, CurrencyType.Scrap));
    }

    load(data: TimeLineSaveData): void {
        this.state = data.state;
    }

    parseSaveData(json: Record<string, unknown>): TimeLineSaveData {
        return new TimeLineSaveData(json.state as TimeLineState ?? this.START_STATE);
    }

    save(): TimeLineSaveData {
        return new TimeLineSaveData(this.state);
    }

    private giveStartingCurrency() {
        switch (this.state) {
            case TimeLineState.Scrap:
                App.game.features.wallet.gainCurrency(new Currency(1, CurrencyType.Scrap));
                break;
        }
    }
}
