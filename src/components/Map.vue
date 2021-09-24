<template>
  <div id="map_container">
    <canvas
      id="map_canvas"
      @mousedown.left="mouse_click"
      @mousemove="mouse_move"
      @touchstart="mouse_click"
      @touchmove="touch_move"
      @mouseup="mouse_up"
      @mouseout="mouse_up"
      @wheel="mouse_wheel"
      @contextmenu="right_click"
    />
  </div>
</template>

<style>
#map_container {
  position: absolute;
  left: 294px;
  top: 4px;
}
#map_canvas {
  border: 1px solid grey;
}
</style>

<script>
export default {
  props: {
    width: Number,
    height: Number,
  },
  data() {
    return {
      canvas_element: null,
      canvas_context: null,
      mouse_x: 0,
      mouse_y: 0,
      touch_x: 0,
      touch_y: 0,
      mouse_prev_x: 0,
      mouse_prev_y: 0,
      touch_prev_x: 0,
      touch_prev_y: 0,
      mouse_down: false,
      map_x: 0,
      map_y: 0,
      zoom_factor: 1,
      dest_x: 0,
      dest_y: 0,
      move_timeout: null,
      moving: false,
      placing: false,
      placing_type: "",
      placing_id: 0,
      locale_selected: 0,
      item_selected: null,
      item_selected_type: "",
      last_item: null,
      last_item_type: "",
    };
  },
  mounted() {
    this.canvas_element = document.getElementById("map_canvas");
    this.canvas_element.width = this.width;
    this.canvas_element.height = this.height;
    this.canvas_context = this.canvas_element.getContext("2d");
    requestAnimationFrame(this.draw);
  },
  methods: {
    draw() {
      this.canvas_context.clearRect(
        0,
        0,
        this.canvas_element.width,
        this.canvas_element.height
      );
      this.canvas_context.beginPath();
      this.canvas_context.rect(
        0,
        0,
        this.canvas_element.width,
        this.canvas_element.height
      );
      this.canvas_context.fillStyle = "black";
      this.canvas_context.fill();
      this.canvas_context.drawImage(
        this.$parent.data.controller.read("locales", this.locale_selected)
          .map_img,
        this.map_x,
        this.map_y,
        this.$parent.data.controller.read("locales", this.locale_selected)
          .map_img.width * this.zoom_factor,
        this.$parent.data.controller.read("locales", this.locale_selected)
          .map_img.height * this.zoom_factor
      );
      for (var i = 0; i < this.$parent.data.contents.heroes.length; i++) {
        if (
          this.$parent.data.contents.heroes[i].visible &&
          this.$parent.data.contents.heroes[i].group_id == -1 &&
          this.$parent.data.contents.heroes[i].locale_id == this.locale_selected
        ) {
          this.canvas_context.imageSmoothingEnabled = false;
          this.canvas_context.drawImage(
            this.$parent.data.contents.heroes[i].marker_img,
            this.map_x +
              this.$parent.data.contents.heroes[i].locale_x * this.zoom_factor -
              32,
            this.map_y +
              this.$parent.data.contents.heroes[i].locale_y * this.zoom_factor -
              64,
            64,
            64
          );
          //console.log(
          //  String(this.mouse_x) +
          //    "|" +
          //    String(this.map_x +
          //    this.$parent.data.contents.heroes[0].locale_x * this.zoom_factor)
          //);
          if (
            this.mouse_x >
              this.map_x +
                this.$parent.data.contents.heroes[i].locale_x *
                  this.zoom_factor -
                32 &&
            this.mouse_x <
              this.map_x +
                this.$parent.data.contents.heroes[i].locale_x *
                  this.zoom_factor +
                32 &&
            this.mouse_y >
              this.map_y +
                this.$parent.data.contents.heroes[i].locale_y *
                  this.zoom_factor -
                64 &&
            this.mouse_y <
              this.map_y +
                this.$parent.data.contents.heroes[i].locale_y * this.zoom_factor
          ) {
            if (!this.item_selected) {
              this.item_selected_type = "heroes";
              this.item_selected = this.$parent.data.contents.heroes[i];
            }
          }
          this.canvas_context.imageSmoothingEnabled = true;
        }
      }
      for (i = 0; i < this.$parent.data.contents.npcs.length; i++) {
        if (
          this.$parent.data.contents.npcs[i].visible &&
          this.$parent.data.contents.npcs[i].unique &&
          this.$parent.data.contents.npcs[i].group_id == -1 &&
          this.$parent.data.contents.npcs[i].locale_id == this.locale_selected
        ) {
          this.canvas_context.imageSmoothingEnabled = false;
          this.canvas_context.drawImage(
            this.$parent.data.contents.npcs[i].marker_img,
            this.map_x +
              this.$parent.data.contents.npcs[i].locale_x * this.zoom_factor -
              32,
            this.map_y +
              this.$parent.data.contents.npcs[i].locale_y * this.zoom_factor -
              64,
            64,
            64
          );
          if (
            this.mouse_x >
              this.map_x +
                this.$parent.data.contents.npcs[i].locale_x * this.zoom_factor -
                32 &&
            this.mouse_x <
              this.map_x +
                this.$parent.data.contents.npcs[i].locale_x * this.zoom_factor +
                32 &&
            this.mouse_y >
              this.map_y +
                this.$parent.data.contents.npcs[i].locale_y * this.zoom_factor -
                64 &&
            this.mouse_y <
              this.map_y +
                this.$parent.data.contents.npcs[i].locale_y * this.zoom_factor
          ) {
            if (!this.item_selected) {
              this.item_selected_type = "npcs";
              this.item_selected = this.$parent.data.contents.npcs[i];
            }
          }
          this.canvas_context.imageSmoothingEnabled = true;
        }
      }
      for (i = 0; i < this.$parent.data.contents.enemies.length; i++) {
        if (
          this.$parent.data.contents.enemies[i].visible &&
          this.$parent.data.contents.enemies[i].unique &&
          this.$parent.data.contents.enemies[i].group_id == -1 &&
          this.$parent.data.contents.enemies[i].locale_id ==
            this.locale_selected
        ) {
          this.canvas_context.imageSmoothingEnabled = false;
          this.canvas_context.drawImage(
            this.$parent.data.contents.enemies[i].marker_img,
            this.map_x +
              this.$parent.data.contents.enemies[i].locale_x *
                this.zoom_factor -
              32,
            this.map_y +
              this.$parent.data.contents.enemies[i].locale_y *
                this.zoom_factor -
              64,
            64,
            64
          );
          if (
            this.mouse_x >
              this.map_x +
                this.$parent.data.contents.enemies[i].locale_x *
                  this.zoom_factor -
                32 &&
            this.mouse_x <
              this.map_x +
                this.$parent.data.contents.enemies[i].locale_x *
                  this.zoom_factor +
                32 &&
            this.mouse_y >
              this.map_y +
                this.$parent.data.contents.enemies[i].locale_y *
                  this.zoom_factor -
                64 &&
            this.mouse_y <
              this.map_y +
                this.$parent.data.contents.enemies[i].locale_y *
                  this.zoom_factor
          ) {
            if (!this.item_selected) {
              this.item_selected_type = "enemies";
              this.item_selected = this.$parent.data.contents.enemies[i];
            }
          }
          this.canvas_context.imageSmoothingEnabled = true;
        }
      }
      for (i = 0; i < this.$parent.data.contents.groups.length; i++) {
        if (
          this.$parent.data.contents.groups[i].visible &&
          this.$parent.data.contents.groups[i].locale_id == this.locale_selected
        ) {
          this.canvas_context.imageSmoothingEnabled = false;
          this.canvas_context.drawImage(
            this.$parent.data.contents.groups[i].marker_img,
            this.map_x +
              this.$parent.data.contents.groups[i].locale_x * this.zoom_factor -
              32,
            this.map_y +
              this.$parent.data.contents.groups[i].locale_y * this.zoom_factor -
              64,
            64,
            64
          );
          if (
            this.mouse_x >
              this.map_x +
                this.$parent.data.contents.groups[i].locale_x *
                  this.zoom_factor -
                32 &&
            this.mouse_x <
              this.map_x +
                this.$parent.data.contents.groups[i].locale_x *
                  this.zoom_factor +
                32 &&
            this.mouse_y >
              this.map_y +
                this.$parent.data.contents.groups[i].locale_y *
                  this.zoom_factor -
                64 &&
            this.mouse_y <
              this.map_y +
                this.$parent.data.contents.groups[i].locale_y * this.zoom_factor
          ) {
            if (!this.item_selected) {
              this.item_selected_type = "groups";
              this.item_selected = this.$parent.data.contents.groups[i];
            }
          }
          this.canvas_context.imageSmoothingEnabled = true;
        }
      }
      for (i = 0; i < this.$parent.data.contents.locales.length; i++) {
        if (
          this.$parent.data.contents.locales[i].visible &&
          this.$parent.data.contents.locales[i].locale_id ==
            this.locale_selected
        ) {
          this.canvas_context.imageSmoothingEnabled = false;
          this.canvas_context.drawImage(
            this.$parent.data.contents.locales[i].marker_img,
            this.map_x +
              this.$parent.data.contents.locales[i].locale_x *
                this.zoom_factor -
              32,
            this.map_y +
              this.$parent.data.contents.locales[i].locale_y *
                this.zoom_factor -
              64,
            64,
            64
          );
          if (
            this.mouse_x >
              this.map_x +
                this.$parent.data.contents.locales[i].locale_x *
                  this.zoom_factor -
                32 &&
            this.mouse_x <
              this.map_x +
                this.$parent.data.contents.locales[i].locale_x *
                  this.zoom_factor +
                32 &&
            this.mouse_y >
              this.map_y +
                this.$parent.data.contents.locales[i].locale_y *
                  this.zoom_factor -
                64 &&
            this.mouse_y <
              this.map_y +
                this.$parent.data.contents.locales[i].locale_y *
                  this.zoom_factor
          ) {
            if (!this.item_selected) {
              this.item_selected_type = "locales";
              this.item_selected = this.$parent.data.contents.locales[i];
            }
          }
          this.canvas_context.imageSmoothingEnabled = true;
        }
      }
      for (i = 0; i < this.$parent.data.contents.events.length; i++) {
        if (
          this.$parent.data.contents.events[i].visible &&
          this.$parent.data.contents.events[i].locale_id == this.locale_selected
        ) {
          this.canvas_context.imageSmoothingEnabled = false;
          this.canvas_context.drawImage(
            this.$parent.data.contents.events[i].marker_img,
            this.map_x +
              this.$parent.data.contents.events[i].locale_x * this.zoom_factor -
              32,
            this.map_y +
              this.$parent.data.contents.events[i].locale_y * this.zoom_factor -
              64,
            64,
            64
          );
          if (
            this.mouse_x >
              this.map_x +
                this.$parent.data.contents.events[i].locale_x *
                  this.zoom_factor -
                32 &&
            this.mouse_x <
              this.map_x +
                this.$parent.data.contents.events[i].locale_x *
                  this.zoom_factor +
                32 &&
            this.mouse_y >
              this.map_y +
                this.$parent.data.contents.events[i].locale_y *
                  this.zoom_factor -
                64 &&
            this.mouse_y <
              this.map_y +
                this.$parent.data.contents.events[i].locale_y * this.zoom_factor
          ) {
            if (!this.item_selected) {
              this.item_selected_type = "events";
              this.item_selected = this.$parent.data.contents.events[i];
            }
          }
          this.canvas_context.imageSmoothingEnabled = true;
        }
      }
      if (
        this.last_item &&
        this.last_item.visible &&
        this.last_item.locale_id == this.locale_selected &&
        (this.last_item.unique ||
          this.last_item_type == "groups" ||
          this.last_item_type == "locales" ||
          this.last_item_type == "events")
      ) {
        this.canvas_context.imageSmoothingEnabled = false;
        this.canvas_context.drawImage(
          this.last_item.marker_img,
          this.map_x + this.last_item.locale_x * this.zoom_factor - 32,
          this.map_y + this.last_item.locale_y * this.zoom_factor - 64,
          64,
          64
        );

        this.canvas_context.imageSmoothingEnabled = true;
      }
      if (
        this.item_selected &&
        this.item_selected.visible &&
        this.item_selected.locale_id == this.locale_selected &&
        (this.item_selected.unique ||
          this.item_selected_type == "groups" ||
          this.item_selected_type == "locales" ||
          this.item_selected_type == "events")
      ) {
        this.canvas_context.imageSmoothingEnabled = false;
        this.canvas_context.drawImage(
          this.item_selected.marker_img,
          this.map_x + this.item_selected.locale_x * this.zoom_factor - 32,
          this.map_y + this.item_selected.locale_y * this.zoom_factor - 64,
          64,
          64
        );
        this.canvas_context.font = "16px Verdana";
        this.canvas_context.textAlign = "center";
        this.canvas_context.strokeStyle = "white";
        this.canvas_context.lineWidth = 3;
        this.canvas_context.strokeText(
          this.item_selected.name,
          this.map_x + this.item_selected.locale_x * this.zoom_factor,
          this.map_y + this.item_selected.locale_y * this.zoom_factor - 72
        );
        this.canvas_context.fillText(
          this.item_selected.name,
          this.map_x + this.item_selected.locale_x * this.zoom_factor,
          this.map_y + this.item_selected.locale_y * this.zoom_factor - 72
        );
        this.canvas_context.textAlign = "start";
        this.canvas_context.imageSmoothingEnabled = true;
      }
      requestAnimationFrame(this.draw);
    },
    place(type, id) {
      this.placing_type = type;
      this.placing_id = id;
      this.placing = true;
    },
    right_click(event) {
      event.preventDefault();
      if (this.placing) {
        this.$parent.data.controller.update(
          this.placing_type,
          this.placing_id,
          {
            locale_x: (this.mouse_x - this.map_x) / this.zoom_factor,
            locale_y: (this.mouse_y - this.map_y) / this.zoom_factor,
            locale_id: this.locale_selected,
          }
        );
        this.placing = false;
      }
    },
    mouse_click() {
      this.mouse_down = true;
      var moving = false;
      if (
        this.item_selected &&
        this.mouse_x >
          this.map_x + this.item_selected.locale_x * this.zoom_factor - 32 &&
        this.mouse_x <
          this.map_x + this.item_selected.locale_x * this.zoom_factor + 32 &&
        this.mouse_y >
          this.map_y + this.item_selected.locale_y * this.zoom_factor - 64 &&
        this.mouse_y <
          this.map_y + this.item_selected.locale_y * this.zoom_factor
      ) {
        this.$parent.$refs.menu.close_item();
        const scope_this = this;
        setTimeout(() => {
          scope_this.$parent.$refs.menu.open(
            scope_this.item_selected_type,
            scope_this.item_selected.id
          );
        }, 1);
        this.go_to(this.item_selected.locale_x, this.item_selected.locale_y);
        moving = true;
      }
      if (!moving) {
        clearTimeout(this.move_timeout);
      }
    },
    mouse_move(e) {
      this.moving = false;
      this.mouse_x = e.offsetX;
      this.mouse_y = e.offsetY;
      if (this.mouse_down == true && !this.moving) {
        this.map_x += this.mouse_x - this.mouse_prev_x;
        this.map_y += this.mouse_y - this.mouse_prev_y;
      }
      if (
        this.item_selected &&
        !(
          this.mouse_x >
            this.map_x + this.item_selected.locale_x * this.zoom_factor - 32 &&
          this.mouse_x <
            this.map_x + this.item_selected.locale_x * this.zoom_factor + 32 &&
          this.mouse_y >
            this.map_y + this.item_selected.locale_y * this.zoom_factor - 64 &&
          this.mouse_y <
            this.map_y + this.item_selected.locale_y * this.zoom_factor
        )
      ) {
        this.last_item = this.item_selected;
        this.last_item_type = this.item_selected_type;
        this.item_selected = null;
      }
      this.mouse_prev_x = this.mouse_x;
      this.mouse_prev_y = this.mouse_y;
    },
    touch_move(e) {
      this.touch_x = e.touches[0].clientX;
      this.touch_y = e.touches[0].clientY;
      if (this.mouse_down == true) {
        this.map_x += this.touch_x - this.touch_prev_x;
        this.map_y += this.touch_y - this.touch_prev_y;
      }
      this.touch_prev_x = this.touch_x;
      this.touch_prev_y = this.touch_y;
    },
    mouse_wheel(e) {
      var wheel = e.deltaY / Math.abs(e.deltaY);
      //var center_x = (this.width / 2 - this.map_x) / this.zoom_factor;
      //var center_y = (this.height / 2 - this.map_y) / this.zoom_factor;
      if (
        ((wheel > 0 && this.zoom_factor > 0.15) ||
          (wheel < 0 && this.zoom_factor < 5)) &&
        !this.moving
      ) {
        this.zoom_factor -= wheel / 7.5;
        this.map_x =
          -((this.width / 2 - this.map_x) / (this.zoom_factor + wheel / 7.5)) *
            this.zoom_factor +
          this.width / 2;
        this.map_y =
          -((this.height / 2 - this.map_y) / (this.zoom_factor + wheel / 7.5)) *
            this.zoom_factor +
          this.height / 2;
      }
    },
    mouse_up() {
      this.mouse_down = false;
    },
    go_to(x, y) {
      this.dest_x = -x * this.zoom_factor + this.width / 2;
      this.dest_y = -y * this.zoom_factor + this.height / 2;
      this.move_loop();
    },
    move_loop() {
      //this.map_x = this.dest_x
      //this.map_y = this.dest_y
      if (this.move_timeout != null) {
        this.moving = false;
        clearTimeout(this.move_timeout);
      }
      if (
        Math.abs(this.dest_x - this.map_x) > 1 &&
        Math.abs(this.dest_y - this.map_y) > 1
      ) {
        var xdir = this.dest_x > this.map_x ? 1 : -1;
        var ydir = this.dest_y > this.map_y ? 1 : -1;
        this.map_x += (Math.abs(this.dest_x - this.map_x) / 20) * xdir;
        this.map_y += (Math.abs(this.dest_y - this.map_y) / 20) * ydir;
        this.moving = true;
        this.move_timeout = setTimeout(() => this.move_loop(), 5);
      } else {
        this.map_x = this.dest_x;
        this.map_y = this.dest_y;
        this.moving = false;
        if (this.move_timeout != null) {
          clearTimeout(this.move_timeout);
        }
      }
    },
  },
};
</script>
