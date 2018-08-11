<template>

  <section :id="section" class="section parallax">
    <header v-center-titles class="section__header">
      <h2>{{ section }}</h2>
    </header>
    <article>
      <component class="content" :is="section" v-bind="{ parameters: parameters }"></component>
      <blockquote class="section__quote">
        <p>{{ parameters.quote.text }}</p>
        <p>{{ parameters.quote.author }}</p>
      </blockquote>
    </article>

  </section>

</template>

<script>

  import FrontPage from '~/components/FrontPage.vue'
  import Performances from '~/components/Performances.vue'
  import Records from '~/components/Records.vue'

  import throttle from 'lodash/fp/throttle'

  var ViewPort = {
    height: function() {
      return (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
    },
    width: function() {
      return (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    }
  }


  export default {
    components: {
      FrontPage,
      Performances,
      Records
    },
    directives: {
      centerTitles: {
        // directive definition
        inserted: function (el) {
          var $title = el.children[0]
          var center = () => {
            var setCssProperties = (element, opacity, translate) => {
              var styles = {}
              if (typeof opacity != 'undefined' && opacity != null) {
                styles['opacity'] = opacity
              }
              if (typeof translate != 'undefined' && translate != null) {
                var value = 'translate3d(0px, ' + translate + 'px, 0px)'
                // styles['-ms-transform'] = value
                // styles['-webkit-transform'] = value
                styles['transform'] = value
              }
              Object.keys(styles).forEach( style => element.style[style] = styles[style])
            }

            var viewportHeight = ViewPort.height()
            var scrollPosition = window.scrollY
            var offset = el.parentElement.offsetTop - scrollPosition
            var titleStyle = window.getComputedStyle($title)
            var margin = titleStyle.getPropertyValue('margin-top')
            var parallaxRatio = 1.8



            if (scrollPosition <= viewportHeight) {
              if (titleStyle.getPropertyValue('opacity') <= 0) {
                $title.classList.add('hidden')
              } else {
                $title.classList.remove('hidden')
              }
              setCssProperties($title, 1 - (scrollPosition / viewportHeight * 1.2), -scrollPosition / parallaxRatio)
              // if ($(this).children('.video-wrapper').hasClass('active')) {
              //   $(this).children('.video-wrapper').css(getCssProperties(1 - (scrollPosition / viewportHeight * 1.2)))
              // }
            } else {
              if (titleStyle.getPropertyValue('opacity') <= 0) {
                $title.classList.add('hidden')
              } else {
                $title.classList.remove('hidden')
              }

              if (-80 - (offset / parallaxRatio) >= -80) {
                setCssProperties($title, 1 + offset / viewportHeight * 1.2, -offset / parallaxRatio)
              } else {
                setCssProperties($title, 1, 0)
              }
            }
            console.log($title.textContent, viewportHeight, scrollPosition, offset, $title.style.transform)
          }
          center()
          window.addEventListener("scroll", throttle(10, ()=> window.requestAnimationFrame(center)))
        }
      }
    },
    props: ['section', 'parameters']
  }

</script>

<style lang="scss">

@import "compass/css3";
@import "compass/utilities";
@import "variables";
@import "typography";


.section {
  &__header {
    height: 100vh;
  }

  &__quote {
    color: lighten($body-text-color, 10%);
    font-weight: 200;

    p:first-child {
      @extend .quote-text;

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
      @extend .quote-text;
      font-weight: bold;
    }
  }
}

</style>
