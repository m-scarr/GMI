<template>
  <div class="item_container" id="map_label">Map</div>
  <div class="item_container" id="map_img_container">
    <img id="map_img" :src="map_src" />
  </div>
  <label for="change_map">
    <div class="item_container" id="change_map_container">
      Change Map
      <input
        ref="change_map_input"
        type="file"
        id="change_map"
        @change="change_map"
      />
    </div>
  </label>
</template>

<style>
#map_img_container {
  margin-top: -3px;
  padding-left: -3px;
  margin-bottom: -3px;
  padding: 0;
}
#map_label {
  padding-top: 8px;
  padding-bottom: 8px;
}
#change_map {
  display: none;
}
#map_img {
  width: calc(100%);
}
#change_map_container {
  margin-bottom: 12px;
}
</style>

<script>
export default {
  props: {
    data_: Object,
  },
  data() {
    return {
      map_src: {},
    };
  },
  mounted() {
    this.map_src = this.data_.map;
  },
  methods: {
    change_map() {
      const file = this.$refs.change_map_input.files[0];
      const reader = new FileReader();
      const scope_this = this;
      reader.addEventListener(
        "load",
        function () {
          // convert image file to base64 string
          //preview.src = reader.result;
          var new_obj = new Image();
          new_obj.src = reader.result;
          scope_this.$parent.$parent.$parent.data.controller.update(
            "locales",
            scope_this.data_.id,
            {
              map_img: new_obj,
              map: reader.result,
            }
          );
          scope_this.map_src = reader.result;
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
      //this.$parent.$parent.data_controller.update("heroes", this.data.id, {
      //portrait: { src: file_reader.result },
      //});
    },
  },
};
</script>