<template>
  <div>
    <div v-if="loadHomePage">
      <v-progress-linear indeterminate color="yellow darken-2"></v-progress-linear>
    </div>
    <div v-else>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-carousel>
              <v-carousel-item
                v-for="(item,i) in promoAds"
                :key="i"
                :src="item.img"
                reverse-transition="fade-transition"
                transition="fade-transition"
              >
                <div class="carousel-titile">
                  <router-link :to="'/ad/'+item.id" tag="h2">{{item.title}}</router-link>
                </div>
              </v-carousel-item>
            </v-carousel>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container grid-list-lg>
        <v-layout row wrap>
          <v-flex v-for="(item, i) of ads" :key="i">
            <v-card class="mx-auto" max-width="344">
              <v-img :src="item.img" height="200px"></v-img>

              <v-card-title>{{item.title}}</v-card-title>

              <v-card-subtitle>{{item.descripton}}</v-card-subtitle>

              <v-card-actions>
                <app-buy-modal v-if="userId" :adid="item" :ownId="item.ownerId"></app-buy-modal>

                <v-spacer></v-spacer>
                <v-btn color="orange lighten-2" text :to="'/ad/'+ item.id">Open</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    promoAds() {
      return this.$store.getters.promoAds;
    },
    ads() {
      return this.$store.getters.ads;
    },
    loadHomePage() {
      return this.$store.getters.loadHomePage;
    },
    userId() {
      return this.$store.getters.userId;
    }
  }
};
</script>
<style scoped>
.carousel-titile {
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  height: 50px;
}
.carousel-titile h2 {
  cursor: pointer;
}
</style>
