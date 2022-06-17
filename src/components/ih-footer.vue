<template>
  <div class="w-full p-4 bg-gray-500 shadow-xl flex flex-col items-center justify-around text-white space-y-4">
    <p>by Tigwyk</p>
    <p>Made with the Incremental Game Template</p>
    <div class="flex flex-row space-x-4 items-center">
    </div>

  </div>
</template>

<script>
import {App} from "@/App.ts"
import {GameState} from "@/engine/GameState";

export default {
  name: "ih-footer",

  methods: {
    resetSave() {
      const confirmed = confirm("Are you sure you want to delete your save? This will not give you any rewards");
      if (!confirmed) {
        return;
      }
      App.game.deleteSave();
      location.reload();
    },
    pauseResume() {
      if (this.isPaused) {
        App.game.resume();
      } else {
        App.game.pause();
      }
    },
  },
  computed: {
    isPaused() {
      return App.game.state === GameState.Paused;
    }
  },
}
</script>

<style scoped>

</style>
