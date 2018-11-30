var path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")

const htmlPlugin = new HtmlWebPackPlugin({
	template: "./src/app.html",
	filename: "./index.html",
})

const cleanPlugin = new CleanWebpackPlugin(["dist"])

module.exports = {
	mode: "development",
	entry: {
		app: "./src/index.ts",
		vendor: ["react", "react-dom"],
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].js",
	},
	plugins: [cleanPlugin, htmlPlugin],
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
				test: /\.html$/,
				use: {
					loader: "html-loader",
				},
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
}
