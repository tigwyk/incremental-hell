<template>
  <div class="flex flex-row">
    <span class="align-middle m-4">{{ field.displayLabel }}</span>
    <label>
      <input class="input-primary w-32" v-model.number="fieldValue" type="number">
    </label>
  </div>
</template>

<script>
import {NumberField} from "@/engine/developer-panel/fields/NumberField";

export default {
  name: "igt-number-field",

  props: {
    field: {
      type: NumberField,
      required: true,
    }
  },
  data() {
    return {
      fieldValue: this.field.value
    }
  }

}
</script>

<style scoped>

</style>
