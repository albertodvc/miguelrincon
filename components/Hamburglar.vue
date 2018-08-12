<script>

	export default {
		props: {
			expanded: false
		}
	}
</script>

<template>
	<div class="hamburglar navigator-toggle" :class="{ 'is-open': expanded, 'is-closed': !expanded }">
		<div class="burger-icon">
			<div class="burger-container">
				<span class="burger-bun-top"></span>
				<span class="burger-filling"></span>
				<span class="burger-bun-bot"></span>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>

	@import "colors";
	@import "variables";

	$color: $white;
	$animation: .2s;
	$scale: 0.6;
	$width: 36px;
	$height: 28px;

	.hamburglar {
		transform: scale($scale);
		position: relative;
		display: block;
		width: $width;
		height: $height;
		-webkit-touch-callout: none;
		user-select: none;
	}


	// All good burgers need filling!

	.burger-icon {
		position: absolute;
	}

	.burger-container {
		position: relative;
		height: $height;
		width: $width;
	}

	.burger-bun-top,
	.burger-bun-bot,
	.burger-filling {
		position: absolute;
		display: block;
		height: $height / 7;
		width: $width;
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
			width: $width;
			left: 200px;
		}
		100% {
			width: $width;
			left: 0px;
		}
	}

	@keyframes burger-fill-out {
		0% {
			width: $width;
			left: 0px;
		}
		100% {
			left: 200px;
		}
	}
</style>
