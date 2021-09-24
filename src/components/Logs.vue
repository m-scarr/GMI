<template>
  <div class="item_container" id="logs_header">
    <div id="log_header_text">Logs</div>
    <img :src="require('../assets/edit.png')" @click="toggle_log_entry" />
  </div>
  <div id="logs_container" v-if="!log_entry_open">
    <div v-for="log in logs" :key="log.id">
      <div class="log_container" @click="log.open = !log.open">
        {{ log.created_at }}
      </div>
      <div class="log_container" @click="log.open = !log.open" v-if="log.open">
        {{ log.content }}
      </div>
    </div>
  </div>
  <div v-if="log_entry_open">
    <textarea id="log_input" v-model="log_entry" />
    <div class="item_container" id="add_log_button" @click="add_log">
      Add Log
    </div>
  </div>
</template>

<style>
#log_header_text {
  width: calc(100% - 32px);
}
#add_log_button {
  padding-top: 3px;
  padding-bottom: 3px;
}
#log_input {
  resize: none;
  width: calc(100% - 20px);
  height: 96px;
  overflow-y: scroll;
  margin-top: -2px;
  margin-bottom: -5px;
}
.log_container {
  border-style: solid;
  border-width: 1px;
  border-color: white;
  padding: 3px;
}
#logs_container {
  width: calc(100% - 16px);
  margin: 2px;
  margin-left: 7px;
  border: 1px solid grey;
  height: 128px;
  margin-top: -3px;
  overflow-y: scroll;
}
</style>

<script>
export default {
  props: {
    type: String,
    data_: Object,
  },
  data() {
    return {
      logs: [],
      log_entry_open: false,
      log_entry: "",
    };
  },
  mounted() {
    this.logs = this.$parent.$parent.$parent.data.controller
      .read_logs(this.type, this.data_.id)
      .reverse();
    if (this.logs.length > 0) {
      this.logs[0].open = true;
    }
    for (var i = 1; i < this.logs.length; i++) {
      this.logs[i].open = false;
    }
  },
  methods: {
    toggle_log_entry() {
      this.log_entry_open = !this.log_entry_open;
    },
    add_log() {
      console.log(this.log);
      var currentdate = new Date();
      var hours = 0;
      var minutes = currentdate.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      var AMPM = "";
      if (currentdate.getHours() > 12) {
        hours = currentdate.getHours() - 12;
        AMPM = " PM";
      } else {
        hours = currentdate.getHours();
        AMPM = " AM";
      }
      var datetime =
        hours +
        ":" +
        minutes +
        AMPM +
        ", " +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getDate() +
        "/" +
        currentdate.getFullYear();
      var new_log = {
        owner_type: this.type,
        owner_id: this.data_.id,
        created_at: datetime,
        content: this.log_entry,
      };
      this.log_entry = "";
      console.log(new_log);
      this.$parent.$parent.$parent.data.controller.create("logs", new_log);
      this.logs = this.$parent.$parent.$parent.data.controller.read_logs(
        this.type,
        this.data_.id
      );
      this.logs = this.logs.reverse();
      this.logs[0].open = true;
      for (var i = 1; i < this.logs.length; i++) {
        this.logs[i].open = false;
      }
      this.log_entry_open = false;
      console.log(this.logs);
    },
  },
};
</script>
