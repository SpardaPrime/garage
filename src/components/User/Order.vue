<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm-3>
        <div v-if="!orders.length">
          <h2>Favorite list is empty</h2>
        </div>
        <div v-else>
          <v-expansion-panels focusable>
            <v-expansion-panel v-for="(item,i) of orders" :key="i">
              <v-expansion-panel-header v-if="item.done" class="green">
                {{item.title}}
                <v-icon>mdi-star</v-icon>
              </v-expansion-panel-header>
              <v-expansion-panel-header v-else>{{item.title}}</v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-checkbox
                  v-model="item.done"
                  :label="`most favorite:${item.done?'Yes':'No'}`"
                  @click="orderDone(item.done,item.id)"
                ></v-checkbox>

                <v-btn :to="'/ad/'+item.adId">Open</v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  computed: {
    orders() {
      return this.$store.getters.orders;
    }
  },
  methods: {
    orderDone(done, id) {
      console.log(done, id);
      let payload = {
        done,
        id
      };
      this.$store.dispatch("markOrederDone", payload);
    }
  },
  created() {
    this.$store.dispatch("fetchOrders");
  }
};
</script>