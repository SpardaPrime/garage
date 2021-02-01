<template>
  <v-app>
    <v-app-bar class="secondary headder" app>
      <v-app-bar-nav-icon @click="toggleDrawer" class="mob">
        <v-icon large>mdi-menu</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="div" class="pointer">
          <v-img
            src="https://firebasestorage.googleapis.com/v0/b/itc-ads-4bdc2.appspot.com/o/logo.png?alt=media&token=e122b18e-5adb-4919-9e60-ca17072c9934"
          ></v-img>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn color="transparent" X large v-for="link of links" :key="link.title" :to="link.url">
          <v-icon left medium>mdi-{{link.icon}}</v-icon>
          {{link.title}}
        </v-btn>
        <v-btn @click="logoutUser" color="transparent" v-if="user" X large>
          <v-icon left medium>mdi-exit-to-app</v-icon>Log out
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      width="100%"
      dark
      fixed
      left
      temporary
      src="https://firebasestorage.googleapis.com/v0/b/itc-ads-4bdc2.appspot.com/o/nav.png?alt=media&token=b48c0ede-c8d8-47df-8331-03f3776b4649"
    >
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-blue--text text--accent-4">
          <v-list-item v-for="link of links" :key="link.title" :to="link.url">
            <v-list-item-title>
              <v-icon left large>mdi-{{link.icon}}</v-icon>
              {{link.title}}
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="user" @click="logoutUser">
            <v-list-item-title>
              <v-icon left medium>mdi-exit-to-app</v-icon>Log out
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-snackbar v-model="loginError">
      If you want view this page, log in
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="loginError = !loginError">Close</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      group: null,
      loginError: false
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    logoutUser() {
      const currentPath = this.$router.history.current.fullPath;
      this.$store.dispatch("userLogout", null);
      this.$store.commit("clearOrders");
      if (currentPath !== "/") {
        this.$router.push("/");
      }
    }
  },
  computed: {
    links() {
      if (!this.$store.getters.user) {
        return [
          { title: "Log in", icon: "lock", url: "/login" },
          { title: "Sign up", icon: "face", url: "/registration" }
        ];
      } else {
        return [
          { title: "Favorite", icon: "star", url: "/orders" },
          { title: "Add new car", icon: "plus-thick", url: "/new" },
          { title: "My added cars", icon: "car", url: "/list" }
        ];
      }
    },
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    if (this.$router.history.current.query["loginError"]) {
      this.loginError = true;
    }
  }
};
</script>
<style>
.pointer {
  cursor: pointer;
}
.head {
  background-image: url("https://firebasestorage.googleapis.com/v0/b/itc-ads-4bdc2.appspot.com/o/cart.png?alt=media&token=84aa31f2-bdb6-4dd9-8598-fb050f56eb63");
}
.headder {
  background-image: url("https://firebasestorage.googleapis.com/v0/b/itc-ads-4bdc2.appspot.com/o/header.png?alt=media&token=143dc945-515d-4ae4-93aa-4fd95f750488");
}
@media screen and (min-width: 960px) {
  .mob {
    display: none;
  }
}
</style>