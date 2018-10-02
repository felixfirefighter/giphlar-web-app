import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images: [],
    currentImageIndex: -1
  },
  mutations: {
    addImage(state, payload) {
      state.images.push(payload);
    },
    setCurrentImageIndex(state, payload) {
      state.currentImageIndex = payload;
    }
  },
  actions: {
    getImages(context) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.get('https://localhost:44364/api/giphy');
          res.data.data.forEach(elem => {
            const image = {
              id: elem.id,
              index: context.state.images.length,
              preview: elem.images.fixed_width.url,
              original: elem.images.original.url
            };

            context.commit('addImage', image);
          });

          resolve();
        } catch (err) {
          reject();
        }
      });
    }
  }
});
