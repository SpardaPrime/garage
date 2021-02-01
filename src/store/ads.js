import firebase from "firebase";

class Ad {
  constructor({
    title,
    description,
    uid,
    modal = false,
    id = null,
    speedTo100 = '',
    clearance = '',
    weight = '',
    loadCapacity = '',
    bodyType = '',
    numDors = '',
    numSeats = '',
    posEngine = '',
    fuel = '',
    volumeEngine = '',
    cylinders = '',
    localCylinders = '',
    fuelConsuption = '',
    numOfValves = '',
    turbocharged = '',
    typeTransmission = '',
    numGear = '',
    driveType = '',
    maxSpeed = '',
    horsePower = ''
  }) {
    this.title = title;
    this.description = description;
    this.ownerId = uid;
    this.img = '';
    this.modal = modal;
    this.id = id;
    this.speedTo100 = speedTo100;
    this.clearance = clearance;
    this.weight = weight;
    this.loadCapacity = loadCapacity;
    this.bodyType = bodyType;
    this.numDors = numDors;
    this.numSeats = numSeats;
    this.posEngine = posEngine;
    this.fuel = fuel;
    this.volumeEngine = volumeEngine;
    this.cylinders = cylinders;
    this.localCylinders = localCylinders;
    this.fuelConsuption = fuelConsuption;
    this.numOfValves = numOfValves;
    this.turbocharged = turbocharged;
    this.typeTransmission = typeTransmission;
    this.numGear = numGear;
    this.driveType = driveType;
    this.maxSpeed = maxSpeed;
    this.horsePower = horsePower;

  }
}

export default {
  state: {
    ads: []
  },
  mutations: {
    createAd({
      ads
    }, payload) {
      ads.push(payload);
    },
    loadsAds(state, payload) {
      state.ads = payload;
    }
  },
  actions: {
    createAd({
      commit,
      state
    }, payload) {
      const {
        title,
        description,
        modal,
        img,
        uid
      } = payload;
      const image = img;

      commit("clearAll");
      commit("setLoading", true);
      const newAd = new Ad(payload);

      firebase
        .database()
        .ref("ads")
        .push(newAd)
        .then(res => {
          let key = res.key;
          const imageExt = image.name.slice(0, image.name.lastIndexOf("."));

          firebase
            .storage()
            .ref(`ads/${uid}.${imageExt}`)
            .put(image)
            .then(res => {
              firebase
                .storage()
                .ref()
                .child(res.ref.fullPath)
                .getDownloadURL()
                .then(url => {
                  const URL = url;
                  firebase
                    .database()
                    .ref("ads")
                    .child(key)
                    .update({
                      img: URL
                    })
                    .then(() => {
                      commit("setLoading", false);
                      commit("setSuccess", true);
                      let newObj = {
                        ...newAd,
                        id: key,
                        img: URL
                      };
                      commit("createAd", newObj);
                    });
                });
            });
        })
        .catch(err => {
          commit("clearError", err);
        });
    },
    fetchAds({
      commit
    }) {
      commit("clearAll");
      commit("loadHomePage", true);
      const resuldAds = [];
      firebase
        .database()
        .ref("ads")
        .once("value")
        .then(res => res.val())
        .then(res => {
          if (!res) {
            commit("loadHomePage", false);
            return;
          }
          Object.keys(res).forEach(key => {
            const ad = res[key];
            resuldAds.push({
              ...ad,
              id: key
            });
          });
          commit("loadsAds", resuldAds);
          commit("loadHomePage", false);
        });
    },
    updateAd({
      commit,
      state
    }, payload) {
      const {
        id
      } = payload;
      commit("clearAll");
      commit("setLoading", true);
      firebase
        .database()
        .ref("ads")
        .child(id)
        .update(payload)
        .then(() => {
          let idx = state.ads.findIndex(item => item.id == id);
          state.ads = [
            ...state.ads.slice(0, idx),
            {
              ...state.ads[idx],
              ...payload
            },
            ...state.ads.slice(idx + 1)
          ];
          commit("setLoading", false);
          commit("setSuccess", true);
        })
        .catch(err => {
          commit("setError", err);
        });
    }
  },
  getters: {
    ads(state) {
      return state.ads;
    },
    promoAds(state) {
      return state.ads.filter(({
        modal
      }) => modal);
    },
    myAds(state) {
      return id => state.ads.filter(({
        ownerId
      }) => ownerId === id);
    },
    adById(state) {
      return id => state.ads.find(ad => ad.id === id);
    }
  }
};
