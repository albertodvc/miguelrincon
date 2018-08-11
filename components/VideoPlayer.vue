<template>
  <div>
    <h2 v-parallax>
      <slot></slot>
      <div class="button-container">
        <button class="play-video-button"
          role="button"
          :class="{ playing: playing }"

          @click.native="playVideo">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="icon-play" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve">
            <path class="icon" d="M204.8,371.2L358.4,256L204.8,140.8V371.2z M256,0C114.562,0,0,114.562,0,256s114.562,256,256,256s256-114.562,256-256  S397.438,0,256,0z M256,460.8C143.106,460.8,51.2,368.9,51.2,256c0-112.894,91.906-204.8,204.8-204.8  c112.9,0,204.8,91.906,204.8,204.8C460.8,368.9,368.9,460.8,256,460.8z" fill="#FFFFFF"/>
          </svg>
          <span>Video</span>
        </button>
      </div>
    </h2>
    <div class="video-wrapper">
      <youtube
        :video-id="video.id"
        :player-vars="playerVars"
        ref="youtube"
        width="100%"
        height="100%"
        @ready="ready = true"
        @ended="playing = false; initPlaying = false;"
        @playing="initPlaying = true"/>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue'
  import VueYoutube from 'vue-youtube'

  Vue.use(VueYoutube)

  export default {
    props: ['video'],
    computed: {
      player () {
        return this.$refs.youtube.player
      }
    },
    methods: {
      playVideo() {
        this.playing = true;
        this.player.playVideo()
      },
      notify(notice) {
        console.log('notify', notice)
      }
    },
    data: function () {
      return {
        playerVars: {
          modestbranding: 1,
          showinfo: 0,
        },
        ready: false,
        playing: false,
        initPlaying: false,
        paused: false,
        ended: true
      }
    }
  }
</script>
