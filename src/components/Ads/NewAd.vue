<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <v-col cols="12" sm="6">
      <v-card class="overflow-hidden">
        <v-toolbar flat class="head blue-grey darken-3">
          <v-icon left>mdi-plus</v-icon>
          <v-toolbar-title class="font-weight-light">Add new car</v-toolbar-title>
        </v-toolbar>
        <v-form>
          <v-card-text>
            <v-text-field label="Car name" outlined v-model="title" :rules="titleRules" required></v-text-field>

            <h3 class="mb-1 ml-3">Dynamic characteristics</h3>
            <hr class="mb-3" />
            <v-text-field label="Acceleration time up to 100 km / h" outlined v-model="speedTo100"></v-text-field>
            <v-text-field label="Maximum speed km/ h" outlined v-model="maxSpeed"></v-text-field>
            <v-text-field label="Horsepower" outlined v-model="horsePower"></v-text-field>

            <h3 class="mb-1 ml-3">Dimensions and weight</h3>
            <hr class="mb-3" />
            <v-text-field label="Clearance, mm" outlined v-model="clearance "></v-text-field>
            <v-text-field label="Weight, kg" outlined v-model="weight"></v-text-field>
            <v-text-field label="Load capacity, kg" outlined v-model="loadCapacity"></v-text-field>

            <h3 class="mb-1 ml-3">Body</h3>
            <hr class="mb-3" />
            <v-select :items="bodyTypeList" v-model="bodyType" label="Body type" outlined></v-select>
            <v-select :items="numDorsList" v-model="numDors" label="Number of doors" outlined></v-select>
            <v-select :items="numSeatsList" v-model="numSeats" label="Number of seats" outlined></v-select>

            <h3 class="mb-1 ml-3">Engine</h3>
            <hr class="mb-3" />
            <v-select :items="posEngineList" v-model="posEngine" label="Position Engine" outlined></v-select>
            <v-select :items="fuelList" v-model="fuel" label="Fuel" outlined></v-select>

            <v-text-field label="Volume, cm3" outlined v-model="volumeEngine"></v-text-field>

            <v-select
              :items="numCylindersList"
              v-model="cylinders"
              label="Number of cylinders"
              outlined
            ></v-select>
            <v-select
              :items="localCylindersList"
              v-model="localCylinders"
              label="Location of cylinders"
              outlined
            ></v-select>

            <v-text-field
              label="Fuel consumption (urban cycle) l / 100km"
              outlined
              v-model="fuelConsuption"
            ></v-text-field>

            <v-text-field label="Number of valves" outlined v-model="numOfValves"></v-text-field>

            <v-text-field
              label="The presence of additional pressure"
              outlined
              v-model="turbocharged"
            ></v-text-field>

            <h3 class="mb-1 ml-3">Transmission</h3>
            <hr class="mb-3" />
            <v-select
              :items="typeTransmissionList"
              v-model="typeTransmission"
              label="Type of transmission"
              outlined
            ></v-select>
            <v-select :items="numGearsList" v-model="numGear" label="Number of gears" outlined></v-select>
            <v-select :items="driveTypeList" v-model="driveType" label="Drive type" outlined></v-select>

            <h3 class="mb-1 ml-3">History</h3>
            <hr class="mb-3" />
            <v-textarea
              outlined
              name="input-7-4"
              label="History of car"
              v-model="description"
              :rules="discribeRules"
            ></v-textarea>

            <h3 class="mb-1 ml-3">Photo (image) car</h3>
            <hr class="mb-3" />

            <v-file-input
              label="File input"
              v-model="files"
              @change="fileChange"
              accept="image/*"
              multiple
              outlined
              dense
              small-chips
              show-size
            ></v-file-input>

            <v-img max-height="200" max-width="302" contain v-if="imageSrc" :src="imageSrc"></v-img>

            <v-switch v-model="modal" :label="`Add to slider on main page: ${modal?'Yes':'No'}`"></v-switch>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="validation" color="success" class="mr-4" @click="create">Create</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
      <v-dialog :value="success" max-width="290" persistent>
        <v-card>
          <v-alert type="success" class="head">Created</v-alert>

          <v-card-text>
            Now
            you can go to main page or continue adding
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="goMainPage">Main page</v-btn>

            <v-btn color="green darken-1" text @click="continueAdd">Continue</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog :value="loading" max-width="290" persistent>
        <v-card>
          <v-alert type="info" class="head">Load</v-alert>

          <v-card-text>
            <v-text-field color="info" loading disabled></v-text-field>loading
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog :value="error" max-width="290" persistent>
        <v-card>
          <v-alert type="error" class="head">Loading was failed</v-alert>

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
      description: "",
      title: "",
      titleRules: [v => !!v || "Title is required"],
      discribeRules: [v => !!v || "Discribe is required"],
      files: [],
      modal: false,
      imageSrc: null,
      image: null,
      speedTo100: "",
      clearance: "",
      weight: "",
      loadCapacity: "",
      bodyTypeList: [
        "Sedan",
        "Coupe",
        "Hatch—back",
        "Minivan",
        "Universal",
        "SUV (crossover)",
        "Coupe",
        "Pickup",
        "Cabriolet",
        "Limousine",
        "Roadster",
        "Targa"
      ],
      bodyType: "",
      numDorsList: ["1", "2", "3", "4", "5", "6", "7", "8"],
      numDors: "",
      numSeatsList: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10+"],
      numSeats: "",
      posEngineList: [
        "Front engine",
        "Rear engine",
        "Central engine",
        "Mid engine"
      ],
      posEngine: "",
      fuelList: ["Gasoline", "Diesel", "Bio-diesel", "Ethanol", "Electro"],
      fuel: "",
      volumeEngine: "",
      numCylindersList: ["4", "5", "6", "8", "10", "12"],
      cylinders: "",
      localCylindersList: ["I", "V", "H"],
      localCylinders: "",
      fuelConsuption: "",
      numOfValves: "",
      turbocharged: "",
      typeTransmissionList: [
        "Automatic Transmission (AT)",
        "Manual Transmission (MT)",
        "Automated Manual Transmission (AM)",
        "Continuously Variable Transmission (CVT)"
      ],
      typeTransmission: "",
      numGearsList: ["4", "5", "6", "7", "8"],
      numGear: "",
      driveTypeList: [
        "Rear-wheel drive",
        "Front-wheel drive",
        "All-wheel drive"
      ],
      driveType: "",
      maxSpeed: "",
      horsePower: ""
    };
  },
  watch: {},
  computed: {
    validation() {
      if (this.title && this.description && this.files.length) {
        return false;
      } else {
        return true;
      }
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
    create() {
      const ad = {
        title: this.title,
        description: this.description,
        modal: this.modal,
        img: this.image,
        speedTo100: this.speedTo100,
        clearance: this.clearance,
        weight: this.weight,
        loadCapacity: this.loadCapacity,
        bodyType: this.bodyType,
        numDors: this.numDors,
        numSeats: this.numSeats,
        posEngine: this.posEngine,
        fuel: this.fuel,
        volumeEngine: this.volumeEngine,
        cylinders: this.cylinders,
        localCylinders: this.localCylinders,
        fuelConsuption: this.fuelConsuption,
        numOfValves: this.numOfValves,
        turbocharged: this.turbocharged,
        typeTransmission: this.typeTransmission,
        numGear: this.numGear,
        driveType: this.driveType,
        maxSpeed: this.maxSpeed,
        horsePower: this.horsePower
      };
      if (this.$store.getters.user) {
        ad.uid = this.$store.getters.user.uid;
      }

      this.$store.dispatch("createAd", ad);
    },
    fileChange(e) {
      if (e.length) {
        const file = this.files[0];
        const reader = new FileReader();
        reader.onload = e => {
          this.imageSrc = reader.result;
        };
        reader.readAsDataURL(file);
        this.image = file;
      } else {
        this.imageSrc = null;
        this.image = null;
      }
    },
    goMainPage() {
      this.$store.commit("clearAll");
      this.$router.push("/");
    },
    continueAdd() {
      this.$store.commit("clearAll");
    },
    tryAgain() {
      this.$store.commit("clearAll");
    }
  },
  
};
</script>