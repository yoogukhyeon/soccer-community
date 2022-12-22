module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
        ],
    },
    ignoreWarnings: [/Failed to parse source map/],
};
