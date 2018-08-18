<template>
  <div itemscope itemtype="http://schema.org/MusicGroup">
    <app-header/>
    <nuxt/>
    <app-footer/>
  </div>
</template>

<script>

  import AppHeader from '~/components/AppHeader.vue'
  import AppFooter from '~/components/AppFooter.vue'

  export default {
    components: {
      AppHeader,
      AppFooter
    }
  }

</script>

<style lang="scss">


@import "compass/css3";
@import "compass/utilities";
@import "variables";
@import "normalize";
@import "typography";
@import "layout";
@import "backgrounds";
@import "colors";
@import "shadows";
@import "media_queries";
@import "modularscale";


html {
	width: 100%;
	font-family: "Myriad Pro", Myriad, sans-serif;
}

body {
	width: 100%;
  background: $alt-black;

	@include ipad-landscape {
		-webkit-text-size-adjust: none;
	}
}
p {
	@extend %body-text;
	color: $body-text-color;
}

a { color: $highlight-text-color; }
ul {
	padding: 0;
	list-style-type: none;
}

</style>
