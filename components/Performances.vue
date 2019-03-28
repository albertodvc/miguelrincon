<template>

  <ul class="perfo-list">
    <li class="perfo-list__year"
      v-for="year in dates"
      :key="year.year">
      <h3 class="perfo-list__year-label $$ year">{{ year.year }}</h3>
      <ul class="perfo-list__months $$ year-performances">
        <li class="perfo-list__month"
          v-for="month in year.months"
          :key="year.year+month.month">
          <h4 class="perfo-list__month-label $$ month">{{ $t('dates.months.'+month.month) }}</h4>
          <ul class="perfo-list__perfoes $$ month-performances">
            <li class="perfo-list__perfo $$ performance"
              v-for="perfo in month.perfoes"
              :key="perfo._id"
              itemprop="event" itemscope itemtype="http://schema.org/MusicEvent">
              <perfo class="perfo-list__perfo__component"
                :perfo="perfo"/>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>

</template>

<style lang="scss">

@import "compass/css3";
@import "compass/utilities";
@import "variables";
@import "media_queries";
@import "colors";
@import "typography";

$performance--margin: 15px;

#performances {

	time {
		//float: left;
		display: block;
		@include breakpoint(450px) {
			display: inline-block;
			vertical-align: top;
		}
		@include breakpoint(650px) {
			width: calc(33% -#{$performance--margin});
			text-align: right;
		}
	}
}
.day {
	margin: 0;
	padding: 0;
	color: $black;


	font-size: 50px;
  background: white;
  line-height: 40px;
  @include breakpoint(500px) {
    font-size: 75px;
    line-height: 55px;
  }
  @include breakpoint(600px) {
    font-size: 100px;
    line-height: 75px;
  }

}
.year {
	font-size: 60px;
	color: $lightest-gray;
	text-align: right;
	margin: 0;
	line-height: 60px;
	@include breakpoint(500px) {
		font-size: 75px;
		line-height: 75px;
	}
	@include breakpoint(600px) {
		font-size: 120px;
    line-height: 91px;
	}

}
.month {
	@extend %mid-headline-text;
	font-size: 30px;
	color: $black;
	margin-top: 12px;
	margin-bottom: 0px;
	line-height: 30px;
	@include breakpoint(600px) {
    	margin-bottom: 30px;
    	font-size: 42px;
    	line-height: 42px;
    }
}

.performance-info {
	@extend %body-text;
	@include box-sizing(border-box);
	min-height: 55px;
	padding: 5px 0 5px $small-padding;
	margin-left: $performance--margin;
	border-left: 3px solid $black;

	@include breakpoint(450px) {
		display: inline-block;
		vertical-align: top;
		padding: 0 0 0 10px;
	}
    @include breakpoint(600px) {
    	min-height: 75px;
    }
    @include breakpoint(650px) {
    	width: 66%;
    	padding: 5px 0 5px $performance--margin;
    }
    .group {
    	display: block;
    	@extend %small-headline-text;
		line-height: 1;
	}
}

.address {
	display: inline;
}
.performance {
	@include box-sizing(border-box);
	margin-bottom: 20px;
	display: inline-block;
	vertical-align: top;
	width: 100%;
	.name {
		font-style: italic;
		margin-top: 7px;
	}
	@include breakpoint(600px) {
    	margin-bottom: 30px;
    }
}
.location {
	margin-bottom: 3px;
}
.city {
	@extend %small-headline-text;
	line-height: 1;
}
.place {
	&:before {
		content: " - ";
	}
}
.country, .program {
	color: $mid-gray;
}


</style>

<script>

  import Perfo from '~/components/Perfo.vue'
  import EventsToCalendar from '~/utils/eventsToCalendar.js'

  export default {
    components: {
      Perfo
    },
    props: ['parameters'],
    computed: {
      dates: function () {
        return EventsToCalendar(this.parameters.performances)
      }
    }
  }

</script>
