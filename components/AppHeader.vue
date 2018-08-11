<template>
  <nav>
    <h1 itemprop="name"><a href="" title="Ir a la pagina de inicio" id="logo"><span>Miguel</span> Rincón</a></h1>
    <div id="hamburger" class="hamburglar is-closed navigator-toggle">

      <div class="burger-icon">
        <div class="burger-container">
        <span class="burger-bun-top"></span>
        <span class="burger-filling"></span>
        <span class="burger-bun-bot"></span>
        </div>
      </div>

      <!-- svg ring containter -->
      <div class="burger-ring">
        <svg class="svg-ring">
          <path class="path" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="4" d="M 34 2 C 16.3 2 2 16.3 2 34 s 14.3 32 32 32 s 32 -14.3 32 -32 S 51.7 2 34 2" />
        </svg>
      </div>
      <!-- the masked path that animates the fill to the ring -->

      <svg width="0" height="0">
          <mask id="mask">
          <path xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ff0000" stroke-miterlimit="10" stroke-width="4" d="M 34 2 c 11.6 0 21.8 6.2 27.4 15.5 c 2.9 4.8 5 16.5 -9.4 16.5 h -4" />
          </mask>
      </svg>
      <div class="path-burger">
          <div class="animate-path">
          <div class="path-rotation"></div>
        </div>
      </div>

      </div>
    <ul class="navigation" id="navigator">
      <li class="nav-item" ><a class="nav__link" href="#frontPage"><span>Front Page</span></a></li>
      <li class="nav-item" ><a class="nav__link" href="#performances"><span>Perfo</span></a></li>
      <li class="nav-item" ><a class="nav__link" href="#records"><span>Records</span></a></li>
      <li class="nav-item" ><a class="nav__link" href="#contact"><span>Contact</span></a></li>
      <li class="nav-item" ><a href="files/press_kit.zip" download="Press kit.zip" target="_blank"><span>Press Kit</span></a></li>
    </ul>
  </nav>
