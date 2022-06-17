<template>
  <button @click="select(index)" class="btn" :class="{'btn-primary': isSelected}">
    {{ oilSpeedup.label }}
    <br>
    <span v-show="oilSpeedup.oilPerSecond > 0">
      {{ -oilSpeedup.oilPerSecond }} oil/s
    </span>
  </button>
</template>

<script>
import {OilSpeedup} from "@/engine/features/gasoline/OilSpeedup";
import {App} from "@/App.ts";

export default {
  name: "OilSpeedup",

  data() {
    return {}
  },
  props: {
    oilSpeedup: {
      type: OilSpeedup,
      required: true,
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    select(index) {
      App.game.gasoline.selectedOilSpeedup = index;
    }
  },
  computed: {
    isSelected() {
      return this.index === App.game.gasoline.selectedOilSpeedup;
    }
  }
}
</script>

<style scoped>

</style>
