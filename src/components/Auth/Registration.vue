<template>
  <v-container class="d-flex flex-column align-center">
    <v-col cols="12" sm="6">
      <v-card class="overflow-hidden">
        <v-toolbar flat class="head blue-grey darken-3">
          <v-icon left>mdi-account</v-icon>
          <v-toolbar-title class="font-weight-light">Sing up</v-toolbar-title>
        </v-toolbar>
        <v-form>
          <v-card-text>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" outlined required></v-text-field>

            <v-text-field
              :append-icon="show1?'mdi-eye' : 'mdi-eye-off'"
              :type="show1?'password':'text'"
              @click:append="show1=!show1"
              v-model="password"
              :rules="passwordRules"
              label="Password"
              outlined
              required
            ></v-text-field>

            <v-text-field
              :append-icon="show2?'mdi-eye' : 'mdi-eye-off'"
              :type="show2?'password':'text'"
              @click:append="show2=!show2"
              v-model="passwordRepeat"
              :rules="passwordRepeatRules"
              label="Repeat password"
              outlined
              required
            ></v-text-field>

            <v-btn
              :disabled="validation"
              color="success"
              class="mr-4"
              :loading="loading"
              @click="registration"
            >Sing up</v-btn>

            <v-btn color="error" class="mr-4" @click="clearForm">Clear form</v-btn>
          </v-card-text>
        </v-form>
      </v-card>

      <v-dialog :value="success" max-width="290" persistent>
        <v-card>
          <v-alert type="success" class="head">Registration was successful</v-alert>

          <v-card-text>Now you are logged in, continue browsing on the main page</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="goMainPage">Main page</v-btn>
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

      <v-dialog :value="error" max-width="290" persistent>
        <v-card>
          <v-alert type="error" class="head">Registration was failed</v-alert>

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
      email: "",
      password: "",
      passwordRepeat: "",
      errorMassage: "",
      load: true,
      show1: true,
      show2: true,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 6) || "Password must be more than 6 characters"
      ],
      passwordRepeatRules: [
        v => !!v || "Repeat password is required",
        v => v === this.password || "Your passwords do not match"
      ]
    };
  },
  computed: {
    validation() {
      if (
        /.+@.+\..+/.test(this.email) &&
        this.password === this.passwordRepeat &&
        this.password.length >= 6
      ) {
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
  methods: {
    clearForm() {
      this.password = null;
      this.email = null;
      this.passwordRepeat = null;
    },
    registration() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("registerUser", user);
    },
    goMainPage() {
      this.$store.commit("clearAll");
      this.$router.push("/");
    },
    goLoginPage() {
      this.$store.commit("clearAll");
      this.$router.push("/login");
    },
    tryAgain() {
      this.$store.commit("clearAll");
    }
  }
};
</script>