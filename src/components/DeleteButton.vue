<template>
  <div class="item_container" id="delete_button" @click="this.delete()">
    Delete
  </div>
</template>

<style>
#delete_button {
  height: 32px;
  margin-bottom: 12px;
}
</style>

<script>
export default {
  props: {
    data_: Object,
    type: String,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    delete() {
      this.$parent.$parent.$parent.data.controller.delete(
        this.type,
        this.data_.id
      );
      this.$parent.$parent.close_item()
    },
  },
};
</script>
