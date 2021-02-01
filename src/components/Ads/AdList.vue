<template>
  <v-container grid-list-lg>
    <div v-if="loadHomePage"></div>
    <div v-else-if="!myAds.length">
      <h2>You have not added any cars</h2>
    </div>
    <div v-else>
      <v-layout row wrap>
        <v-flex v-for="(item, i) of myAds" :key="i">
          <v-card class="mx-auto" max-width="400">
            <v-img class="white--text align-end" height="200px" :src="item.img"></v-img>
            <v-card-title>{{item.title}}</v-card-title>

            <v-card-actions>
              <v-btn color="orange" text :to="'/ad/'+item.id">Open</v-btn>
              <v-spacer></v-spacer>
              <app-edit-modal :ad="item"></app-edit-modal>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-dialog :value="success" max-width="290" persistent>
        <v-card>
          <v-alert type="success" class="head">Saved</v-alert>

          <v-card-text>Saving was successful</v-card-text>

          <v-card-actions>
            <v-btn color="green darken-1" text @click="ok">Ok</v-btn>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="goMainPage">Main page</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog :value="loading" max-width="290" persistent>
        <v-card>
          <v-alert type="info" class="head">Saving</v-alert>

          <v-card-text>
            <v-text-field color="info" loading disabled></v-text-field>loading
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog :value="error" max-width="290" persistent>
        <v-card>
          <v-alert type="error" class="head">Saving was failed</v-alert>

          <v-card-text>{{error}}</v-card-text>

          <v-card-actions>
            <v-btn color="green darken-1" text @click="ok">Try again</v-btn>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="goMainPage">Main page</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>
<script>
import EditModal from "./EditAdModal.vue";
export default {
  components: {
    appEditModal: EditModal
  },
  computed: {
    myAds() {
      const id = this.$store.getters.userId;
      return this.$store.getters.myAds(id);
    },
    loadHomePage() {
      return this.$store.getters.loadHomePage;
    },
    success() {
      return this.$store.getters.success;
    },
    loading() {
      return this.$store.getters.loading;
    },
    error() {
      return this.$store.getters.error;
    }
  },
  methods: {
    goMainPage() {
      this.$store.commit("clearAll");
      this.$router.push("/");
    },
    ok() {
      this.$store.commit("clearAll");
    }
  }
};
</script>