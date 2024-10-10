/** @type {import('next').NextConfig} */
const nextConfig = {
        images: {
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'res.cloudinary.com',
                    port: '', // Optional, leave blank if not needed
                    pathname: '/**', // Allows all image paths
                },
            ],
        },
    };
    
    export default nextConfig;
    