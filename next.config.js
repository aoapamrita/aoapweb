/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["images.unsplash.com", 'res.cloudinary.com']
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === "production"
    }
}

module.exports = nextConfig
