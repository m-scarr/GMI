<template>
  <Portrait :data_="data_" type="heroes" />
  <GroupSelector :data_="data_" type="heroes" />
  <Marker :data_="data_" type="heroes" />
  <Logs :data_="data_" type="heroes" />
  <DeleteButton :data_="data_" type="heroes" />
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
import DeleteButton from "../components/DeleteButton.vue";

export default {
  components: {
    Marker,
    Portrait,
    GroupSelector,
    Logs,
    DeleteButton
  },
  props: {
    data_: Object,
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {},
};
</script>