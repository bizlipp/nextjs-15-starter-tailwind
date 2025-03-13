/** @type {import('next').NextConfig} */
const nextConfig = {
    // Disable TypeScript type checking during build
    typescript: {
        // !! WARN !!
        // This is a temporary fix to bypass TypeScript errors
        // You should eventually remove this once the package issues are resolved
        ignoreBuildErrors: true
    },

    // Disable ESLint during build (also temporary)
    eslint: {
        // This is also temporary
        ignoreDuringBuilds: true
    },

    // Configure allowed image domains
    images: {
        domains: ['images.unsplash.com']
    }

    // Other Next.js config options can go here
};

module.exports = nextConfig;
