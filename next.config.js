/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "oaidalleapiprodscus.blob.core.windows.net",
      "tinder-customers.netlify.app",
      "images-ssl.gotinder.com",
    ],
  },
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: `https://tinder-customers.netlify.app`,
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
