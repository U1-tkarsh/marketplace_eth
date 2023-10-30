/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["thrangra.sirv.com"]
  },
  async redirects() {
    return [
      {
        source: '/courses',
        destination: '/',
        permanent: true,
      },
    ];
  },
};
