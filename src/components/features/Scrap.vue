<template>
  <div class="container" v-if="canAccess">
    <h3 style="text-align: center">{{ scrapAmount | twoDigits }} Scrap</h3>
    <div class="action-list">
      <scrap-action v-for="action in availableActions" :key="action.description" :action="action">
      </scrap-action>
    </div>
    <br>
    <div class="upgrade-list">
      <upgrade v-for="upgrade in upgrades" :key="upgrade.id" :upgrade="upgrade"></upgrade>
    </div>

  </div>
</template>

<script>
import {App} from "@/App";
import Upgrade from "@/components/Upgrade";
import ScrapAction from "@/components/ScrapAction";

export default {

  name: "Scrap",
  components: {ScrapAction, Upgrade},
  data() {
    return {
      statistic: App.game.features.statistics,
      scrap: App.game.features.scrap,
      wallet: App.game.features.wallet,
    }
  },
  methods: {},

  computed: {
    canAccess() {
      return this.scrap.canAccess();
    },

    upgrades() {
      return this.scrap.upgrades.list;
    },
    availableActions() {
      return this.scrap.actions.filter(action => action.requirements.isCompleted);
    },
    scrapAmount() {
      return this.wallet.scrap;
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
}

.upgrade-list {
  display: flex;
  flex-wrap: wrap;
}

</style>
