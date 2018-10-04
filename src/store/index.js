import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search: 'cat',
    offset: 0,
    images: [],
    currentImageIndex: -1
  },
  mutations: {
    changeSearch(state, payload) {
      state.search = payload;
    },
    addImage(state, payload) {
      state.images.push(payload);
    },
    setCurrentImageIndex(state, payload) {
      state.currentImageIndex = payload;
    },
    incrementOffset(state) {
      state.offset++;
    },
    clearImages(state) {
      state.images = [];
    }
  },
  actions: {
    getImages(context) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.get(
            `${process.env.VUE_APP_API_URL}/api/giphy`,
            {
              params: {
                q: context.state.search,
                offset: context.state.offset
              }
            }
          );

          context.commit('incrementOffset');

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
