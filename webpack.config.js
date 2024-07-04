import svgr from '@svgr/webpack';

export default {
module: {
    rules: [
        {
            test: /\.svg$/,
            use: [svgr],
        },
    ],
},
};
