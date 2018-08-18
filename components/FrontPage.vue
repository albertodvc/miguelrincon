<template>

  <div>
    <vue-markdown>{{ parameters.bio }}</vue-markdown>
  </div>

</template>

<style lang="scss">

@import "compass/css3";
@import "compass/utilities";
@import "variables";
@import "typography";
@import "media_queries";

#frontPage {

  @include breakpoint(690px) {
    h2 {
      bottom: 92px;
    }
  }

	header,
	&.parallax-container {
		background-image: url('~/assets/images/sections/guitarra_1.jpg');
		&:before {
			content: "";
			@include box-sizing(border-box);
			display: block;
			background: inline-image('~/assets/images/sections/guitarra_1_load.jpg');
			position: absolute;
			top: 0;
			width: 100%;
			left: 0;
			background-repeat: no-repeat;
    		background-position: center center;
    		background-size: cover;
    		z-index: 0;
    		@include filter(blur(5px));
    		@include transition(opacity 0.5s ease-in-out);
    		opacity: 1;
		}
		&.img-loaded:before {
			opacity: 0;
		}
	}
	&.parallax-container {
		&:before {
			position: absolute;
			height: 100%;
			background-repeat: no-repeat;
			background-attachment: fixed;
    		background-position: center center;
    		background-size: cover;
		}
	}

	header,
	header:before,
	&.parallax-container:before {
		margin: 0;
		padding: 0;
		height: $smal-section-header-height + $top-bar-height;
		padding-top: $top-bar-height;

		@include breakpoint(690px) {
			height: $medium-section-header-height + $top-bar-height;
		}
		@include breakpoint(958px) {
			height: 500px + $top-bar-height;
		}
		@include breakpoint(1025px) {
			height:100vh;
		}
	}
	&.parallax-container {
		header {
			background: none;
			padding: 0;
			.video-wrapper {
				position: fixed;
			}
			&:before {
				content: none;
				display: none;
				opacity: 0;
			}
		}
		@include breakpoint(1024px) {
			h2 { position: fixed;}
		}
	}

	h2 {
		width: 100%;
		text-align: center;
		@include breakpoint(1024px) {
			width: 960px;
		}
		span {
			display: none;
			@include breakpoint(958px) {
				display: block;
			}
		}
	}
	.content {
    @include breakpoint(420px) {
      padding-top: 20px;
    }
    @include breakpoint(690px) {
      padding-top: 40px;
    }

		p {

 			&:first-letter {
 				font-family: "main-header";
 				font-size: 130px;
 				line-height: 124px;
 				margin-bottom: -25px;
 				padding-right: 15px;
 				font-weight: 800;
 				color: $black;
 				float: left;
 				display: block;
 			}
 			@include breakpoint(950px) {
 				@include column-count(2);
				@include column-gap(40px);
 				text-align: justify;
 			}
		}
	}

}


</style>

<script>

  import VueMarkdown from 'vue-markdown'

  export default {
    components: {
      VueMarkdown
    },
    props: ['parameters'],
  }

</script>
