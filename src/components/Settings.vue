<template>
  <div>
    <div v-for="setting in settings.list" :key="setting.name">
      <BooleanSetting :setting="setting"></BooleanSetting>
    </div>
  </div>
</template>

<script>
import {App} from "src/App";
import BooleanSetting from "@/components/BooleanSetting.vue";

export default {
  name: "Settings",
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
