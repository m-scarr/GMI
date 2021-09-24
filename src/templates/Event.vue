<template>
  <Marker :data_="data_" type="events" />
  <Logs :data_="data_" type="events" />
  <DeleteButton :data_="data_" type="events" />
</template>

<style>
</style>

<script>
import Marker from "../components/Marker.vue"
import Logs from "../components/Logs.vue"
import DeleteButton from "../components/DeleteButton.vue"

export default {
  components: {
    Marker,
    Logs,
    DeleteButton
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