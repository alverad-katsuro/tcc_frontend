/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '172.17.0.1',
                port: '11000',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '11000',
            },
            {
                protocol: 'https',
                hostname: 'api.meubolsista.alverad.com.br',
                port: '*',
            },
        ],
    },

}

module.exports = nextConfig
