/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: { and: [/\.(js|ts|md)x?$/] },
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        // native: true,
                        svgoConfig: {
                            plugins: [{
                                name: 'preset-default', params: {
                                    overrides: {
                                        // disable plugins
                                        removeViewBox: false,
                                    },
                                },
                            }]
                        }
                    }
                }
            ]
        });
        return config;
    },
};

export default nextConfig;
