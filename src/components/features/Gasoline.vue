<template>
  <div class="container" v-if="canAccess">

    <h3 style="text-align: center">{{ oilAmount }} Oil, {{ gasolineAmount }} Gasoline</h3>

    <div class="centered-row">
      <div v-if="canConvert" style="">
        <button class="btn btn-success" @click="gasoline.convertOil()">Convert {{ conversionCost }} Oil to
          {{ conversionGasolineGain }} Gasoline<br>
          <boolean-setting :setting="autoConvertOilSetting" :show-description="true"></boolean-setting>
        </button>
      </div>

    </div>

    <br>

    <div class="action-list">
      <gasoline-action v-for="action in availableActions" :key="action.description" :action="action">
      </gasoline-action>
    </div>

    <br>

    <div class="oil-upgrades-list">
      <upgrade-component v-for="upgrade in oilUpgrades" :key="upgrade.identifier" :upgrade="upgrade">
      </upgrade-component>
    </div>

    <br>
    <div v-if="oilSpeedupCount > 1">
      <div class="speedup-list">
        <oil-speedup v-for="(_, index) in oilSpeedupCount" :key="oilSpeedups[index].label"
                     :oil-speedup="oilSpeedups[index]" :index="index">
        </oil-speedup>
      </div>
    </div>


  </div>
</template>

<script>
import {App} from "@/App";
import UpgradeComponent from "@/components/Upgrade";
import GasolineAction from "@/components/GasolineAction";
import BooleanSetting from "@/components/BooleanSetting";
import OilSpeedup from "@/components/OilSpeedup";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import {SettingId} from "@/engine/features/settings/SettingId";

export default {

  name: "GasolineComponent",
  components: {UpgradeComponent, OilSpeedup, BooleanSetting, GasolineAction},
  data() {
    return {
      gasoline: App.game.features.gasoline,
      autoConvertOilSetting: App.game.features.settings.getSetting(SettingId.AutoConvertOil),
      wallet: App.game.features.wallet,
    }
  },
  methods: {},

  computed: {
    canAccess() {
      return this.gasoline.canAccess();
    },

    oilUpgrades() {
      return this.gasoline.oilUpgrades.list;
    },
    availableActions() {
      return this.gasoline.actions.filter(action => action.requirements.isCompleted());
    },
    oilSpeedupCount() {
      return 1 + this.gasoline.oilUpgrades.getUpgrade("gasoline-unlock-oil-speedup").level;
    },
    oilSpeedups() {
      return this.gasoline.oilSpeedups;
    },
    selectedOilSpeedupIndex() {
      return this.gasoline.selectedOilSpeedup;
    },
    conversionCost() {
      return this.gasoline.conversionCost();
    },
    canConvert() {
      return this.gasoline.oilUpgrades.getUpgrade("gasoline-conversion-value").level > 0;
    },
    conversionGasolineGain() {
      return this.gasoline.conversionGasolineGain();
    },
    oilAmount() {
      return this.wallet.currencies[CurrencyType[CurrencyType.Oil]];
    },
    gasolineAmount() {
      return this.wallet.currencies[CurrencyType[CurrencyType.Gasoline]];
    }
  }
}
</script>

<style scoped>
.container {
  border: 1px solid black;
  padding: 20px;
  margin-bottom: 20px;
}

.action-list {
  display: flex;
  flex-wrap: wrap;
}

.oil-upgrades-list {
  display: flex;
  flex-wrap: wrap;
}

.speedup-list {
  display: flex;
  flex-wrap: wrap;
}

.centered-row {
  display: flex;
  justify-content: center;
}
</style>
