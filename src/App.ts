import {Game} from "@/engine/Game";
import {Wallet} from "@/engine/features/wallet/Wallet";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import {Settings} from "@/engine/features/settings/Settings";
import { Statistics } from "@/engine/features/statistics/Statistics";
import { Achievements } from "@/engine/features/achievements/Achievements";
import { Scrap } from "@/engine/features/scrap/Scrap";
import { TimeLine } from "@/engine/features/timeline/TimeLine";
import {Gasoline} from "@/engine/features/gasoline/Gasoline";
import { Lightning } from "@/engine/features/lightning/Lightning";
import { Plutonium } from "@/engine/features/plutonium/Plutonium";

export class App {
    static inProduction: boolean = (process.env.NODE_ENV === "production");

    static game: Game;

    static start(): void {
        this.game = this.getDefaultGame();
        this.game.initialize();
        this.game.load();
        this.game.start();
    }

    public static getDefaultGame(): Game {
        const game = new Game(
            {
                settings: new Settings(),
                wallet: new Wallet([
                    CurrencyType.Money,
                    CurrencyType.Diamond,
                    CurrencyType.Scrap,
                    CurrencyType.Gasoline,
                    CurrencyType.Oil,
                    CurrencyType.Souls,
                    CurrencyType.Plutonium,
                    CurrencyType.Lightning,
                ]),
                statistics: new Statistics(),
                achievements: new Achievements(),
                scrap: new Scrap(),
                timeLine: new TimeLine(),
                gasoline: new Gasoline(),
                lightning: new Lightning(),
                plutonium: new Plutonium(),
            }
        );
        return game;
    }
}
