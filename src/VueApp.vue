<template>
  <!-- <div :class="{'dark': darkMode}"> -->
    <div class="container">
      <!-- <igt-notifications></igt-notifications> -->
      <!-- <ih-header></ih-header> -->
      <time-line></time-line>
      <div class="column">
        <div class="row">
          <scrap></scrap>
        </div>
      </div>
      <!-- <ih-footer></ih-footer> -->
    </div>
  <!-- </div> -->

</template>

<script>
import {App} from "@/App.ts"
import IgtNotifications from "@/components/util/igt-notifications";
// import IhHeader from "@/components/ih-header";
// import IhFooter from "@/components/ih-footer";
import Scrap from "@/components/features/Scrap";
import TimeLine from "@/components/features/TimeLine"

export default {
  components: {
    // IgtNotifications,
    // IhHeader,
    // IhFooter,
    TimeLine,
    Scrap,
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
