<template>
<div :class="{'dark': darkMode}">
    <igt-notifications></igt-notifications>
    <igt-sidebar title="Incremental Hell">

      <igt-sidebar-category name="Features"></igt-sidebar-category>
      <igt-tab name="Timeline">
        <time-line></time-line>
      </igt-tab>
      <igt-tab name="Gameplay">
        <div class="container">
      <div class="column">
      <div class="row">
        <lightning-component></lightning-component>
      </div>

      <div class="row">
        <gasoline-component></gasoline-component>
      </div>
      <div class="row">
        <scrap-component></scrap-component>
      </div>
      <div class="row">
        <plutonium-component></plutonium-component>
      </div>
      </div>
      </div>
      </igt-tab>
      <igt-tab name="Settings" :selected="true">
        <igt-settings :settings-feature="game.features.settings"></igt-settings>
        <settings-component></settings-component>
      </igt-tab>

      <igt-sidebar-category name="Other"></igt-sidebar-category>

      <igt-tab name="Developer Panel" v-if="showDevPanel">
        <igt-developer-panel :developer-panel="game.getDeveloperPanel()"></igt-developer-panel>
      </igt-tab>

      <igt-sidebar-category name="Socials"></igt-sidebar-category>
      <igt-sidebar-external-link name="Discord" link="https://discord.gg/rkWnGn4e"
                                 image="socials/discord.png"></igt-sidebar-external-link>
      <igt-sidebar-external-link name="Documentation"
                                 link="https://123ishatest.github.io/igt-docs"
                                 image="socials/docusaurus.svg"></igt-sidebar-external-link>
      <igt-sidebar-external-link name="GitHub" link="https://github.com/123ishaTest/igt-library"
                                 image="socials/github.png"></igt-sidebar-external-link>
    </igt-sidebar>

  </div>


</template>

<script>
import {App} from "@/App"
import IgtSidebar from "@/components/util/sidebar/igt-sidebar-layout";
import IgtTab from "@/components/util/igt-tab";
import IgtNotifications from "@/components/util/igt-notifications";
import IgtDeveloperPanel from "@/components/developer-panel/igt-developer-panel";
import IgtSidebarCategory from "@/components/util/sidebar/igt-sidebar-category";
import IgtSidebarExternalLink from "@/components/util/sidebar/igt-sidebar-external-link";
import IgtSettings from "@/components/features/settings/igt-settings";
import ScrapComponent from "@/components/features/Scrap";
import TimeLine from "@/components/features/TimeLine";
import GasolineComponent from "@/components/features/Gasoline";
import LightningComponent from "@/components/features/Lightning";
import PlutoniumComponent from "@/components/features/Plutonium";
import SettingsComponent from "@/components/Settings";

export default {
  components: {
    IgtSidebarExternalLink,
    IgtSidebarCategory,
    IgtDeveloperPanel,
    IgtNotifications,
    IgtTab,
    IgtSidebar,
    TimeLine,
    ScrapComponent,
    GasolineComponent,
    LightningComponent,
    PlutoniumComponent,
    IgtSettings,
    SettingsComponent,
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
