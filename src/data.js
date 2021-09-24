import Data from "./data.json";

var object = {
  contents: Data,
  controller: {
    initialize: () => {
      var types = [
        "heroes",
        "enemies",
        "npcs",
        "locales",
        "events",
        "native_items",
        "caches",
        "groups",
      ];
      for (var j = 0; j < types.length; j++) {
        for (var i = 0; i < object.contents[types[j]].length; i++) {
          object.contents[types[j]][i].marker_img = new Image();
          object.contents[types[j]][i].marker_img.src =
            object.contents[types[j]][i].marker;
          if (
            types[j] == "heroes" ||
            types[j] == "enemies" ||
            types[j] == "npcs"
          ) {
            object.contents[types[j]][i].portrait_img = new Image();
            object.contents[types[j]][i].portrait_img.src =
              object.contents[types[j]][i].portrait;
          } else if (types[j] == "locales") {
            object.contents[types[j]][i].map_img = new Image();
            object.contents[types[j]][i].map_img.src =
              object.contents[types[j]][i].map;
          }
        }
      }
    },
    create: (type, data) => {
      var id_ = 0;
      for (var i = 0; i < object.contents[type].length; i++) {
        id_ = Math.max(id_, parseInt(object.contents[type][i].id));
      }
      data.id = id_ + 1;
      object.contents[type].push(data);
      return object.controller.read(type, data.id);
    },
    read: (type, id) => {
      for (var i = 0; i < object.contents[type].length; i++) {
        if (object.contents[type][i].id == id) {
          return object.contents[type][i];
        }
      }
    },
    read_group_member: (group_id, type, id) => {
      for (var i = 0; i < object.contents.group_members.length; i++) {
        if (
          object.contents.group_members[i].character_type == type &&
          object.contents.group_members[i].character_id == id &&
          object.contents.group_members[i].group_id == group_id
        ) {
          return object.contents.group_members[i];
        }
      }
    },
    read_logs: (type, id) => {
      var return_list = [];
      for (var i = 0; i < object.contents.logs.length; i++) {
        if (
          object.contents.logs[i].owner_type == type &&
          object.contents.logs[i].owner_id == id
        ) {
          return_list.push(object.contents.logs[i]);
        }
      }
      return return_list;
    },
    update: (type, id, new_data) => {
      for (var i = 0; i < object.contents[type].length; i++) {
        if (object.contents[type][i].id == id) {
          object.contents[type][i] = Object.assign(
            object.contents[type][i],
            new_data
          );
        }
      }
    },
    delete: (type, id) => {
      for (var i = 0; i < object.contents[type].length; i++) {
        if (object.contents[type][i].id == id) {
          object.contents[type].splice(i, 1);
        }
      }
    },
    delete_group_member: (type, id) => {
      for (var i = 0; i < object.contents.group_members.length; i++) {
        if (
          object.contents.group_members[i].character_type == type &&
          object.contents.group_members[i].character_id == id
        ) {
          object.contents.group_members.splice(i, 1);
        }
      }
    },
  },
};
export default object;
