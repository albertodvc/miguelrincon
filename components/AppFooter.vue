<template>

  <footer id="contact">
    <div class="content">
      <div class="social">
        <a v-for="network in social"
          :key="network.key"
          :class="network.key"
          :href="network.url">
          <component :is="network.key"/>
          </a>
      </div>
      <div class="contact-info">
        <span class="management">
          Matt Roggo | RG Management
        </span>
        <span class="phone">
          <img svg-inline class="phone-icon" src="./icons/phone.svg" />
          +0041 79 259 41 46
        </span>
        <MailTo>
          <img svg-inline class="mail-icon" src="./icons/mail.svg" />
          {{ $t('sections.footer.mail') }}
        </MailTo>
      </div>
      <div class="i18n">
        <a v-for="lang in otherLangs"
          :key="lang"
          :href="`/${lang}`">
          <img :src="require(`~/assets/images/flags/${lang}.svg`)" :title="$t(`sections.footer.i18n.${lang}`)"/>
        </a>
      </div>
    </div>
  </footer>

</template>

<style lang="scss">

@import "compass/css3";
@import "compass/utilities";
@import "variables";
@import "typography";
@import "media_queries";

footer {

	background-color: $footer-bg;
	.content {
		padding: 20px 0;
		@include breakpoint(650px) {
			display: table;
			margin: 0 auto;
		}
	}
	.social {
		width: 300px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		@include breakpoint(650px) {
			display: inline-flex;
		}
		a {
			position: relative;
			display: inline-block;
			width: $social-button-size;
			height: $social-button-size;
			border-radius: 50%;
			text-align: center;
			margin: 0;
			padding: $social-button-size/3;
			box-shadow: 0px 0px 0px 50px rgba(255, 255, 255, 0);
			@include transition(all $link-transition-duration ease-in-out);

			#facebook,
			#twitter,
			#youtube {
				fill: $footer-font-color;
				@include transition(fill $link-transition-duration ease-in-out); }

			&:hover {
				box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 1);
				@include transition(all $link-transition-duration ease-in-out);
				background: $footer-font-color;
				#facebook,
				#twitter,
				#youtube {
					fill: $footer-bg;
					@include transition(fill $link-transition-duration ease-in-out);
				}

			}
		}
	}
	.contact-info {
		text-align: center;
		margin-top: 10px;
		@include breakpoint(650px) {
			display: inline-block;
			padding-left: 55px;
		}
		.email,
		.phone,
    .management {
			display: block;
			margin-bottom: 5px;
			color: $footer-font-color;
			text-decoration: none;
			&:visited {
				color: $footer-font-color;
			}
		}
		.phone-icon,
		.mail-icon {
			width: 13px;
			height: 13px;
			display: inline-block;
    		vertical-align: middle;
		}
	}
  .i18n {
    text-align: center;
    padding: 20px;
    overflow: hidden;
    a {
      display: inline-block;
      width: 32px;
      transform: scale(1);
      transition: transform $link-transition-duration ease-in-out;

      img {
        width: 100%;;
      }

      &:hover {
        transform: scale(1.2);
      }
    }
  }
}

</style>

<script>

  import Youtube from '~/components/logos/Youtube.vue'
  import Facebook from '~/components/logos/Facebook.vue'
  import Twitter from '~/components/logos/Twitter.vue'
  import MailTo from '~/components/MailTo'

  export default {
    components: {
      Youtube,
      Facebook,
      Twitter,
      MailTo
    },
    data: function() {
      return {
        social: [
          {
            key: 'youtube',
            url: 'https://www.youtube.com/channel/UCEBabKvfIlrr5_UBTiqvUtA'
          },
          {
            key: 'facebook',
            url: 'https://www.facebook.com/Migueliuto'
          },
          {
            key: 'twitter',
            url: 'https://twitter.com/Migueliuto79'
          }
        ],
        langs: ['en-US', 'es-ES']
      }
    },
    computed: {
      otherLangs() {
        return this.langs.filter(lang => lang !== this.$store.state.locale)
      }
    }
  }

</script>
