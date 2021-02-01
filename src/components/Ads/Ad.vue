<template>
  <v-container>
    <div v-if="loadHomePage">
      <v-progress-linear indeterminate color="yellow darken-2"></v-progress-linear>
    </div>
    <div v-else>
      <v-layout row>
        <v-flex xs12 mt-10>
          <v-card class="mx-auto" min-width="300" max-width="800">
            <v-img :src="ad.img" height="auto"></v-img>

            <v-card-title>{{ad.title}}</v-card-title>

            <v-card-text>
              <v-simple-table dense>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Parameter</th>
                      <th class="text-left">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Weight</td>
                      <td>{{ ad.weight?ad.weight:'unknown' }}</td>
                    </tr>
                    <tr>
                      <td>From 0 to 100 km</td>
                      <td>{{ ad.speedTo100?ad.speedTo100:'unknown' }}</td>
                    </tr>
                    <tr>
                      <td>Clearance</td>
                      <td>{{ ad.clearance?ad.clearance:'unknown' }}</td>
                    </tr>
                    <tr>
                      <td>Load capacity</td>
                      <td>{{ ad.loadCapacity?ad.loadCapacity:'unknown' }}</td>
                    </tr>
                    <tr>
                      <td>Type of body</td>
                      <td>{{ ad.bodyType?ad.bodyType:'unknown' }}</td>
                    </tr>
                    <tr>
                      <td>Number of doors</td>
                      <td>{{ ad.numDors?ad.numDors:'unknown' }}</td>
                    </tr>
                    <tr>
                      <td>Number of seats</td>
                      <td>{{ ad.numSeats?ad.numSeats:'unknown' }}</td>
                    </tr>
                    <tr>
                      <td>Engine position</td>
                      <td>{{ ad.posEngine?ad.posEngine:'unknown' }}</td>
                    </tr>
                    <tr>
                      <td>Type of fuel</td>
                      <td>{{ ad.fuel?ad.fuel:'unknown' }}</td>
                    </tr>
                    <tr>
                      <td>Volume engine</td>
                      <td>{{ ad.volumeEngine?ad.volumeEngine:'unknown' }}</td>
                    </tr>
                    <tr>
                      <td>Number of cylinders</td>
                      <td>{{ ad.cylinders?ad.cylinders:'unknown' }}</td>
                    </tr>
                    <tr>
                      <td>Cylinders position</td>
                      <td>{{ ad.localCylinders?ad.localCylinders:'unknown' }}</td>
                    </tr>
                    <tr>
                      <td>Fuel consuption (100 km)</td>
                      <td>{{ ad.fuelConsuption?ad.fuelConsuption:'unknown' }}</td>
                    </tr>
                    <tr>
                      <td>Number of valves</td>
                      <td>{{ ad.numOfValves?ad.numOfValves:'unknown' }}</td>
                    </tr>
                    <tr>
                      <td>Turbocharged</td>
                      <td>{{ ad.turbocharged?ad.turbocharged:'unknown' }}</td>
                    </tr>
                    <tr>
                      <td>Transmission type</td>
                      <td>{{ ad.typeTransmission?ad.typeTransmission:'unknown' }}</td>
                    </tr>
                    <tr>
                      <td>Number of gears</td>
                      <td>{{ ad.numGear?ad.numGear:'unknown' }}</td>
                    </tr>
                    <tr>
                      <td>Drive type</td>
                      <td>{{ ad.driveType?ad.driveType:'unknown' }}</td>
                    </tr>
                    <tr>
                      <td>Max speed</td>
                      <td>{{ ad.maxSpeed?ad.maxSpeed:'unknown' }}</td>
                    </tr>
                    <tr>
                      <td>Horsepower</td>
                      <td>{{ ad.horsePower?ad.horsePower:'unknown' }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-card-title>History</v-card-title>
              <p>{{ad.description}}</p>
            </v-card-text>

            <v-card-actions>
              <app-buy-modal v-if="userId" :adid="ad" :ownId="ad.ownerId"></app-buy-modal>
              <v-spacer></v-spacer>
              <app-edit-modal v-if="edit" :ad="ad"></app-edit-modal>
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
import EditModal from "./EditAdModal";

export default {
  props: ["id"],
  components: {
    appEditModal: EditModal
  },
  computed: {
    ad() {
      const id = this.id;
      return this.$store.getters.adById(id);
    },
    edit() {
      if (this.ad.ownerId === this.$store.getters.userId) {
        return true;
      } else {
        return false;
      }
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
    },
    userId() {
      return this.$store.getters.userId;
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