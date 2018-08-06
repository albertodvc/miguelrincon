<template>
  <div class="record"
    itemprop="album"
    itemscope
    itemtype="http://schema.org/MusicAlbum">
    <div class="image-container">
      <img class="record-image"
        itemprop="image"
        :src="record.image" :alt="record.title"/>
    </div>
    <div class="record-info">
      <h3 itemprop="name" class="record-title">{{ record.title }}</h3>
      <h4 itemprop="byArtist" itemscope itemtype="http://schema.org/MusicGroup" class="group">
          <a v-if="record.group.link"
            :href="record.group.link"
            itemprop="url"
            class="group">
            {{ record.group.name }}
          </a>
          <span v-else
            itemprop="name"
            class="group">
            {{ record.group.name }}
          </span>
      </h4>
      <span v-if="record.date"
        class="date"
        itemprop="datePublished">
        {{ record.date }}
      </span>
        <ul class="links" v-if="record.links.length">
          <li v-for="link in record.links"
            :key="link.service"
            :class="'record-link '+link.service">
            <span class="icon-container">
              <a :href="link.url">
                <component :is="link.service"></component>
              </a>
            </span>
          </li>
        </ul>
		</div>
  </div>
</template>

<script>

  import Spotify from './logos/Spotify.vue'
  import Itunes from './logos/Itunes.vue'
  import Amazon from './logos/Amazon.vue'

  export default {
    components:{
      Spotify,
      Itunes,
      Amazon
    },
    props: ['record']
  }
</script>
