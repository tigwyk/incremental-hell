<template>
  <div>
    <br>
    <div class="vefs-milestone-wrapper">
      <div class="milestone-container">

        <div class="chart-container">
          <div class="line-container">
            <div class="line"></div>
            <div class="line left" :style="{'width': percentage * 100 + '%'}"></div>
          </div>

          <div class="dot-container">
            <div class="milestones milestone__0">
              <div class="dot" :class="{'completed': percentage >= 0, 'colored': percentage >= 0}"></div>
            </div>
<!--            <div class="milestones milestone__20">-->
<!--              <div class="dot" :class="{'completed': percentage >= 0.2, 'colored': percentage >= 0.2}"></div>-->
<!--            </div>-->
            <div class="milestones milestone__40">
              <div class="dot" :class="{'completed': percentage >= 0.4, 'colored': percentage >= 0.4}"></div>
            </div>
            <div class="milestones milestone__60">
              <div class="dot" :class="{'completed': percentage >= 0.6, 'colored': percentage >= 0.6}"></div>
            </div>
            <div class="milestones milestone__80">
              <div class="dot" :class="{'completed': percentage >= 0.8, 'colored': percentage >= 0.8}"></div>
            </div>
            <div class="milestones milestone__100">
              <div class="dot" :class="{'completed': percentage >= 1, 'colored': percentage >= 1}"></div>
            </div>
          </div>
        </div>

        <div class="label-container">
          <div class="milestones milestone__0">
            <div class="label colored">{{ timeLine.state >= timeLineState.FluxCapacitor ? 'Flux Capacitor' : '???' }}
            </div>
          </div>
<!--          <div class="milestones milestone__20">-->
<!--            <div class="label colored">{{ timeLine.state >= timeLineState.Plutonium ? 'Plutonium' : '???' }}</div>-->
<!--          </div>-->
          <div class="milestones milestone__40">
            <div class="label colored">{{ timeLine.state >= timeLineState.Lightning ? 'Lightning' : '???' }}</div>
          </div>
          <div class="milestones milestone__60">
            <div class="label colored">{{ timeLine.state >= timeLineState.Gasoline ? 'Gasoline' : '???' }}</div>
          </div>
          <div class="milestones milestone__80">
            <div class="label">{{ timeLine.state >= timeLineState.Scrap ? 'Scrap' : '???' }}</div>
          </div>
          <div class="milestones milestone__100">
            <div class="label">Time Travel</div>
          </div>
        </div>

      </div>
    </div>
    <div style="display: flex; justify-content: center;">
      <button v-if="timeLine.state !== timeLineState.FluxCapacitor"
          class="btn btn-primary" @click="timeTravel" :disabled="!canTimeTravel" style="padding:20px; margin:20px">
        Reach {{ timeLine.SCRAP_GOAL }} Scrap to <span v-if="timeLine.state === timeLineState.Lightning">Complete the game</span>
        <span v-else>Time travel</span>
      </button>
    </div>
  </div>
</template>

<script>
import {App} from "@/App";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import {TimeLineState} from "@/engine/features/timeline/TimeLineState";

export default {

  name: "TimeLine",
  data() {
    return {
      timeLine: App.game.features.timeLine,
      wallet: App.game.features.wallet,
      timeLineState: TimeLineState,
    }
  },

  methods: {
    timeTravel() {
      this.timeLine.timeTravel();
    },

    logProgress(current, goal) {
      if (current <= 1)
        return 0;
      return Math.log(current) / Math.log(goal);
    }
  },
  computed: {
    canTimeTravel() {
      return this.timeLine.canTimeTravel();
    },
    percentage() {
      if (this.timeLine.canAccessScrap) {
        return Math.min(1, 0.8 + 0.2 * this.logProgress(App.game.features.wallet.getAmount(CurrencyType.Scrap), this.timeLine.SCRAP_GOAL));
      } 
      return 0;
    }
  }
}
</script>

<style scoped lang="scss">
.progress-before {
  float: left;
}

.progress-after {
  float: right;
}

$milestone-base-color: #cccccc;
$milestone-progress-color: #ffffff;
$milestone-0-color: #ff0000;
$milestone-20-color: #55ff00;
$milestone-40-color: #FDD023;
$milestone-60-color: #242020;
$milestone-80-color: #825700;
$milestone-100-color: #73d2de;


.vefs-milestone-wrapper {
  $component-height: 80px;
  $line-height: 15px;
  $dot-size: $line-height * 2.5;

  .milestone-container {
    display: flex;
    flex-direction: column;
    position: relative;
    height: $component-height;

    .chart-container {
      display: flex;
      flex-flow: column;
      align-items: center;
      flex: 1 75%;

      .line-container {
        position: absolute;
        display: flex;
        align-items: center;
        width: 100%;
        height: $dot-size;

        .line {
          align-self: center;
          position: absolute;
          top: calc($dot-size / 2);
          transform: translateY(-50%);
          order: 1;
          width: 100%;
          height: $line-height;
          background-color: $milestone-base-color;
          background-color: rgba($milestone-base-color, 0.5);

          &.left {
            order: 0;
            background-color: $milestone-progress-color;
          }
        }
      }

      .dot-container {
        position: absolute;
        height: $dot-size;
        width: 100%;

        .dot {
          position: absolute;
          width: $dot-size;
          height: $dot-size;
          border-radius: 50%;
          background-color: $milestone-base-color;
          transform: translateX(-50%);
          transition: all 0.25s ease-out;

          &.completed {
            background-color: $milestone-progress-color;
          }
        }
      }

    }

    .label-container {
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-start;
      flex: 1 50%;

      .label {
        position: relative;
        font-size: 2rem;
        font-weight: 600;
        color: $milestone-base-color;

        &.colored {
          color: $milestone-progress-color;
        }
      }
    }

    .milestones {
      position: absolute;
      transform: translate(-50%, 0);

      @mixin milestone( $mark, $color) {
        &__#{$mark} {
          left: #{$mark + '%'};

          .dot {
            &.colored {
              background-color: rgba($color, 1);
              transition: all 0.25s ease-out;
            }
          }
        }
      }

      &.milestone {
        // generate position and color of each milestone value
        @for $i from 0 to 101 {
          @if $i == 0 {
            @include milestone($i, $milestone-0-color);
          }
          @if $i > 0 and $i <= 20 {
            @include milestone($i, $milestone-20-color);
          }
          @if $i > 20 and $i <= 40 {
            @include milestone($i, $milestone-40-color);
          }
          @if $i > 40 and $i <= 60 {
            @include milestone($i, $milestone-60-color);
          }
          @if $i > 60 and $i <= 80 {
            @include milestone($i, $milestone-80-color);
          }
          @if $i > 80 and $i <= 100 {
            @include milestone($i, $milestone-100-color);
          }
        }
      }
    }
  }
}

</style>
