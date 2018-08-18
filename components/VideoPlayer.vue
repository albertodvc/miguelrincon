<template>
  <div class="video-player"
    :class="{'video-ready': ready, 'video-active': playing, 'played-once': playedOnce}">
    <h2 v-parallax>
      <slot></slot>
      <div class="button-container" @click.native="playVideo">
        <button class="play-video-button"
          :class="{ playing: playing }"
          @click="playVideo">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="icon-play" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve">
            <path class="icon" d="M204.8,371.2L358.4,256L204.8,140.8V371.2z M256,0C114.562,0,0,114.562,0,256s114.562,256,256,256s256-114.562,256-256  S397.438,0,256,0z M256,460.8C143.106,460.8,51.2,368.9,51.2,256c0-112.894,91.906-204.8,204.8-204.8  c112.9,0,204.8,91.906,204.8,204.8C460.8,368.9,368.9,460.8,256,460.8z" fill="#FFFFFF"/>
          </svg>
          <span>Video</span>
        </button>
      </div>
    </h2>
    <div class="video-wrapper" :class="{'active': playing}">
      <div class="video-container">
        <youtube
          :video-id="video.id"
          :player-vars="playerVars"
          ref="youtube"
          width="100%"
          height="100%"
          @ready="ready = true"
          @ended="playing = false"
          @paused="playing = false; paused = true"
          @playing="playing = true; playedOnce = true"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

@import "compass/css3";
@import "compass/utilities";
@import "variables";
@import "typography";
@import "media_queries";

.video-player {
  .video-wrapper {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: calc(100% - #{$top-bar-height});
    .video-container {
      @include transition(opacity 1s ease-in-out);
      width: 100%;
      height: 100%;
      opacity: 0;
    }
	}
  .play-video-button {
    opacity: 0;
    background: none;
    outline: none;
    border: none;
    margin: 0;
    padding: 0;
    width: 105px;
    @include transition(all 0.3s ease-in-out);
    span {
      font-size: 16px;
      color: white;
      display: block;
    }
  }
  &.video-ready {
    .play-video-button {
      @include transform(scale(1));
      @include transition(opacity 0.3s ease-in-out);
      opacity: 1;
    }
  }

  &.video-active {
    .video-wrapper {
      z-index: 1!important;
      .video-container {
        @include transition(opacity 1s ease-in-out);
        opacity: 1;
        pointer-events: auto!important;

      }
    }
    .play-video-button {
      @include transition(all 0.15s ease-in-out);
      opacity: 0;
      @include transform(scale(20));
    }
  }
	.video-wrapper:not(.video-active) {
		height: 100%;
		z-index: -1;
		.video-container {
			pointer-events: none;
		}
	}
}

</style>

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
        playedOnce: false,
        paused: false,
        ended: true
      }
    }
  }
</script>
