<template>
<div class="container">
  <!-- <time-line></time-line> -->
    <div class="column">
      <div class="row">
        <gasoline-component></gasoline-component>
      </div>
      <div class="row">
        <scrap-component></scrap-component>
      </div>
    </div>
</div>
</template>

<script>
import {App} from "@/App"
import ScrapComponent from "@/components/features/Scrap";
// import TimeLine from "@/components/features/TimeLine";
import GasolineComponent from "@/components/features/Gasoline";

export default {
  components: {
    // TimeLine,
    ScrapComponent,
    GasolineComponent,
  },
  data() {
    return {
      game: App.game
    }
  },
  computed: {
    showDevPanel() {
      return !App.inProduction;
    },
    darkMode() {
      return true;
    },
  },
}
</script>

<style>
.column {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-direction: row;
}
</style>
