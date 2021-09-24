<template>
  <Map
    v-bind:width="this.map_width"
    v-bind:height="this.app_height"
    ref="map"
  />
  <Menu v-bind:height="this.app_height" ref="menu" />
</template>

<script>
import Map from "./components/Map.vue";
import Menu from "./templates/Menu.vue";
import Data from "./data.js";

export default {
  name: "App",
  components: {
    Map,
    Menu,
  },
  data() {
    return {
      data: Data,
      map_width: 0,
      app_height: 0,
    };
  },
  mounted() {
    this.data.controller.initialize();
  },
  created() {
    this.map_width = window.innerWidth - 300;
    this.app_height = window.innerHeight - 10;
  },
  methods: {},
};
</script>

<style>
#app {
  font-family: Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
