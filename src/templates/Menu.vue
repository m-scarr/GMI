<template>
  <div id="menu_container">
    <img id="file" src="../assets/file.png" @click="click('File')" />
    <img id="hero" src="../assets/hero.png" @click="click('Heroes')" />
    <img id="npc" src="../assets/npc.png" @click="click('NPCs')" />
    <img id="enemy" src="../assets/enemy.png" @click="click('Enemies')" />
    <img id="group" src="../assets/group.png" @click="click('Groups')" />
    <img id="loot" src="../assets/loot.png" @click="click('Loot')" />
    <img id="cache" src="../assets/cache.png" @click="click('Caches')" />
    <img id="locale" src="../assets/locale.png" @click="click('Locales')" />
    <img id="event" src="../assets/event.png" @click="click('Events')" />
    <div :style="type_container_style">{{ type }}</div>
    <div v-if="!item_opened && !file_clicked" id="searchbar_container">
      <input
        id="searchbar"
        v-model="search_string"
        placeholder="Search..."
        v-on:input="search"
        autocomplete="off"
      />
    </div>
    <div v-if="item_opened && !file_clicked" id="item_container">
      <img src="../assets/back.png" @click="close_item" />
      <div id="item_name">
        <input
          id="name_input"
          ref="name_input"
          :value="item_data.name"
          autocomplete="off"
          :disabled="edit_name == false"
        />
      </div>
      <img :src="edit_src" @click="edit_item" />
    </div>
    <div id="menu_contents" v-if="!file_clicked">
      <div v-if="!item_opened && !file_clicked">
        <div v-for="item in display_list" :key="item.name">
          <ItemButton
            :text="item.name"
            :data="this.$parent.data.controller.read(type_lower, item.id)"
            :type="type_lower"
          />
        </div>
        <AddButton :type="type_lower" />
      </div>
      <div v-if="item_opened && item_type == 'heroes' && !file_clicked">
        <Hero :data_="item_data" />
      </div>
      <div v-if="item_opened && item_type == 'npcs' && !file_clicked">
        <NPC :data_="item_data" />
      </div>
      <div v-if="item_opened && item_type == 'enemies' && !file_clicked">
        <Enemy :data_="item_data" />
      </div>
      <div v-if="item_opened && item_type == 'locales' && !file_clicked">
        <Locale :data_="item_data" />
      </div>
      <div v-if="item_opened && item_type == 'groups' && !file_clicked">
        <Group :data_="item_data" />
      </div>
      <div v-if="item_opened && item_type == 'events' && !file_clicked">
        <Event :data_="item_data" />
      </div>
    </div>
    <div v-if="file_clicked">
      <File />
    </div>
  </div>
</template>

<style>
#file {
  background-color: rgb(96, 96, 96)
}
#hero {
  background-color: green;
}
#npc {
  background-color: blue;
}
#enemy {
  background-color: red;
}
#group {
  background-color: rgb(255, 128, 0);
}
#loot {
  background-color: yellow;
}
#cache {
  background-color: rgb(153, 76, 0);
}
#locale {
  background-color: rgb(178, 0, 178);
}
#event {
  background-color: rgb(0, 255, 255);
}
#item_container img {
  height: calc(100% - 2px);
}
#item_container {
  display: flex;
  height: 34px;
}
#item_name {
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 66px);
  height: 32px;
}
#name_input {
  height: 24px;
  width: calc(100% - 12px);
  text-align: center;
  font-weight: bold;
  text-overflow: ellipsis;
}
#name_input:disabled {
  color: white;
  background-color: rgba(1, 1, 1, 0);
  border: none;
}
#menu_container {
  border: 1px solid grey;
  background-color: rgba(32, 32, 32, 1);
  color: white;
  width: 288px;
  position: absolute;
  left: 4px;
  top: 4px;
  height: calc(100% - 10px);
}
#menu_contents {
  overflow-y: scroll;
  height: calc(100% - 110px);
}
#searchbar_container {
  border: 1px solid grey;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#searchbar {
  width: 100%;
  height: 26px;
}
</style>

