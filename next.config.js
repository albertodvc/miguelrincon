const webpack = require('webpack')

module.exports = {
	webpack: function (config) {
		config.plugins.push(new webpack.DefinePlugin({
			'process.env.CTF_SPACE_ID': JSON.stringify(process.env.CTF_SPACE_ID),
			'process.env.CTF_CDA_ACCESS_TOKEN': JSON.stringify(process.env.CTF_CDA_ACCESS_TOKEN)
		}))
	return config
	}
}
