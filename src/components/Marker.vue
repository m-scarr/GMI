<template>
  <div class="item_container" id="marker_header">
    <div id="marker_header_text">Marker</div>
    <label for="change_marker"
      ><img :src="require('../assets/edit.png')"
    /></label>
    <input
      ref="change_marker_input"
      type="file"
      id="change_marker"
      @change="change_marker"
    />
  </div>
  <div class="item_container" id="marker_container">
    <img id="marker_img" :src="marker_src" />
    <div id="marker_buttons_column">
      <div class="item_container" @click="toggle_visibility">
        {{ showhide_string }} Marker
      </div>
      <div class="item_container" @click="go_to">Go to Marker</div>
      <div class="item_container" @click="place">Place Marker</div>
    </div>
  </div>
</template>

<style>
#marker_label {
  padding-top: 8px;
  padding-bottom: 8px;
}
#marker_header_text {
  width: calc(100% - 32px);
}
#change_marker {
  display: none;
}
#marker_img {
  width: calc(50% + 7px);
  margin-left: -16px;
  image-rendering: optimizeSpeed; /* STOP SMOOTHING, GIVE ME SPEED  */
  image-rendering: -moz-crisp-edges; /* Firefox                        */
  image-rendering: -o-crisp-edges; /* Opera                          */
  image-rendering: -webkit-optimize-contrast; /* Chrome (and eventually Safari) */
  image-rendering: pixelated; /* Chrome */
  image-rendering: optimize-contrast; /* CSS3 Proposed                  */
  -ms-interpolation-mode: nearest-neighbor; /* IE8+                           */
}
#marker_container {
  margin-top: -3px;
  padding-left: -3px;
  padding: 0;
  margin-bottom: 12px;
}
#marker_buttons_column {
  padding: 0;
  height: 100%;
  margin: 0;
}
#marker_buttons_column .item_container {
  height: 43px;
  margin: 0;
  margin-right: -6px;
  width: calc(100% + 16px);
}
</style>

<script>
export default {
  props: {
    data_: Object,
    type: String,
  },
  data() {
    return {
      showhide_string: "",
      marker_src: {},
    };
  },
  mounted() {
    this.marker_src = this.data_.marker;
    if (this.data_.visible) {
      this.showhide_string = "Hide";
    } else {
      this.showhide_string = "Show";
    }
  },
  methods: {
    change_marker() {
      const file = this.$refs.change_marker_input.files[0];
      const reader = new FileReader();
      const scope_this = this;
      reader.addEventListener(
        "load",
        function() {
          var new_obj = new Image();
          new_obj.src = reader.result;
          scope_this.$parent.$parent.$parent.data.controller.update(
            scope_this.type,
            scope_this.data_.id,
            {
              marker_img: new_obj,
              marker: reader.result,
            }
          );
          scope_this.marker_src = reader.result;
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    go_to() {
      if (
        (this.data_.unique && this.type != "native_items") ||
        this.type == "heroes" ||
        this.type == "locales" ||
        this.type == "events" ||
        this.type == "groups"
      ) {
        if (
          (this.data_.group_id == null || this.data_.group_id == -1) &&
          this.data_.locale_id != -1
        ) {
          this.$parent.$parent.$parent.$refs.map.locale_selected = this.data_.locale_id;
          this.$parent.$parent.$parent.$refs.map.go_to(
            this.data_.locale_x,
            this.data_.locale_y
          );
        } else {
          if (
            this.type == "heroes" ||
            this.type == "npcs" ||
            this.type == "enemies"
          ) {
            var group_data = this.$parent.$parent.$parent.data.controller.read(
              "groups",
              this.data_.group_id
            );
            this.$parent.$parent.$parent.$refs.map.locale_selected =
              group_data.locale_id;
            this.$parent.$parent.$parent.$refs.map.go_to(
              group_data.locale_x,
              group_data.locale_y
            );
          }
        }
      }
    },
    place() {
      this.$parent.$parent.$parent.$refs.map.place(this.type, this.data_.id);
    },
    toggle_visibility() {
      this.$parent.$parent.$parent.data.controller.update(
        this.type,
        this.data_.id,
        {
          visible: !this.data_.visible,
        }
      );
      if (this.data_.visible) {
        this.showhide_string = "Hide";
      } else {
        this.showhide_string = "Show";
      }
    },
  },
};
</script>
