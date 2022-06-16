import {Wallet} from "@/engine/features/wallet/Wallet";
import {Settings} from "@/engine/features/settings/Settings";
import {Statistics} from "@/engine/features/statistics/Statistics";
import {Achievements} from "@/engine/features/achievements/Achievements";
import {Inventory} from "@/engine/features/inventory/Inventory";
import {ItemList} from "@/engine/features/items/ItemList";
import { Scrap } from "@/engine/features/scrap/Scrap";
import { TimeLine } from "@/engine/features/timeline/TimeLine";

export interface Features {
    wallet: Wallet;
    settings: Settings;
    statistics: Statistics;
    achievements: Achievements;
    inventory: Inventory;
    itemList: ItemList;
    scrap: Scrap;
    timeLine: TimeLine;
}
