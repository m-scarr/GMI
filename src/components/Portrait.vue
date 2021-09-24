<template>
  <div class="item_container" id="portrait_label">Portrait</div>
  <div class="item_container" id="portrait_img_container">
    <img id="portrait_img" :src="portrait_src" />
  </div>
  <label for="change_portrait">
    <div class="item_container" id="change_portrait_container">
      Change Portrait
      <input
        ref="change_portrait_input"
        type="file"
        id="change_portrait"
        @change="change_portrait"
      />
    </div>
  </label>
</template>

<style>
#change_portrait_container {
  margin-bottom: 12px;
}
#portrait_label {
  padding-top: 8px;
  padding-bottom: 8px;
}
#change_portrait {
  display: none;
}
#portrait_img {
  width: calc(100%);
}
#portrait_img_container {
  margin-top: -3px;
  padding-left: -3px;
  margin-bottom: -3px;
  padding: 0;
}
</style>

<script>
export default {
  props: {
    data_: Object,
    type: String
  },
  data() {
    return {
      portrait_src: {},
    };
  },
  mounted() {
    this.portrait_src = this.data_.portrait;
  },
  methods: {
    change_portrait() {
      const file = this.$refs.change_portrait_input.files[0];
      const reader = new FileReader();
      const scope_this = this;
      reader.addEventListener(
        "load",
        function () {
          // convert image file to base64 string
          //preview.src = reader.result;
          var new_obj = new Image();
          new_obj.src = reader.result;
          scope_this.$parent.$parent.$parent.data.controller.update(
            scope_this.type,
            scope_this.data_.id,
            {
              portrait_img: new_obj,
              portrait: reader.result,
            }
          );
          scope_this.portrait_src = reader.result;
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
      //this.$parent.$parent.data_controller.update("heroes", this.data.id, {
      //portrait: { src: file_reader.result },
      //});
    },
  },
};
</script>