<template>
  <div class="flex flex-row">
    <div class="align-middle m-2">{{ field.displayLabel }}</div>
    <select v-model="fieldValue">
      <option :key="option.value" v-for="option in field.options" v-bind:value="option[1]">
        {{ option[0] }}
      </option>
    </select>
  </div>
</template>

<script>
import {ChoiceField} from "@/engine/developer-panel/fields/ChoiceField";

export default {
  name: "igt-choice-field",

  props: {
    field: {
      type: ChoiceField,
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
