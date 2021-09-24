<template>
  <div class="item_container" id="Group_selector_header">
    <div id="group_name_container">Group: {{ selected_group["name"] }}</div>
    <img :src="edit_src" id="change_group" @click="toggle_modal" />
  </div>
  <div id="drop_container">
    <div v-if="modal_open" class="item_container" id="search_group_container">
      <input
        id="group_searchbar"
        placeholder="Search..."
        autocomplete="off"
        ref="group_searchbar"
        v-model="search_string"
        v-on:input="search_groups"
      />
    </div>
    <div v-if="modal_open" id="search_results">
      <div class="result_container" @click="leave_group()">None</div>
      <div
        class="result_container"
        v-for="group in display_list"
        :key="group.name"
        @click="select_group(group)"
      >
        {{ group.name }}
      </div>
    </div>
  </div>
</template>

<style>
.result_container {
  width: calc(100% - 7px);
  margin: 2px;
  border: 1px solid grey;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#group_name_container {
  white-space: nowrap;
  left: 4px;
  width: calc(100% - 32px);
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
}
#change_group {
  right: 24px;
}
#drop_container {
  position: relative;
  display: block;
  top: -5px;
  z-index: 1;
}
#drop_container div {
  position: absolute;
  z-index: 1;
}
#search_results {
  position: absolute;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 96px;
  width: calc(100% - 16px);
  border-width: 1px;
  border-color: gray;
  border-style: solid;
  margin-left: 7px;
  margin-top: 8px;
  background-color: rgba(200, 200, 200, 0.9);
}
#search_results div {
  position: relative;
  margin-top: -3px;
  background-color: rgba(200, 200, 200, 0);
  padding-top: 3px;
  padding-bottom: 3px;
  color: black;
}
#search_group_container {
  position: absolute;
  margin-top: -3px;
}
#group_searchbar {
  position: absolute;
  width: calc(100% - 6px);
}
#Group_selector_header {
  padding: 8px;
  width: calc(100% - 32px);
  margin-bottom: 12px;
  height: 32px;
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
      modal_open: false,
      selected_group: {},
      display_list: [],
      search_string: "",
      groups: [],
      edit_src: require("../assets/options.png"),
    };
  },
  mounted() {
    this.groups = this.$parent.$parent.$parent.data.contents.groups;
    if (this.data_.group_id != -1) {
      this.selected_group = this.$parent.$parent.$parent.data.controller.read(
        "groups",
        this.data_.group_id
      );
    } else {
      this.selected_group.name = "None";
    }
  },
  methods: {
    toggle_modal() {
      this.modal_open = !this.modal_open;
      this.display_list = this.groups;
      this.search_string = "";
      if (this.modal_open) {
        this.edit_src = require("../assets/up.png");
      } else {
        this.edit_src = require("../assets/options.png");
      }
    },
    search_groups() {
      this.display_list = [];
      for (var i = 0; i < this.groups.length; i++) {
        if (
          this.groups[i].name
            .toLowerCase()
            .includes(this.search_string.toLowerCase())
        ) {
          this.display_list.push(this.groups[i]);
        }
      }
    },
    select_group(data) {
      this.selected_group = data;
      this.toggle_modal();
      this.$parent.$parent.$parent.data.controller.update(
        this.type,
        this.data_.id,
        {
          group_id: this.selected_group.id,
        }
      );
    },
    leave_group() {
      this.selected_group = { name: "None" };
      this.toggle_modal();
      this.$parent.$parent.$parent.data.controller.update(
        this.type,
        this.data_.id,
        {
          group_id: -1,
        }
      );
    },
  },
};
</script>
