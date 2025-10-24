const postcss = require("postcss");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

module.exports = {
	process(src) {
		const result = postcss([tailwindcss, autoprefixer]).process(src);

		return result.css;
	},
};
