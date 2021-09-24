<template>
  <div class="item_container" @click="save">Save</div>
  <label for="load"><div class="item_container" @click="load">Load</div></label>
  <input type="file" id="load" @change="load" />
</template>

<style>
#load {
  display: none;
}
</style>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    save() {
      var a = document.createElement("a");
      var save_object = JSON.stringify(this.$parent.$parent.data.contents);
      var file = new Blob([save_object], { type: "text/plain" });
      a.href = URL.createObjectURL(file);
      a.download = "test.json";
      a.click();
    },
    load() {
      var file = document.getElementById("load").files[0];
      const scope_this = this;
      if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function(e) {
          var new_data = JSON.parse(e.target.result);
          //var types = [
          //  "heroes",
          //  "enemies",
          //  "npcs",
          //  "locales",
          //  "events",
          //  "caches",
          //  "groups",
          //];
          //for (var j = 0; j < types.length; j++) {
          //  for (var i = 0; i < new_data[types[j]].length; i++) {
          //    new_data[types[j]][i].marker_img = new Image();
          //    new_data[types[j]][i].marker_img.src =
          //      new_data[types[j]][i].marker;
          //  }
          //}
          scope_this.$parent.$parent.data.contents = new_data;
          scope_this.$parent.$parent.data.controller.initialize();
        };
      }
    },
  },
};
</script>
