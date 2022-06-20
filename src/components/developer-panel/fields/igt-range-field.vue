<template>
  <div class="flex flex-row">
    <div class="align-middle m-2">{{ field.displayLabel }} - {{ fieldLocal.value }}</div>
    <input type="range" class="input-range" v-model.number="fieldLocal.value"/>
  </div>
</template>

<script>
import {RangeField} from "@/engine/developer-panel/fields/RangeField";

export default {
  name: "igt-range-field",

  props: {
    field: {
      type: RangeField,
      required: true,
    }
  },
  model: {
    prop: 'field',
    event: 'fieldchange'
    },
  computed: {
        fieldLocal: {
            get: function() {
                return this.field
            },
            set: function(value) {
                this.$emit('fieldchange', value)
            }
        }
    }

}
</script>

<style scoped>

</style>
