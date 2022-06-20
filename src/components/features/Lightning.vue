<template>
  <div class="container" v-show="canAccess">
    <div class="row container-row">
      <div class="left-column">
        <h3>{{ lightningAmount | twoDigits }} Lightning, {{ boltAmount | twoDigits }} Bolts</h3>

        <button class="btn btn-success" @click="lightning.convertLightning()">Convert {{ conversionCost | twoDigits }}
          Lightning to {{ conversionBoltGain | twoDigits }} Bolts<br>
          <boolean-setting :setting="autoConvertBoltsSetting" :show-description="true"></boolean-setting>
        </button>
        <button v-if="oilAmount > 0" @click="oilConvert" class="btn btn-primary" :disabled="oilAmount < oilGoal">
          Convert 100 oil to 1 gasoline<br>
          You have {{ oilAmount| twoDigits  }} oil.
        </button>

        <div class="legend">
          <div class="row">
            <div class="legend-tile tile" style="cursor: auto"
                 :style="{'background-color': lightningReward.Rods}"></div>
            <h4>Lightning Rod. Your {{ lightning.rods | twoDigits }} rods are generating {{ lightning.rods | twoDigits}}
              Lightning/s
            </h4>
          </div>
          <div class="row">
            <div class="legend-tile tile" style="cursor: auto"
                 :style="{'background-color': lightningReward.RegenTime}"></div>
            <h4>Tile regen time. Tiles are regenerating every {{ lightning.tileRegenTime() | twoDigits  }} seconds</h4>
          </div>
          <div class="row">
          </div>
          <div class="row">
            <div class="legend-tile tile" style="cursor: auto"
                 :style="{'background-color': lightningReward.AutoStrike}"></div>
            <div v-if="lightning.autoStrikes > 0">
              <h4>Auto bolt. {{ lightning.autoStrikeAmount() | twoDigits }} times every
                {{ lightning.autoStrikeTime() / 1000 | twoDigits  }} seconds
                <boolean-setting :setting="autoStrikeSetting" :show-description="false"></boolean-setting>
              </h4>
            </div>
            <h4 v-else>Auto bolt.</h4>
          </div>
          <div class="row">
            <div class="legend-tile tile" style="cursor: auto"
                 :style="{'background-color': lightningReward.ConversionGain}"></div>
            <h4>
              Bolt conversion rate. Currently {{ conversionCost | twoDigits }} Lightning to
              {{ conversionBoltGain | twoDigits  }} Bolts
            </h4>
          </div>
          <div class="row">
            <div class="legend-tile tile" style="cursor: auto" :style="{'background-color': lightningReward.Oil}"></div>
            <h4>Oil. You have {{ oilAmount | twoDigits }}</h4>
          </div>
        </div>


      </div>

      <div class="right-column">
        <h3>Cast your bolts on the ground to find rewards!</h3>
        <div style="display: flex; justify-content: center;">
          <div id="lightning-grid" class="grid">
            <div class="row" v-for="(row, y) in grid" :key="'row-' + y">
              <div
                  :class="{'tile-ready': tile.isReady}"
                  @click="strike(x,y)" @mouseover="strikeHover(x,y)" class="tile" v-for="(tile, x) in row"
                  :key="'tile-'+x+'-'+y"
                  :style="{'background-color': tile.color}">
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>


  </div>
</template>

<script>
import {App} from "@/App";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import BooleanSetting from "@/components/BooleanSetting";
import {LightningReward} from "@/engine/features/lightning/LightningReward";
import {SettingId} from "@/engine/features/settings/SettingId";

export default {

  name: "LightningComponent",
  components: {BooleanSetting},
  data() {
    return {
      lightning: App.game.features.lightning,
      wallet: App.game.features.wallet,
      autoConvertBoltsSetting: App.game.features.settings.getSetting(SettingId.AutoConvertBolts),
      autoStrikeSetting: App.game.features.settings.getSetting(SettingId.AutoStrikeBolts),
      lightningReward: LightningReward,
      mouseDown: false,
    }
  },
  methods: {
    strike(x, y) {
      this.lightning.strike(x, y);
    },
    strikeHover(x, y) {
      if (!this.mouseDown) {
        return;
      }
      this.lightning.strike(x, y);
    },
    oilConvert() {
      this.lightning.oilConvert();
    },
  },

  computed: {
    canAccess() {
      return this.lightning.canAccess();
    },

    upgrades() {
      return this.lightning.upgrades.list;
    },
    grid() {
      return this.lightning.grid.grid;
    },
    lightningAmount() {
      return this.wallet.lightning;
    },
    oilAmount() {
      return this.wallet.oil;
    },
    oilGoal() {
      return App.game.features.timeLine.OIL_GOAL;
    },
    boltAmount() {
      return this.lightning.bolts;
    },
    conversionBoltGain() {
      return this.lightning.conversionBoltGain();
    },
    conversionCost() {
      return this.lightning.conversionCost();
    },
  },
  mounted() {
    document.getElementById("lightning-grid").onmousedown = () => {
      this.mouseDown = true;
    }
    document.getElementById("lightning-grid").onmouseup = () => {
      this.mouseDown = false;
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

.container-row {
  justify-content: space-between;
}

.grid {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-direction: row;
}

.tile {
  width: 25px;
  height: 25px;
  border: 1px solid black;
  cursor: pointer;
}

.legend {
  display: flex;
  flex-direction: column;
}

.legend-tile {
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
}

.right-column {
  justify-content: center;
}
</style>
