const path = require("path");

module.exports = {
    entry: './js/main.js',
    output: {
        filename: 'webpack.js',
        path: path.resolve(__dirname, 'dist')
    },
    watch: true,
}