<template>
  <div class="item_container" id="unique_button">
    <img :src="unique_src" @click="toggle()" />
    <div>Unique</div>
  </div>
</template>

<style>
#unique_button {
  height: 32px;
  margin-bottom: 12px;
}
#unique_button div {
  width: calc(100% - 32px);
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
      unique_src: require("../assets/checkbox_filled.png"),
      unique: true,
    };
  },
  mounted() {
    this.unique = this.$parent.$parent.$parent.data.controller.read(
      this.type,
      this.data_.id
    ).unique;
    if (this.unique) {
      this.unique_src = require("../assets/checkbox_filled.png");
    } else {
      this.unique_src = require("../assets/checkbox_empty.png");
    }
  },
  methods: {
    toggle() {
      this.unique = !this.unique;
      this.$parent.$parent.$parent.data.controller.update(
        this.type,
        this.data_.id,
        { unique: this.unique }
      );
      if (this.unique) {
        this.$parent.$parent.$parent.data.controller.delete_group_member(
          this.type,
          this.data_.id
        );
        this.unique_src = require("../assets/checkbox_filled.png");
      } else {
        this.unique_src = require("../assets/checkbox_empty.png");
        this.$parent.$parent.$parent.data.controller.update(
          this.type,
          this.data_.id,
          { group_id: -1 }
        );
      }
      this.$parent.unique = this.unique;
    },
  },
};
</script>
