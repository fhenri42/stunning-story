/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  publicRuntimeConfig: {
    SELF_URL: 'http://localhost:3000',
  },
  serverRuntimeConfig: {
    STRAPI_URL: 'http://localhost:1337',
    STRAPI_TOKEN: '58e9ee1a78723c27b4e20fd174615569301982fedc9d0a06875b99c85fe12c9c4913fdf5024c0a1107f2b7543829de3bad3581f0b391029a11d4f3d45b76c539e407b1dc013613004d4f1613654a706deb76dcc0abef29cf972928cbb7e5dedef370b7d7033514c5675c2c1a3457c566c617aaaa428ec937741c0bddf7e65bab',
  },
};

module.exports = nextConfig;

// TODO Save les ids dans les anwsers
// TODO Save les cordinates
// TODO Faire du sytle
// TODO Ecrire l'histoire d'expemle
// TODO Faire le google login.
