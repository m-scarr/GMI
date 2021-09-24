<template>
  <Portrait :data_="data_" type="enemies" />
  <UniqueButton :data_="data_" type="enemies" />
  <GroupSelector :data_="data_" type="enemies" v-if="unique"/>
  <Marker :data_="data_" type="enemies" v-if="unique"/>
  <Logs :data_="data_" type="enemies" v-if="unique"/>
  <DeleteButton :data_="data_" type="enemies" />
</template>

<style>
#delete_button {
  margin-top: 12px;
  padding-top: 3px;
  padding-bottom: 3px;
}
</style>

<script>
import Portrait from "../components/Portrait.vue";
import Marker from "../components/Marker.vue";
import GroupSelector from "../components/GroupSelector.vue";
import Logs from "../components/Logs.vue";
import UniqueButton from "../components/UniqueButton.vue";
import DeleteButton from "../components/DeleteButton.vue"

export default {
  components: {
    Marker,
    Portrait,
    GroupSelector,
    Logs,
    UniqueButton,
    DeleteButton
  },
  props: {
    data_: Object,
  },
  data() {
    return {
      unique: false
    };
  },
  mounted() {
    this.unique = this.$parent.$parent.data.controller.read("enemies", this.data_.id).unique
  },
  methods: {},
};
</script>