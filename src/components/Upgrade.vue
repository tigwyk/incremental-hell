<template>
  <button v-show="show" @click="buy" class="btn btn-primary upgrade" :class="{'disabled': !canBuy}">
    <p> {{ upgrade.displayName }} </p>
    <div v-if="upgrade.isMaxLevel()">MAX</div>
    <div v-else>
      <currency :currency="cost"></currency>
      <div v-if="upgrade.maxLevel !== 1">
        Currently {{ upgrade.getBonus(upgrade.level) | twoDigits }}
        ({{ upgrade.increasing ? '+' : '-' }}{{ Math.abs(upgrade.getUpgradeBonus()) | twoDigits }})
      </div>
    </div>
  </button>
</template>

<script>
import {Upgrade} from "@/engine/features/upgrades/Upgrade";
import CurrencyComponent from "@/components/Currency";
import {App} from "@/App";

export default {
  name: "UpgradeComponent",
  components: {
    'currency': CurrencyComponent
  },
  props: {
    upgrade: {
      type: Upgrade,
      required: true
    },
  },

  methods: {
    buy() {
      this.upgrade.buy();
    }
  },

  computed: {
    show() {
      const statistic = App.game.features.statistics.getCurrencyStatisticThisPrestige(this.cost.type);
      return this.upgrade.level > 0 || statistic.value >= this.cost.amount / 2;
    },
    cost() {
      return this.upgrade.getCost();
    },

    canBuy() {
      return this.upgrade.canBuy();
    }
  }

}
</script>

<style scoped>
.upgrade {
  margin-right: 10px;
  width: 200px;
  flex-grow: 1;
}
</style>
