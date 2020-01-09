<template>
  <nav>
    <h1 itemprop="name"><a href="" title="Ir a la pagina de inicio" id="logo"><span>Miguel</span> Rincón</a></h1>
    <div role="button" class="menu-toggle-btn" v-on:click="navExpanded = !navExpanded">
			<toggle :expanded="navExpanded"/>
		</div>
    <ul class="navigation" :class="{'is-open': navExpanded}" id="navigator">
      <li class="nav-item" ><a class="nav__link" href="#frontPage"><span>{{ $t('links.main') }}</span></a></li>
      <li class="nav-item" ><a class="nav__link" href="#performances"><span>{{ $t('links.performances') }}</span></a></li>
      <li class="nav-item" ><a class="nav__link" href="#records"><span>{{ $t('links.discography') }}</span></a></li>
      <li class="nav-item" ><a class="nav__link" href="#contact"><span>{{ $t('links.contact') }}</span></a></li>
      <li class="nav-item" ><a href="/press_kit.zip" download="Press kit.zip" target="_blank"><span>{{ $t('links.presskit') }}</span></a></li>
    </ul>
  </nav>
</template>

<script>

  import Toggle from './Hamburglar.vue'

  export default {
    components: {
      Toggle
    },
    data: function () {
			return {
				navExpanded: false,
				pages: [
				]
			}
		}
  }
</script>

<style lang="scss">

@import "compass/css3";
@import "compass/utilities";
@import "variables";
@import "media_queries";
@import "colors";
@import "typography";

nav {
	@include box-sizing(border-box);
	width: 100%;
	height: $top-bar-height;
	position: fixed;
	z-index: 200;
	background-color: $top-bar-bg;
	@include box-shadow(0px 0px 5px rgba(0, 0, 0, 0.7));

	h1 {
		margin: 0;
    	padding-top: 19px;
    	padding-left: $small-padding;
    	float: left;

	}
	#logo {
		@include box-sizing("border-box");
		@extend %miguel-rincon-typeface;
		font-size: 40px;
		display: block;
		line-height: 34px;
		color: $white;
		text-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
		text-decoration: none;
	}
	.menu-toggle-btn {
		@include breakpoint(958px) {
			display: none;
		}
	}

	.navigation {

		position: fixed;
		top: $top-bar-height;
		bottom: 0;
		right: -$side-menu-width;
		&.is-open {right: 0;}
		background-color: $top-bar-bg;
		margin: 0;
		padding-top: 20px;
		width: $side-menu-width;
		z-index: 100;
		@include transition(all $menu-animation-time ease-in-out);
		@include box-shadow(0px 4px 5px rgba(0, 0, 0, 0.7));
		@include breakpoint(958px) {
			background: none;
			position: static;
			margin: inherit;
			float: right;
			padding: 0 $small-padding;
			width: auto;
			@include box-shadow(none);
		}
		li {
			padding: 0;
			@include breakpoint(958px) {
				display: inline-block;
			}
			a {
				text-decoration: none;
				color: $white;
				display: block;
				padding: 20px 37px;
				@include breakpoint(958px) {
					padding: 32px 12px 0px 12px;
					text-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
					margin: 0;

				}
				&:focus {
					outline : none;
				}
			}
			&:last-child {
				a {
					padding-right: 0;
				}
			}
		}
	}
}

$scale: 0.5;

.menu-toggle-btn {
  float: right;
  margin-top: 10px;
  margin-right: 10px;
  .hamburglar {
    transform: scale($scale);
    position: relative;
    display: block;
        width: 61px;
      height: 40px;
    -webkit-touch-callout: none;
    user-select: none;
  }
}

</style>
