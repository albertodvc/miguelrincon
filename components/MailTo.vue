<script>
	export default {
		methods: {
			mailify(name, $event) {
				switch(name) {
					case 'm': name += 'igueliuto';   break;
					case 's': name += 'econd';  break;
					case 't': name += 'third';  break;
					case 'f': name += 'fourth'; break;
				}
				var domain = new Array('com','.','i','a','m','g').reverse().toString();
				domain = domain.replace(/\,/g,'').replace(/(i)/g,'$1l');
				this.mail = name + '@' + domain;
				window.location.href = `mailto:${this.mail}`;
				return true;
			}
		},
		data: function () {
			return {
				mail: null,
			}
		}
	}
</script>

<template>
	<a class="email"
    :href="'mailto:'"
		@click.prevent="mailify('m', $event)">
		<slot></slot>
	</a>
</template>
