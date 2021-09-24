<template>
  <div class="item_container">
    <div class="text_container" @click="open">
      {{ text }}
    </div>
    <img class="goto" :src="this.goto_src" @click="go_to" />
    <img class="visible" :src="this.visible_src" @click="toggle_visibility" />
  </div>
</template>

<style>
.item_container {
  width: calc(100% - 16px);
  margin: 2px;
  margin-left: 7px;
  border: 1px solid grey;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text_container {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100% - 78px);
  border: 1px solid grey;
  padding: 6px;
}
.goto {
  height: 32px;
}
.visible {
  height: 32px;
}
</style>

<script>
export default {
  props: {
    text: String,
    data: Object,
    type: String,
  },
  data() {
    return {
      visible_src: require("../assets/visible.png"),
      goto_src: require("../assets/goto.png"),
    };
  },
  mounted() {
    if (!this.data.visible) {
      this.visible_src = require("../assets/invisible.png");
    }
    if (
      (this.data.unique != null && this.data.unique == false) ||
      this.type == "native_items"
    ) {
      this.visible_src = require("../assets/visibility_disabled.png");
      this.goto_src = require("../assets/goto_disabled.png");
    }
    if (
      this.data.unique != null &&
      this.data.unique &&
      this.data.group_id != -1
    ) {
      this.visible_src = require("../assets/visibility_disabled.png");
    }
  },
  methods: {
    open() {
      this.$parent.open(this.type, this.data.id);
    },
    go_to() {
      if (
        (this.data.unique && this.type != "native_items") ||
        this.type == "heroes" ||
        this.type == "locales" ||
        this.type == "events" ||
        this.type == "groups"
      ) {
        if (
          (this.data.group_id == null || this.data.group_id == -1) &&
          this.data.locale_id != -1
        ) {
          this.$parent.$parent.$refs.map.locale_selected = this.data.locale_id;
          this.$parent.$parent.$refs.map.go_to(
            this.data.locale_x,
            this.data.locale_y
          );
        } else {
          if (
            this.type == "heroes" ||
            this.type == "npcs" ||
            this.type == "enemies"
          ) {
            var group_data = this.$parent.$parent.data.controller.read(
              "groups",
              this.data.group_id
            );
            this.$parent.$parent.$refs.map.locale_selected =
              group_data.locale_id;
            this.$parent.$parent.$refs.map.go_to(
              group_data.locale_x,
              group_data.locale_y
            );
          }
        }
      }
    },
    toggle_visibility() {
      if (
        (this.data.unique && this.type != "native_items") ||
        this.type == "heroes" ||
        this.type == "locales" ||
        this.type == "events" ||
        this.type == "groups"
      ) {
        if (this.data.group_id == null || this.data.group_id == -1) {
          this.$parent.$parent.data.controller.update(this.type, this.data.id, {
            visible: !this.data.visible,
          });
          if (this.data.visible) {
            this.visible_src = require("../assets/visible.png");
          } else {
            this.visible_src = require("../assets/invisible.png");
          }
        }
      }
    },
  },
};
</script>
