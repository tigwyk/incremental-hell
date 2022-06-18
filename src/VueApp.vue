<template>
  <div :class="{'dark': darkMode}">
  <igt-sidebar title="Incremental Hell">

      <igt-sidebar-category name="Features"></igt-sidebar-category>
      <igt-tab name="Timeline" :selected="true">
          <time-line></time-line>
      </igt-tab>
      <igt-tab name="Scrap">
              <scrap-component></scrap-component>
      </igt-tab>
      <igt-tab name="Gasoline">
        <gasoline-component></gasoline-component>
      </igt-tab>
      <igt-tab name="Settings">
        <igt-settings :settings-feature="game.features.settings"></igt-settings>
      </igt-tab>

      <igt-sidebar-category name="Other"></igt-sidebar-category>

      <igt-tab name="Developer Panel" v-if="showDevPanel">
        <igt-developer-panel :developer-panel="game.getDeveloperPanel()"></igt-developer-panel>
      </igt-tab>

      <igt-sidebar-category name="Socials"></igt-sidebar-category>
      <igt-sidebar-external-link name="Discord" link="https://discord.gg/WUYDqct2Ef"
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
import IgtDeveloperPanel from "@/components/developer-panel/igt-developer-panel";
import IgtSidebarCategory from "@/components/util/sidebar/igt-sidebar-category";
import IgtSidebarExternalLink from "@/components/util/sidebar/igt-sidebar-external-link";
import IgtSettings from "@/components/features/settings/igt-settings";
import ScrapComponent from "@/components/features/Scrap";
import TimeLine from "@/components/features/TimeLine";
import GasolineComponent from "@/components/features/Gasoline";

export default {
  components: {
    IgtSettings,
    IgtSidebarExternalLink,
    IgtSidebarCategory,
    IgtDeveloperPanel,
    IgtTab,
    IgtSidebar,
    TimeLine,
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
