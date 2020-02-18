const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = function override (config, env) {

	env == 'production' && config.plugins.push(new JavaScriptObfuscator({
		rotateUnicodeArray: true
	}));

	return config;
};
