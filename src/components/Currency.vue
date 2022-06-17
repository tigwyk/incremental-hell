<template>
  <div>
    <p>
      <slot name="before">
      </slot>

      <span v-if="brackets">(</span>{{ currency.amount }} {{ currencyType }}<span v-if="brackets">)</span>

      <slot name="after">
      </slot>
    </p>
  </div>
</template>

<script>
import {Currency} from "@/engine/features/wallet/Currency";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";

export default {
  name: "CurrencyComponent",

  props: {
    currency: {
      type: Currency,
      required: true,
    },
    brackets: {
      type: Boolean,
      required: false,
    }
  },

  computed: {
    currencyType() {
      return CurrencyType[this.currency.type];
    }
  }

}
</script>

<style scoped>

</style>
