<template>
  <button @click="start" class="btn scrap" data-progress-style="fill-back" :disabled="action.isStarted">
    {{ action.description }}
    (+{{ this.action.scrapReward() }})
    <div class="progress">
      <div class="progress-bar" role="progressbar" :aria-valuenow="action.percentage * 100"
           :style="{'width': action.percentage * 100 + '%'}" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
  </button>


</template>

<script>
import {ScrapAction} from "@/engine/features/scrap/ScrapAction";

export default {
  name: "ScrapAction",
  props: {
    action: {
      type: ScrapAction,
      required: true
    }
  },

  methods: {
    start() {
      this.action.start();
    }
  },


}
</script>

<style scoped>
.scrap {
  background-color: saddlebrown;
  color: #e8e8e8;
  margin-left: 5px;
  margin-right: 5px;
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
