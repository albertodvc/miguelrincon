<template>

  <section :id="section"
    class="section parallax-container"
    :class="{'img-loaded': parameters.preloadImg && bgLoaded}"
    v-parallax-container>
    <header class="section__header"
      :class="{'img-loaded': parameters.preloadImg && bgLoaded}">
      <slot>
        <h2 v-parallax>{{ $t('sections.'+section) }}</h2>
      </slot>
    </header>
    <article>
      <component class="content" :is="section" v-bind="{ parameters: parameters }"></component>
      <blockquote class="section__quote">
        <p>{{ parameters.quote.text }}</p>
        <p>{{ parameters.quote.author }}</p>
      </blockquote>
    </article>
    <img v-if="parameters.preloadImg"
      src="~/assets/images/sections/frontPageBg.jpg"
      :onload="bgLoaded = true"
      style="display: none;"/>
  </section>

</template>

<script>

  import FrontPage from '~/components/FrontPage.vue'
  import Performances from '~/components/Performances.vue'
  import Records from '~/components/Records.vue'

  export default {
    components: {
      FrontPage,
      Performances,
      Records
    },
    props: ['section', 'parameters'],
    data: function() {
      return {
        bgLoaded: false
      }
    }
  }

</script>

<style lang="scss">

@import "compass/css3";
@import "compass/utilities";
@import "variables";
@import "typography";
@import "media_queries";

section{
	header {
		@include box-sizing(border-box);
		background-position: center center;
		background-color: black;
		background-size: cover;
		position: relative;
		height: $smal-section-header-height;
		padding: 0 $small-padding;
		width: 100%;

		@include breakpoint(690px) {
			height: $medium-section-header-height;
		}
		@include breakpoint(958px) {
			height: 500px;
		}
    @include breakpoint(1025px) {
			height:100vh;
		}
		h2 {
			text-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
			text-transform: uppercase;
			color: $white;
			display: block;
			font-size: 35px;
			position: absolute;
			bottom: $small-vertical-padding;
			margin: 0;
			line-height: 0.85;
			margin-bottom: 10px;

			span.miguel {
				display: block;
				font-family: "main-header";
				font-weight: normal;
				text-transform: none;

			}

			@include breakpoint(545px) {
				font-size: 45px;
			}
			@include breakpoint(616px) {
				font-size: 70px;
			}
			@include breakpoint(958px) {
				font-size: 80px;
				span.miguel {
					font-size: 110px;
				}
			}
			@include breakpoint(1024px) {
				font-size: 90px;
				text-align: center;
				line-height: 80px;
				font-weight: bold;
				left: 50%;
				margin: -80px 0 0 -480px;
				position: absolute;
				//text-align: center;

				top: 50%;
				width: 960px;
				span.miguel {
					//font-size: 137px;
					margin-bottom: 40px;
				}
			}
		}
	}
	&.parallax-container {
		background-attachment: fixed;
		background-position: center center;
		background-size: cover;
		position: relative;
	}
}

section {
	&:before {
		opacity: 0;
		content: "";
		position: absolute;
		@include transition(opacity $menu-animation-time ease-in-out);
	}

	&.menu-opened {
		position: relative;
		&:before {
			position: absolute;
			z-index: 90;
			content: "";
			height: 100%;
			right: 0;
			left: 0;
			background: black;
			opacity: 0.4;
			@include transition(opacity $menu-animation-time ease-in-out);
		}
	}
	@include breakpoint(958px) {
		&:before {
			content: none;

		}
	}
}

article {
	@include clearfix;
	background-color: white;
	padding: 20px 0;
	@include box-sizing(border-box);
	@include box-shadow(0px 0px 30px rgba(0, 0, 0, 0.9));
	position: relative;
	z-index: 10;
	@include breakpoint(960px) {
		padding: 60px 0;
		.content {
			padding-bottom: 60px;
		}
	}
	.content {
		@include box-sizing(border-box);
		padding: 0 $small-padding;
		width: 100%;
		margin: 0;

		padding-bottom: $small-vertical-padding;
		@include breakpoint(960px) {
			padding-bottom: 60px;
		}

		@include small-desktop {
			width: 960px;
			margin: 0 auto;
			padding: 0 0 60px 0;
		}
	}
	.content + blockquote {
		@include box-sizing(border-box);
		width: 100%;
		border-top: 1px dashed $light-gray;
		margin: 0;
    padding: $small-padding/2 $small-padding 0 $small-padding;

		@include breakpoint(700px) {
			padding: $small-padding/2 0 0 0;
			p {
				width: 450px;
				margin: 0 auto;
			}
		}
		@include breakpoint(960px) {
			padding-top: 40px;
		}
	}
}



.section {

  // &__header {
  //   height: 100vh;
  // }

  &__quote {
    color: lighten($body-text-color, 10%);
    font-weight: 200;

    p:first-child {
      @extend %quote-text;

      &::before {
        color: $lightest-gray;
        display: inline-block;
        content: "";
        font-size: 35px;
        margin-right: 5px;
        width: 35px;
        height: 35px;
        background: url('data:image/svg+xml;utf8,<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="23.516px" height="23.516px" viewBox="0 0 23.516 23.516" style="enable-background:new 0 0 23.516 23.516;" xml:space="preserve"><path fill="#{$lightest-gray}" d="M8.074,0.333c0.594,0,1.504,0.04,2.729,0.118v4.571c-3.721,0-5.578,1.721-5.578,5.163l0.06,2.077h3.856v10.92H0v-11.81 C0.001,4.012,2.693,0.333,8.074,0.333z M23.516,5.022V0.451c-1.066-0.078-1.818-0.118-2.254-0.118c-5.381,0-8.07,3.68-8.07,11.04 v11.81h9.139v-10.92h-3.857l-0.059-2.077C18.413,6.941,20.116,5.22,23.516,5.022z"/></svg>');
        background-repeat: no-repeat;
        background-size: 100%;
        @include transform(skewX(-20deg));
      }
    }

    p:last-child {
      @extend %quote-text;
      font-weight: bold;
    }
  }
}


#performances {
	header {
		background-image: url('~/assets/images/sections/migue_new_1.jpg');
	}
	&.parallax-container {
		background-image: url('~/assets/images/sections/migue_new_1.jpg');
		header {
			background: none;
		}

	}
}

#records {
	header {
		background-image: url('~/assets/images/sections/leaving.jpg');
	}
	&.parallax-container {
		background-image: url('~/assets/images/sections/leaving.jpg');
		header {
			background: none;
		}

	}
  article {
    overflow: visible;
    padding: 0;
    @include box-shadow(none);
    .content {
      padding: 0;
      @include box-shadow(0px 0px 30px rgba(0, 0, 0, 0.9));
      @include small-desktop {
        width: 100%;
      }
      & + blockquote {
        border: none;
        background-color: $footer-bg;
        &, & p {
          color: $footer-font-color;
        }
        p:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  ul.records {
    margin: 0;
  }
}

</style>