</template>

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
	.navigator-toggle {
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



$color: #fff;	  // background color
$animation: $menu-animation-time;	// animation speed
$scale: 0.5;

.hamburglar {
  transform: scale($scale);
  float: right;
  position: relative;
  display: block;
      width: 61px;
    height: 40px;
  // background: $blue;
  -webkit-touch-callout: none;
	user-select: none;
}

// transition mask
.path-burger {
  position: absolute;
  top: 0;
  left: 0;
  height: 68px;
  width: 68px;
  // two masks because... browser support.
  mask: url(#mask);
  -webkit-mask-box-image: url(https://raygun.io/upload/mask.svg);
}

.animate-path {
  position: absolute;
  top: 0;
  left: 0;
  width: 68px;
  height: 68px;
}

// what this does is create a small square that I then rotate behind an svg mask, giving the apparence of the line animating
.path-rotation {
  height: 34px;
  width: 34px;
  margin: 34px 34px 0 0;
  transform: rotate(0deg);
  transform-origin: 100% 0;
  &:before {
    content: '';
    display: block;
    width: 30px;
    height: 34px;
    margin: 0 4px 0 0;
    background: $color;
  }
}

// box rotation animation
@keyframes rotate-out {
  0% {
    transform: rotate(0deg);
  }
  40% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotate-in {
  0% {
    transform: rotate(360deg);
  }
  40% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

// offset moves
// dasharray is the dash size
// need to be able to control dash space size.

.hamburglar.is-open {
  .path {
    animation: dash-in $animation linear normal;
    animation-fill-mode:forwards;
  }
  .animate-path {
    animation: rotate-in $animation linear normal;
    animation-fill-mode:forwards;
  }
}

.hamburglar.is-closed {
  .path {
    animation: dash-out $animation linear normal;
    animation-fill-mode:forwards;
  }
  .animate-path {
    animation: rotate-out $animation linear normal;
    animation-fill-mode:forwards;
  }
}

.path {
  stroke-dasharray: 240;
  stroke-dashoffset: 240;
  stroke-linejoin: round;
}

@keyframes dash-in {
  0% {
    stroke-dashoffset: 240;
  }
  40% {
    stroke-dashoffset: 240;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes dash-out {
  0% {
    stroke-dashoffset: 0;
  }
  40% {
    stroke-dashoffset: 240;
  }
  100% {
    stroke-dashoffset: 240;
  }
}



// All good burgers need filling!

.burger-icon {
  position: absolute;
  padding: 20px 16px;
  height: 68px;
  width: 68px;
}

.burger-container {
  position: relative;
  height: 28px;
  width: 36px;
}

.burger-bun-top,
.burger-bun-bot,
.burger-filling {
  position: absolute;
  display: block;
  height: 4px;
  width: 36px;
  border-radius: 2px;
  background: $color;
}

.burger-bun-top {
  top: 0;
  transform-origin: 34px 2px;
}

.burger-bun-bot {
  bottom: 0;
  transform-origin: 34px 2px;
}
//.burger-filling {
//  @include transition(all,($animation/2.5),ease-in-//out);
//}
// relative parent is the button
.burger-filling {
  top: 12px;
}





// burger ring container
.burger-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 68px;
  height: 68px;
}

.svg-ring {
  width: 68px;
  height: 68px;
}


// bun animations
.hamburglar.is-open {
  .burger-bun-top {
    animation: bun-top-out $animation linear normal;
    animation-fill-mode:forwards;
  }
  .burger-bun-bot {
    animation: bun-bot-out $animation linear normal;
    animation-fill-mode:forwards;
  }
}
.hamburglar.is-closed {
  .burger-bun-top {
    animation: bun-top-in $animation linear normal;
    animation-fill-mode:forwards;
  }
  .burger-bun-bot {
    animation: bun-bot-in $animation linear normal;
    animation-fill-mode:forwards;
  }
}

@keyframes bun-top-out {
  0% {
    left: 0;
    top: 0;
    transform: rotate(0deg);
  }
  20% {
    left: 0;
    top: 0;
    transform: rotate(15deg);
  }
  80% {
    left: -5px;
    top: 0;
    transform: rotate(-60deg);
  }
  100% {
    left: -5px;
    top: 1px;
    transform: rotate(-45deg);
  }
}

@keyframes bun-bot-out {
  0% {
    left: 0;
    transform: rotate(0deg);
  }
  20% {
    left: 0;
    transform: rotate(-15deg);
  }
  80% {
    left: -5px;
    transform: rotate(60deg);
  }
  100% {
    left: -5px;
    transform: rotate(45deg);
  }
}


@keyframes bun-top-in {
  0% {
    left: -5px;
    bot: 0;
    transform: rotate(-45deg);
  }
  20% {
    left: -5px;
    bot: 0;
    transform: rotate(-60deg);
  }
  80% {
    left: 0;
    bot: 0;
    transform: rotate(15deg);
  }
  100% {
    left: 0;
    bot: 1px;
    transform: rotate(0deg);
  }
}

@keyframes bun-bot-in {
  0% {
    left: -5px;
    transform: rotate(45deg);
  }
  20% {
    left: -5px;
    bot: 0;
    transform: rotate(60deg);
  }
  80% {
    left: 0;
    bot: 0;
    transform: rotate(-15deg);
  }
  100% {
    left: 0;
    transform: rotate(0deg);
  }
}


// burger filling
.hamburglar.is-open {
  .burger-filling {
    animation: burger-fill-out $animation linear normal;
    animation-fill-mode:forwards;
  }
}

.hamburglar.is-closed {
  .burger-filling {
    animation: burger-fill-in $animation linear normal;
    animation-fill-mode:forwards;
  }
}

@keyframes burger-fill-in {
  0% {
    width: 0;
    left: 36px;
  }
  40% {
    width: 0;
    left: 40px;
  }
  80% {
    width: 36px;
    left: -6px;
  }
  100% {
    width: 36px;
    left: 0px;
  }
}

@keyframes burger-fill-out {
  0% {
    width: 36px;
    left: 0px;
  }
  20% {
    width: 42px;
    left: -6px;
  }

  40% {
    width: 0;
    left: 40px;
  }

  100% {
    width: 0;
    left: 36px;
  }
}
</style>
