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

<script>

  //import AppNav from '~/components/AppNav.vue'

  export default {
    // components: {
    //   AppNav
    // }
  }

</script>
