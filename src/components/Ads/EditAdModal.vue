<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="light-blue darken-4" dark v-bind="attrs" v-on="on">Edit</v-btn>
      </template>

      <v-card>
        <v-card-title mb-2 class="headline lighten-2 mb-3">Edit</v-card-title>

        <v-card-text>
          <v-text-field
            v-model="titleChange"
            label="Title"
            outlined
            :rules="[v=>!!v||'Title is requred']"
          ></v-text-field>
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

          <v-text-field label="The presence of additional pressure" outlined v-model="turbocharged"></v-text-field>

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
          <v-textarea
            outlined
            name="input-7-4"
            label="Describe"
            v-model="describeChange"
            :rules="[v=>!!v||'Title is requred']"
          ></v-textarea>
          <v-switch v-model="changeModal" :label="`Show modal: ${ changeModal?'yes':'no'}`"></v-switch>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="primary" text @click="cancelEdit">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text :disabled="!validation" @click="onSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
    
<script>
export default {
  props: ["ad"],
  data() {
    return {
      dialog: false,
      titleChange: this.ad.title,
      describeChange: this.ad.description,
      changeModal: this.ad.modal,
      speedTo100: this.ad.speedTo100,
      clearance: this.ad.clearance,
      weight: this.ad.weight,
      loadCapacity: this.ad.loadCapacity,
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
      bodyType: this.ad.bodyType,
      numDorsList: ["1", "2", "3", "4", "5", "6", "7", "8"],
      numDors: this.ad.numDors,
      numSeatsList: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10+"],
      numSeats: this.ad.numSeats,
      posEngineList: [
        "Front engine",
        "Rear engine",
        "Central engine",
        "Mid engine"
      ],
      posEngine: this.ad.posEngine,
      fuelList: ["Gasoline", "Diesel", "Bio-diesel", "Ethanol", "Electro"],
      fuel: this.ad.fuel,
      volumeEngine: this.ad.volumeEngine,
      numCylindersList: ["4", "5", "6", "8", "10", "12"],
      cylinders: this.ad.cylinders,
      localCylindersList: ["I", "V", "H"],
      localCylinders: this.ad.localCylinders,
      fuelConsuption: this.ad.fuelConsuption,
      numOfValves: this.ad.numOfValves,
      turbocharged: this.ad.turbocharged,
      typeTransmissionList: [
        "Automatic Transmission (AT)",
        "Manual Transmission (MT)",
        "Automated Manual Transmission (AM)",
        "Continuously Variable Transmission (CVT)"
      ],
      typeTransmission: this.ad.typeTransmission,
      numGearsList: ["4", "5", "6", "7", "8"],
      numGear: this.ad.numGear,
      driveTypeList: [
        "Rear-wheel drive",
        "Front-wheel drive",
        "All-wheel drive"
      ],
      driveType: this.ad.driveType,
      maxSpeed: this.ad.maxSpeed,
      horsePower: this.ad.horsePower,
      numDors: this.ad.numDors,
      numSeats: this.ad.numSeats,
      posEngine: this.ad.posEngine,
      fuel: this.ad.fuel,
      volumeEngine: this.ad.volumeEngine,
      cylinders: this.ad.cylinders,
      localCylinders: this.ad.localCylinders,
      fuelConsuption: this.ad.fuelConsuption,
      numOfValves: this.ad.numOfValves,
      turbocharged: this.ad.turbocharged,
      typeTransmission: this.ad.typeTransmission,
      numGear: this.ad.numGear
    };
  },
  methods: {
    cancelEdit() {
      this.titleChange = this.ad.title;
      this.describeChange = this.ad.description;
      this.changeModal = this.ad.modal;
      this.dialog = false;
      this.speedTo100 = this.ad.speedTo100;
      this.clearance = this.ad.clearance;
      this.weight = this.ad.weight;
      this.loadCapacity = this.ad.loadCapacity;
      this.bodyType = this.ad.bodyType;
      this.driveType = this.ad.driveType;
      this.maxSpeed = this.ad.maxSpeed;
      this.horsePower = this.ad.horsePower;
      this.numDors = this.ad.numDors;
      this.numSeats = this.ad.numSeats;
      this.posEngine = this.ad.posEngine;
      this.fuel = this.ad.fuel;
      this.volumeEngine = this.ad.volumeEngine;
      this.cylinders = this.ad.cylinders;
      this.localCylinders = this.ad.localCylinders;
      this.fuelConsuption = this.ad.fuelConsuption;
      this.numOfValves = this.ad.numOfValves;
      this.turbocharged = this.ad.turbocharged;
      this.typeTransmission = this.ad.typeTransmission;
      this.numGear = this.ad.numGear;
    },
    onSave() {
      let changeAd = {
        title: this.titleChange,
        description: this.describeChange,
        modal: this.changeModal,
        id: this.ad.id,
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
      this.$store.dispatch("updateAd", changeAd);
      this.dialog = false;
    }
  },
  computed: {
    validation() {
      if (this.titleChange && this.describeChange) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>