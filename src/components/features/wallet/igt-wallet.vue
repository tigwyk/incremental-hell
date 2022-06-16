<template>
  <igt-feature>
    <table>
      <tr>
        <th>Currency</th>
        <th>Amount</th>
        <th>Multiplier</th>
      </tr>
      <tr>
        <td>Money</td>
        <td>{{ money | numberFormat }}</td>
        <td>
          {{ moneyMultiplier | numberFormat }}x
          <button @click="changeMoneyMultiplier(-0.1)">-</button>
          <button @click="changeMoneyMultiplier(0.1)">+</button>
        </td>
      </tr>
      <tr>
        <td>Salt</td>
        <td>{{ secondary | numberFormat }}</td>
        <td>{{ secondaryMultiplier | numberFormat }}x</td>
      </tr>
    </table>

    <button class="btn btn-green" @click="gainMoney(10)">
      Gain 10 Money<br>
      App.game.features.wallet.gainCurrency(new Currency(50, CurrencyType.Money));
    </button>
    <button class="btn btn-green" @click="gainSalt(10)">
      Gain 10 Salt<br>
      App.game.features.wallet.gainCurrency(new Currency(50, CurrencyType.Salt));
    </button>
    <button class="btn btn-green" @click="loseMoney(9)">
      Lose 9 Money (if you have it) <br>
      App.game.features.wallet.payIfPossible(new Currency(50, CurrencyType.Money));
    </button>

    <button class="btn btn-green" :disabled="!hasMoney(50)">
      App.game.features.wallet.hasCurrency(new Currency(50, CurrencyType.Money));
    </button>
  </igt-feature>
</template>

<script>
import {App} from "@/App.ts";
import IgtFeature from "@/components/util/igt-feature";
import {Wallet} from "@/engine/features/wallet/Wallet";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import {Currency} from "@/engine/features/wallet/Currency";

export default {
  name: "igt-wallet",
  components: {IgtFeature},
  data() {
    return {
      wallet: App.game.features.wallet,
    }
  },
  props: {
    walletFeature: {
      type: Wallet,
      required: true
    },
  },
  methods: {
    changeMoneyMultiplier(delta) {
      const oldValue = this.moneyMultiplier;
      this.wallet.setCurrencyMultiplier(oldValue + delta, CurrencyType.Money);
    },
    gainMoney(amount) {
      this.wallet.gainCurrency(new Currency(amount, CurrencyType.Money));
    },
    gainSalt(amount) {
      this.wallet.gainCurrency(new Currency(amount, CurrencyType.Salt));
    },
    loseMoney(amount) {
      this.wallet.payIfPossible(new Currency(amount, CurrencyType.Money));
    },
    hasMoney(amount) {
      return this.wallet.hasCurrency(new Currency(amount, CurrencyType.Money));
    }
    },
  computed: {
    money() {
      return this.wallet._currencies[CurrencyType.Money];
    },
    moneyMultiplier() {
      return this.wallet.getCurrencyMultiplier(CurrencyType.Money);
    },
    secondary() {
      return this.wallet._currencies[CurrencyType.Salt];
    },
    secondaryMultiplier() {
      return this.wallet.getCurrencyMultiplier(CurrencyType.Salt);
    },
  },

  mounted() {
    this.wallet.onCurrencyGain.subscribe(currency => {
      console.log("We gained", currency.amount, currency.type);
    });
  }
}
</script>

<style scoped>

</style>
