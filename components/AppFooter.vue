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
        <span class="phone">
          <img svg-inline class="phone-icon" src="./icons/phone.svg" />
          +0041 786 479 018
        </span>
        <a class="email" id="xmail" onmouseover="mrincon_mail('m');" onfocus="mrincon_mail('m');" href="#">
          <img svg-inline class="mail-icon" src="./icons/mail.svg" />
          @Contact Legend
        </a>
      </div>
    </div>
  </footer>

</template>

<script>

  import Youtube from '~/components/logos/Youtube.vue'
  import Facebook from '~/components/logos/Facebook.vue'
  import Twitter from '~/components/logos/Twitter.vue'


  export default {
    components: {
      Youtube,
      Facebook,
      Twitter
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
            url: 'https://www.facebook.com/miguelrincon1979'
          },
          {
            key: 'twitter',
            url: 'https://www.facebook.com/miguelrincon1979'
          }
        ]
      }
    }
  }

</script>
