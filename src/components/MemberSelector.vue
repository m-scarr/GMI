<template>
  <div class="item_container" id="member_selector_header">Member Selector</div>
  <div class="item_container" id="member_selector_menu">
    <div @click="click_heroes" :style="hero_button_style">Heroes</div>
    <div @click="click_npcs" :style="npc_button_style">NPCs</div>
    <div @click="click_enemies" :style="enemy_button_style">Enemies</div>
  </div>
  <div id="member_selector_body">
    <div v-for="member in possible_members" :key="member.id">
      <div
        v-if="
          member.group_id != data_.id &&
            member.name
              .toLowerCase()
              .includes(member_search_string.toLowerCase())
        "
        class="member_name_container"
        @click="click_member(member)"
      >
        {{ member.name }}
      </div>
    </div>
  </div>
  <div class="item_container" id="search_member_container">
    <input
      id="member_searchbar"
      placeholder="Search..."
      autocomplete="off"
      v-model="member_search_string"
    />
  </div>
</template>

<style>
.member_name_container {
  border: 1px solid grey;
  margin: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#search_member_container {
  margin-top: -3px;
  margin-bottom: 16px;
}
#member_searchbar {
  width: 100%;
}
#member_selector_header {
  margin-top: 12px;
  padding-top: 3px;
  padding-bottom: 3px;
}
#member_selector_menu {
  margin-top: -3px;
  padding-top: 3px;
  border-bottom-width: 0;
}
#member_selector_body {
  width: calc(100% - 16px);
  border: 1px solid grey;
  margin-left: 7px;
  margin-top: -2px;
  padding-top: 3px;
  height: 128px;
  border-top-width: 0;
  overflow-y: scroll;
}
#heroes_button {
  top: 0;
  margin: 0;
  margin-top: -4px;
  border-bottom-style: none;
}
#npcs_button {
  top: 0;
  margin: 0;
  margin-top: -3px;
  border-bottom-style: solid;
}
#enemies_button {
  top: 0;
  margin: 0;
  margin-top: -3px;
  border-bottom-style: solid;
}
</style>

<script>
export default {
  components: {},
  props: {
    data_: Object,
  },
  data() {
    return {
      member_type: "npcs",
      member_search_string: "",
      hero_button_style: {
        width: "calc(100% - 6px)",
        margin: "0",
        marginTop: "-4px",
        border: "1px solid grey",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderBottomStyle: "none",
      },
      npc_button_style: {
        width: "calc(100% - 6px)",
        margin: "0",
        marginTop: "-3px",
        border: "1px solid grey",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderBottomStyle: "solid",
      },
      enemy_button_style: {
        width: "calc(100% - 6px)",
        margin: "0",
        marginTop: "-3px",
        border: "1px solid grey",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderBottomStyle: "solid",
      },
      possible_members: [],
    };
  },
  mounted() {
    this.click_heroes();
    console.log(this.data_.id);
  },
  methods: {
    click_member(member) {
      if (member.unique) {
        this.$parent.$parent.$parent.data.controller.update(
          this.member_type,
          member.id,
          {
            group_id: this.data_.id,
          }
        );
      } else {
        var new_group_member = {
          group_id: this.data_.id,
          character_type: this.member_type,
          character_id: member.id,
          quantity: 1,
        };
        this.$parent.$parent.$parent.data.controller.create(
          "group_members",
          new_group_member
        );
      }
      this.update_members();
      this.$parent.$refs.roster.update_members();
    },
    click_heroes() {
      this.hero_button_style.borderBottomStyle = "none";
      this.hero_button_style.marginTop = "-4px";
      this.npc_button_style.borderBottomStyle = "solid";
      this.npc_button_style.marginTop = "-3px";
      this.enemy_button_style.borderBottomStyle = "solid";
      this.enemy_button_style.marginTop = "-3px";
      this.member_type = "heroes";
      this.update_members();
    },
    click_npcs() {
      this.hero_button_style.borderBottomStyle = "solid";
      this.hero_button_style.marginTop = "-3px";
      this.npc_button_style.borderBottomStyle = "none";
      this.npc_button_style.marginTop = "-4px";
      this.enemy_button_style.borderBottomStyle = "solid";
      this.enemy_button_style.marginTop = "-3px";
      this.member_type = "npcs";
      this.update_members();
    },
    click_enemies() {
      this.hero_button_style.borderBottomStyle = "solid";
      this.hero_button_style.marginTop = "-3px";
      this.npc_button_style.borderBottomStyle = "solid";
      this.npc_button_style.marginTop = "-3px";
      this.enemy_button_style.borderBottomStyle = "none";
      this.enemy_button_style.marginTop = "-4px";
      this.member_type = "enemies";
      this.update_members();
    },
    update_members() {
      this.possible_members = [
        ...this.$parent.$parent.$parent.data.contents[this.member_type],
      ];
      for (var i = 0; i < this.possible_members.length; i++) {
        var member_exists = this.$parent.$parent.$parent.data.controller.read_group_member(
          this.data_.id,
          this.member_type,
          this.possible_members[i].id
        );
        if (member_exists) {
          console.log(this.data_.id, member_exists.group_id);
        }
        if (
          (member_exists && this.data_.id == member_exists.group_id) ||
          (this.possible_members[i].unique &&
            this.possible_members[i].group_id == this.data_.id)
        ) {
          console.log(this.possible_members[i]);
          this.possible_members.splice(i, 1);
        }
      }
    },
  },
};
</script>
