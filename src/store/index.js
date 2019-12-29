import Vuex from '@wepy/x';

export default new Vuex.Store({
  state: {
    player: wx.createInnerAudioContext(),
    bgm: 'http://m10.music.126.net/20191229190547/719c509eb302ce95c063070f48b62654/ymusic/bb2c/58f0/86c3/e58e516553caf0fc62443c0ea39bf4a4.mp3'
  },
  mutations: {
    // replayMusic (state) {
      
    // },
    playMusic (state) {
      console.log('gogogogo');
      
      if (state.player.src) {
        state.player.play()
      } else {
        state.player.title = 'bgm'
        state.player.src = state.bgm
        state.player.play();
        // state.player.onPlay(() => {
        //   console.log('音乐播放开始')
        // })
        state.player.onEnded(() => {
          state.player.play()
        })
      }
    }
  },
  actions: {
    playMusic ({ commit }) {
      commit('playMusic');
    },
    // decrement ({ commit }) {
    //   commit('decrement');
    // },
    // incrementAsync ({ commit }) {
      
    // }
  }
});
