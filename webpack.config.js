var path = require("path")

module.exports = {
	mode: "production",
	entry: {
		app: "./src/index.ts",
		vendor: ["react", "react-dom"],
	},
	output: {
		path: path.resolve("dist"),
		filename: "index.js",
	},
	resolve: {
		extensions: [".ts", ".tsx"],
	},
	devtool: "source-map",
	resolve: {
		extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "ts-loader",
				},
			},
			{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
}