<script>
import ItemButton from "../components/ItemButton.vue";
import AddButton from "../components/AddButton.vue";
import Hero from "../templates/Hero.vue";
import NPC from "../templates/NPC.vue";
import Enemy from "../templates/Enemy.vue";
import File from "../templates/File.vue";
import Locale from "../templates/Locale.vue";
import Group from "../templates/Group.vue";
import Event from "../templates/Event.vue";

export default {
  name: "Menu",
  components: {
    ItemButton,
    AddButton,
    Hero,
    NPC,
    Enemy,
    File,
    Locale,
    Group,
    Event,
  },
  props: {
    height: Number,
  },
  data() {
    return {
      container: null,
      type: "Heroes",
      type_lower: "heroes",
      search_string: "",
      current_list: this.$parent.data.contents.heroes,
      display_list: this.$parent.data.contents.heroes,
      item_opened: false,
      item_type: "",
      item_data: {},
      edit_src: require("../assets/edit.png"),
      edit_name: false,
      file_clicked: false,
      type_container_style: {
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px",
        backgroundColor: "green",
        marginTop: "-3px",
        textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
      },
    };
  },
  mounted() {},
  methods: {
    search() {
      this.display_list = [];
      for (var i = 0; i < this.current_list.length; i++) {
        if (
          this.current_list[i].name
            .toLowerCase()
            .includes(this.search_string.toLowerCase())
        ) {
          this.display_list.push(this.current_list[i]);
        }
      }
    },
    change_color() {
      if (this.type == "Heroes") {
        this.type_container_style.backgroundColor = "green";
      } else if (this.type == "NPCs") {
        this.type_container_style.backgroundColor = "blue";
      } else if (this.type == "Enemies") {
        this.type_container_style.backgroundColor = "red";
      } else if (this.type == "Groups") {
        this.type_container_style.backgroundColor = "rgb(255, 128, 0)";
      } else if (this.type == "Loot") {
        this.type_container_style.backgroundColor = "yellow";
      } else if (this.type == "Caches") {
        this.type_container_style.backgroundColor = "rgb(153, 76, 0)";
      } else if (this.type == "Locales") {
        this.type_container_style.backgroundColor = "rgb(178, 0, 178)";
      } else if (this.type == "Events") {
        this.type_container_style.backgroundColor = "rgb(0, 255, 255)";
      } else if (this.type == "File") {
        this.type_container_style.backgroundColor = "rgb(96, 96, 96)";
      }
    },
    open(type, id) {
      this.file_clicked = false;
      this.item_data = this.$parent.data.controller.read(type, id);
      this.item_type = type;
      this.item_opened = true;
      this.type_lower = type;
      this.search_string = "";
      if (type == "native_items") {
        this.type = "Loot";
      } else if (type == "npcs") {
        this.type = "NPCs";
      } else {
        this.type = type[0].toUpperCase() + type.substring(1);
      }
      this.change_color();
    },
    close_item() {
      this.item_opened = false;
      this.current_list = this.$parent.data.contents[this.type_lower];
      this.display_list = this.current_list;
    },
    edit_item() {
      if (!this.edit_name) {
        this.edit_src = require("../assets/check.png");
      } else {
        this.edit_src = require("../assets/edit.png");
        this.$parent.data.controller.update(this.item_type, this.item_data.id, {
          name: this.$refs.name_input.value,
        });
      }
      this.edit_name = !this.edit_name;
    },
    click(type) {
      this.type = type;
      this.search_string = "";
      this.item_opened = false;
      this.file_clicked = false;
      if (type == "Loot") {
        this.type_lower = "native_items";
      } else if (type == "NPCs") {
        this.type_lower = "npcs";
      } else if (type == "File") {
        this.file_clicked = true;
      } else {
        this.type_lower = type[0].toLowerCase() + type.substring(1);
      }
      this.change_color();
      this.current_list = this.$parent.data.contents[this.type_lower];
      this.display_list = this.current_list;
    },
  },
};
</script>
