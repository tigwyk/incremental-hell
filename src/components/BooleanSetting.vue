<template>
  <span>
    <span v-if="showDescription"> {{ setting.displayName }} </span>
    <input type="checkbox" :checked="setting.value" v-on:change="change">
  </span>


</template>

<script>
import {BooleanSetting} from "@/engine/features/settings/BooleanSetting";
import {App} from "@/App.ts";

export default {
  name: "BooleanSetting",

  props: {
    setting: BooleanSetting,
    showDescription: {
      type: Boolean
    }
  },

  methods: {
    change(event) {
      App.game.settings.setSettingByName(this.setting.name, event.target.checked)
    },
  }
}
</script>

<style scoped>

</style>
