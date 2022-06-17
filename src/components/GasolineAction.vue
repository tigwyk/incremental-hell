<template>
  <button @click="buy" class="btn gasoline" data-progress-style="fill-back" :disabled="!canBuy">
    <p>{{ upgrade.displayName }} +{{ reward.amount }} {{ reward.type }}</p>
    <div class="progress">
      <div class="progress-bar" role="progressbar" :aria-valuenow="action.percentage * 100"
           :style="{'width': action.percentage * 100 + '%'}" aria-valuemin="0" aria-valuemax="100"></div>
    </div>


    <div v-if="upgrade.isMaxLevel()">MAX</div>
    <div v-else>
      <div v-if="upgrade.maxLevel !== 1">
        <currency-component :currency="upgrade.getCost()" :brackets="true">
          <template v-slot:before>
            Upgrade
          </template>
        </currency-component>
        Level {{ upgrade.level }}
      </div>
    </div>
  </button>


</template>

<script>
import {GasolineAction} from "@/engine/features/gasoline/GasolineAction";
import CurrencyComponent from "@/components/Currency";

export default {
  name: "GasolineAction",
  components: {CurrencyComponent},
  props: {
    action: {
      type: GasolineAction,
      required: true
    },
  },
  computed: {
    upgrade() {
      return this.action.upgrade;
    },
    cost() {
      return this.upgrade.getCost();
    },
    reward() {
      return this.action.reward();
    },

    canBuy() {
      return this.upgrade.canBuy();
    }
  },

  methods: {
    buy() {
      this.upgrade.buy();
    }
  },


}
</script>

<style scoped>
.gasoline {
  background-color: #242020;
  color: #e8e8e8;
  margin-right: 10px;
  width: 200px;
  flex-grow: 1;
}

.progress-bar {
  transition: none;
}

.progress {
  margin-bottom: 0;
}
</style>
