<template>
  <div class="item_container" id="roster_header">Roster</div>
  <div id="roster_body">
    <div v-for="member in this.members" :key="member.id">
      <div
        class="roster_name_container_quantity"
        v-if="!member.unique"
      >
        <div class="member_text">{{ member.name }}</div>
        <div class="quantity_div">
          <input
            type="number"
            min="0"
            max="999"
            v-model="member.input_reference"
            @change="quantity_handler(member)"
          />
        </div>
      </div>
      <div class="roster_name_container" v-if="member.unique">
        <div class="member_text">{{ member.name }}</div>
        <div class="img_container">
          <img :src="require('../assets/x.png')" @click="kick_member(member)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.roster_name_container_quantity {
  border: 1px solid grey;
  margin: 2px;
  column-count: 2;
  height: 34px;
}
.roster_name_container {
  border: 1px solid grey;
  margin: 2px;
  padding-bottom: 0;
  column-count: 2;
  height: 34px;
}
.member_text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100% + 80px);
  margin-top: 7px;
}
.roster_name_container .member_text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100% + 80px);
}
.img_container {
  width: 32px;
  margin-top: 16px;
  margin-left: 76px;
}
#roster_header {
  margin-top: 12px;
  padding-top: 3px;
  padding-bottom: 3px;
}
#roster_body {
  width: calc(100% - 16px);
  border: 1px solid grey;
  margin-left: 7px;
  margin-top: -2px;
  padding-top: 3px;
  height: 128px;
  border-top-width: 0;
  overflow-y: scroll;
  overflow-x: hidden;
}
.quantity_div input {
  height: 16px;
  width: 40px;
  text-align: center;
  margin-top: 7px;
}
.quantity_div {
  width: 40px;
  margin-left: 60px;
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
      members: [],
      characters: [],
    };
  },
  mounted() {
    this.update_members();
  },
  methods: {
    kick_member(member) {
      this.$parent.$parent.$parent.data.controller.update(
        member.type,
        member.id,
        { group_id: -1 }
      );
      this.update_members();
      this.$parent.$refs.member_selector.update_members();
    },
    quantity_handler(member) {
      member.quantity = member.input_reference;
      if (member.input_reference > 0) {
        this.$parent.$parent.$parent.data.controller.update(
          "group_members",
          member.member_id,
          { quantity: member.input_reference }
        );
      } else {
        this.$parent.$parent.$parent.data.controller.delete(
          "group_members",
          member.member_id
        );
        for (var i = 0; i < this.members.length; i++) {
          if (this.members[i].member_id == member.member_id) {
            this.members.splice(i, 1);
          }
        }
        this.$parent.$refs.member_selector.update_members();
      }
    },
    update_members() {
      this.characters = []
      this.characters = [...this.$parent.$parent.$parent.data.contents.heroes];

      for (i=0;i<this.characters.length;i++) {
        this.characters[i].type="heroes"
      }
      var npc_array = [...this.$parent.$parent.$parent.data.contents.npcs];
      for (i=0;i<npc_array.length;i++) {
        npc_array[i].type="npcs"
      }
      var enemy_array = [...this.$parent.$parent.$parent.data.contents.enemies];
      for (i=0;i<enemy_array.length;i++) {
        enemy_array[i].type="enemies"
      }
      this.characters = this.characters.concat(npc_array, enemy_array);
      this.members = [];
      for (var i = 0; i < this.characters.length; i++) {
        if (
          this.characters[i].unique &&
          this.characters[i].group_id == this.data_.id
        ) {
          this.members.push(this.characters[i]);
        }
      }
      for (
        i = 0;
        i < this.$parent.$parent.$parent.data.contents.group_members.length;
        i++
      ) {
        var member = this.$parent.$parent.$parent.data.contents.group_members[
          i
        ];
        if (member.group_id == this.data_.id) {
          var member_data = this.$parent.$parent.$parent.data.controller.read(
            member.character_type,
            member.character_id
          );
          member_data.quantity = member.quantity;
          member_data.member_id = member.id;
          this.members.push(member_data);
          this.members[this.members.length - 1].quantity_input = null;
          this.members[this.members.length - 1].input_reference =
            member.quantity;
        }
      }
    },
  },
};
</script>
