<template>

  <div class="perfo">
    <time itemprop="startDate" :datetime="perfo.date">
      <h5 class="$$ day">{{ day }}</h5>
    </time><div class="$$ performance-info">
      <div class="$$ location"
        itemprop="location" itemscope itemtype="http://schema.org/Place">
        <!-- <meta itemprop="geo" itemscope itemtype="http://schema.org/GeoCoordinates">
          <meta itemprop="latitude" content="">
          <meta itemprop="longitude" content="">
        </meta> -->
        <meta itemprop="name" :content="perfo.location.city">
        <div class="$$ address"
          itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
            <span class="$$ city" v-if="perfo.place">{{ perfo.place }}, </span>
            <span class="$$ city" itemprop="addressLocality">{{ perfo.location.city }}</span>
            <span class="$$ region" itemprop="addressRegion">({{ perfo.location.region }})</span>
            <span class="$$ country" itemprop="addressCountry">{{ perfo.location.country }}</span>
        </div>
      </div>
      <meta itemprop="name" :content="perfo.group.name">
      <a v-if="perfo.group.link"
        class="$$ group"
        :href="perfo.group.link"
        itemprop="performer" itemscope itemtype="http://schema.org/MusicGroup">
        <meta itemprop="url" :content="perfo.group.link">
        <span itemprop="name">{{ perfo.group.name }}</span>
      </a>
      <span
        v-else
        class="$$ group"
        itemprop="performer" itemscope itemType="http://schema.org/MusicGroup">
        <meta itemprop="name" :content="perfo.group.name">
        {{ perfo.group.name }}
        <span v-if="perfo.group.director">
          (Dir.: {{ perfo.group.director }})
        </span>
      </span>
      <div v-if="perfo.program"
        class="$$ program"
        itemprop="description">
          {{ perfo.program.name }}
          <span v-if="perfo.program.author">
            ({{ perfo.program.author }})
          </span>
        </div>
        <div v-if="perfo.info" class="$$ extra-info">{{ perfo.info }}</div>
        <span v-if="perfo.location.place" class="$$ place">{{ perfo.location.place }}</span>
        <div class="name" itemprop="name">{{ perfo.name }}</div>
    </div>
  </div>

</template>

<script>

  import getCalendarDay from '~/utils/getCalendarDay'

  export default {
    props: ['perfo'],
    computed: {
      day: function () {
        return getCalendarDay(this.perfo.date)
      }
    }
  }

</script>
