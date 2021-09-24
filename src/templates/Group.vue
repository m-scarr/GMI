<template>
  <Marker :data_="data_" type="groups" />
  <Roster :data_="data_" ref="roster" />
  <MemberSelector :data_="data_" ref="member_selector" />
  <Logs :data_="data_" type="groups" />
  <DeleteButton :data_="data_" type="groups" />
</template>

<style>
#delete_button {
  margin-top: 12px;
  padding-top: 3px;
  padding-bottom: 3px;
}
</style>

<script>
import MemberSelector from "../components/MemberSelector.vue";
import Logs from "../components/Logs.vue";
import Marker from "../components/Marker.vue";
import Roster from "../components/Roster.vue";
import DeleteButton from "../components/DeleteButton.vue";

export default {
  components: {
    MemberSelector,
    Logs,
    Marker,
    Roster,
    DeleteButton,
  },
  props: {
    data_: Object,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
