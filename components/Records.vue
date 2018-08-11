<template>
  <ul class="record-list && records">
    <li
      v-for="record in parameters.records"
      :key="record.title">
      <record :record="record"/>
    </li>
  </ul>
</template>

<style lang="scss">

@import "compass/css3";
@import "compass/utilities";
@import "variables";
@import "typography";
@import "media_queries";

.records {
	$record-animation-duration: 0.3s;
	@include clearfix;
	background: $footer-bg;
	h3 {
		a{
			text-decoration: none;
		}
	}

	.record {
		@include clearfix;
		@include box-sizing(border-box);
		border-top: 2px solid $footer-bg;
		margin: 0;
		display: inline-block;
		vertical-align: top;
		width: 100%;
		position: relative;
		@include transition(all $record-animation-duration ease-in-out);
		&:before {
			content: "";
			display: block;
			padding-top: 87%;
		}
		@include breakpoint(400px) {
			width: 50%;
			&:nth-child(odd) {
				border-right: 2px solid $footer-bg;
			}
		}
		@include breakpoint(750px) {
			//padding: 2px 0 0 2px;
			width: 25%;
			border: none!important;
			float: right;
			.image-container {
				border: 1px solid $footer-bg;
			}
			&:first-child {
				width: 50%;
				float: left;
				.record-info .record-title {
					font-size: 44px;
				}
			}
		}

		@include breakpoint(1450px) {
			width: 16.66666%;
			&:first-child {
				width: 33.333333%;
			}
		}
		.image-container {
			position:  absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
		}
		.record-image {
			@include filter(blur(0));
			width: 100%;
			display: block;
			@include transition(all $record-animation-duration ease-in-out);
		}
		.record-info {
			//display: none;
			@include box-sizing(border-box);
			padding: 7%;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background-color: trasnparent;
			z-index: 101;
			margin-bottom: -4px;
			@include transition(background-color $record-animation-duration ease-in-out);
			.record-title, .group, .date {
				color: white;
				font-style: italic;
				font-weight: 200;
				margin: 0;
				@include transition(all $record-animation-duration ease-in-out);
			}
			.date {
				display: block;
				@include transition(all $record-animation-duration*1.2 ease-in-out $record-animation-duration/6);
			}
			.record-title {
				font-size: 33px;

				font-style: normal;
				font-weight: 800;
				margin-bottom: 13px;
				line-height: 0.95;
				@include transform(translateX(-110%));
				@include breakpoint(400px) {
					font-size: 22px;
				}
				@include breakpoint(545px) {
					font-size: 33px;
				}

				@include breakpoint(750px) {
					font-size: 22px;

				}

				@include breakpoint(1150px) {
					font-size: 33px;
				}

				@include breakpoint(1450px) {
					font-size: 22px;
				}


			}
			.group, .date {
				@include transform(translateX(110%));
			}
			.links {
				position: absolute;
				bottom: 7%;
				left: 0;
				width: 100%;
				display: flex;
				justify-content: center;
			}
			.record-link {
				a span {text-indent: -99999px;}
				display: inline-block;
				width: 15%;
				position: relative;
				margin: 0 5%;
				@include transform(translateY(200px));
				&:before {
					content: "";
					display: block;
					padding-top: 100%; 	/* initial ratio of 1:1*/
				}

			}
			.spotify a, .itunes a, .amazon a {
				display: block;
				background-size: 100%;
				background-position: center;
				background-repeat: no-repeat;
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
			}
			.spotify {
				@include transition(all $record-animation-duration ease-in-out);
				a{
					//background-image: url($spotify-logo);
				}
			}
			.itunes {
				@include transition(all $record-animation-duration*1.2 ease-in-out $record-animation-duration/6);
				a{
					//background-image: url($apple-logo);
				}
			}
			.amazon {
				@include transition(all $record-animation-duration*1.4 ease-in-out $record-animation-duration/3);
				a{
					//background-image: url($amazon-logo);
				}
			}

		}
		&:hover {
			.record-info {
				background-color: rgba(0,0,0,0.5);
				.record-title,
				.group,
				.date {
					@include transform(translateX(0));
				}
				.record-link {
					@include transform(translateY(0));
				}
			}
			img {
				@include filter(blur(16px));
			}
		}
	}
}

</style>

<script>

  import Record from './Record.vue'

  export default {
    components: {
      Record
    },
    props: ['parameters']
  }
</script>
