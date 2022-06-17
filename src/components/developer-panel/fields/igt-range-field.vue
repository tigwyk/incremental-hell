<template>
  <div class="flex flex-row">
    <div class="align-middle m-2">{{ field.displayLabel }} - {{ field.value }}</div>
    <input type="range" class="input-range" :value="value" @input="$emit('input', $event.target.value)"/>
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

}
</script>

<style scoped>

</style>
