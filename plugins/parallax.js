
import Vue from 'vue'
import throttle from 'lodash/fp/throttle'

var ViewPort = {
  height: function() {
    return (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
  },
  width: function() {
    return (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
  }
}

function findAncestor (el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return el;
}

const parallax = {
  // directive definition
  inserted: function (el) {
    var container = findAncestor(el, 'parallax-container')
    if (!container) return
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
      var offset = container.offsetTop - scrollPosition
      var titleStyle = window.getComputedStyle(el)
      var margin = titleStyle.getPropertyValue('margin-top')
      var parallaxRatio = 1.8



      if (scrollPosition <= viewportHeight) {
        if (titleStyle.getPropertyValue('opacity') <= 0) {
          el.classList.add('hidden')
        } else {
          el.classList.remove('hidden')
        }
        setCssProperties(el, 1 - (scrollPosition / viewportHeight * 1.2), -scrollPosition / parallaxRatio)
        // if ($(this).children('.video-wrapper').hasClass('active')) {
        //   $(this).children('.video-wrapper').css(getCssProperties(1 - (scrollPosition / viewportHeight * 1.2)))
        // }
      } else {
        if (titleStyle.getPropertyValue('opacity') <= 0) {
          el.classList.add('hidden')
        } else {
          el.classList.remove('hidden')
        }

        if (-80 - (offset / parallaxRatio) >= -80) {
          setCssProperties(el, 1 + offset / viewportHeight * 1.2, -offset / parallaxRatio)
        } else {
          setCssProperties(el, 1, 0)
        }
      }
    }
    center()
    window.addEventListener("scroll", throttle(10, ()=> window.requestAnimationFrame(center)))
  }
}

const parallaxContainer = {
  bind: function(el) {
    const touch = 'ontouchstart' in document.documentElement
    if ( !touch && ViewPort.width() > 1024) {
      el.classList.add('parallax-container')
    }
  }
}

Vue.directive('parallax', parallax)
Vue.directive('parallaxContainer', parallaxContainer)
