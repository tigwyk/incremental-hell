<template>
  <div>
    <div v-for="setting in settings.list" :key="setting.name">
      <BooleanSetting :setting="setting" :show-description="true"></BooleanSetting>
    </div>
  </div>
</template>

<script>
import {App} from "@/App";
import BooleanSetting from "@/components/BooleanSetting";

export default {
  name: "SettingsComponent",
  components: {BooleanSetting},
  data: function () {
    return {
      settings: App.game.features.settings
    }
  },

}
</script>

<style scoped>

</style>
