<template>
  <Marker :data_="data_" type="locales"/>
  <LocalePreview :data_="data_" />
  <div class="item_container" id="open_button" @click="open_map()">
    Open Map
  </div>
  <DeleteButton :data_="data_" type="locales" />
</template>

<style>
#delete_button {
  margin-top: 12px;
  padding-top: 3px;
  padding-bottom: 3px;
}
#open_button {
  margin-top: 12px;
  padding-top: 3px;
  padding-bottom: 3px;
}
</style>

<script>
import LocalePreview from "../components/LocalePreview.vue";
import Marker from "../components/Marker.vue"
import DeleteButton from "../components/DeleteButton.vue"

export default {
  components: {
    LocalePreview,
    Marker,
    DeleteButton
  },
  props: {
    data_: Object,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    open_map() {
      this.$parent.$parent.$refs.map.locale_selected = this.data_.id;
    },
  },
};
</script>