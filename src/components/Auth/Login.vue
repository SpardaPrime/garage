<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <v-col cols="12" sm="6">
      <v-card class="overflow-hidden">
        <v-toolbar flat class="head blue-grey darken-3">
          <v-icon left>mdi-account</v-icon>
          <v-toolbar-title class="font-weight-light">Log in</v-toolbar-title>
        </v-toolbar>
        <v-form>
          <v-card-text>
            <v-text-field label="Email" outlined v-model="email" :rules="emailRules" required></v-text-field>
            <v-text-field
              type="password"
              label="Password"
              outlined
              v-model="password"
              :rules="passwordRules"
              :counter="20"
              required
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="validation" color="success" class="mr-4" @click="logOn">Log in</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>

      <v-dialog :value="loading" max-width="290" persistent>
        <v-card>
          <v-alert type="info" class="head">Log in</v-alert>

          <v-card-text>
            <v-text-field color="info" loading disabled></v-text-field>Enter
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog :value="error" max-width="290" persistent>
        <v-card>
          <v-alert type="error" class="head">Log in was failed</v-alert>

          <v-card-text>{{error}}</v-card-text>

          <v-card-actions>
            <v-btn color="green darken-1" text @click="tryAgain">Try again</v-btn>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="goMainPage">Main page</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      password: "",
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 6) || "Password must be more than 6 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    logOn() {
      const user = {
        email: this.email,
        password: this.password
      };

      this.$store.dispatch("loginUser", user);
    },
    goMainPage() {
      this.$store.commit("clearAll");
      this.$router.push("/");
    },
    tryAgain() {
      this.$store.commit("clearAll");
    }
  },
  computed: {
    validation() {
      if (/.+@.+\..+/.test(this.email) && this.password.length >= 6) {
        return false;
      } else {
        return true;
      }
    },
    loading() {
      return this.$store.getters.loading;
    },
    error() {
      return this.$store.getters.error;
    },
    success() {
      return this.$store.getters.success;
    }
  },
  watch: {
    success: function() {
      if (this.success) {
        this.$store.commit("clearAll");
        this.$router.push("/");
      }
    }
  }
};
</script>