<template>
  <div class="text-center">
    <v-dialog v-model="buyModal" width="500" persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="green darken-3" dark text v-bind="attrs" v-on="on">Add to favorite</v-btn>
      </template>

      <v-card>
        <v-card-title mb-2 class="headline mb-3 head blue-grey darken-4">Add to favorite</v-card-title>

        <v-card-text>
          <v-switch v-model="favorite" label="Most favorite" color="orange" hide-details></v-switch>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="primary" text @click="closeBuyModal">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="onBuy">add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog :value="success" max-width="290" persistent>
      <v-card>
        <v-alert type="success" class="head">Car added</v-alert>

        <v-card-text>the car is now on the favorites list</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="successOrder">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog :value="loading" max-width="290" persistent>
      <v-card>
        <v-alert type="info" class="head">Registration</v-alert>

        <v-card-text>
          <v-text-field color="info" loading disabled></v-text-field>loading
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog :value="addedCar" max-width="290" persistent>
      <v-card>
        <v-alert type="info" class="head">Car has added</v-alert>

        <v-card-text>This car have in your favorite list</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="successOrder">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ["adid", "ownId"],
  data() {
    return {
      buyModal: false,
      favorite: false
    };
  },
  methods: {
    successOrder() {
      this.$store.commit("claerAllEventsOrder");
      this.buyModal = false;
    },

    closeBuyModal() {
      this.favorite = false;
      this.buyModal = false;
    },
    onBuy() {
      const { id, title } = this.adid;
      console.log("aidid", this.adid);
      let order = {
        done: this.favorite,
        adId: id,
        ownerId: this.ownId,
        title: title
      };
      const elem = this.orders.find(item => item.adId == id);
      if (elem) {
        this.$store.commit("setAddedCar", true);
      } else {
        this.$store.dispatch("createOrder", order);
      }
    }
  },
  computed: {
    orders() {
      return this.$store.getters.orders;
    },
    success() {
      return this.$store.getters.successOrder;
    },
    loading() {
      return this.$store.getters.loadingOrder;
    },

    addedCar() {
      return this.$store.getters.addedCar;
    }
  },
  watch: {
    buyModal: function() {
      this.$store.dispatch("fetchOrders");
    }
  }
};
</script>