<template>
  <div v-show="canAccess">
    <div>
    <div style="display: flex; justify-content: center;">
      <credits-component></credits-component>

    </div>
    </div>
  </div>
</template>

<script>
import {App} from "@/App";
import UpgradeComponent from "@/components/Upgrade";
import CreditsComponent from "@/components/Credits";

export default {

  name: "PlutoniumComponent",
  components: {CreditsComponent},
  data() {
    return {
      plutonium: App.game.features.plutonium
    }
  },
  methods: {

  },

  computed: {
    canAccess() {
      return this.plutonium.canAccess();
    },

    upgrades() {
      return this.plutonium.upgrades.list;
    }
  }
}
</script>

<style scoped>

</style>
