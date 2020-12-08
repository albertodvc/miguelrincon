<script>
	export default {
		methods: {
			mailify(name, $event) {
				switch(name) {
					case 'm': name += 'attroggo';   break;
					case 's': name += 'econd';  break;
					case 't': name += 'third';  break;
					case 'f': name += 'fourth'; break;
				}
        var domain = new Array('com','.','o','a').reverse().toString();
        console.log(domain);
				domain = domain.replace(/\,/g,'').replace(/(o)/,'$1l');
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
