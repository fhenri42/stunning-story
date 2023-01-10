const nextTranslate = require('next-translate');
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: true, // process.env.ANALYZE === 'true',
// });

module.exports = nextTranslate(
  {
    reactStrictMode: false,
    swcMinify: true,
    publicRuntimeConfig: {
      SELF_URL: 'http://localhost:3000',
    },
    serverRuntimeConfig: {
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      STRAPI_URL: process.env.STRAPI_URL,
      STRAPI_TOKEN: process.env.STRAPI_TOKEN,
      DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
      DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_ID,
      SECRET: process.env.SECRET,
    },
  },
);

// TODO Ajouter la posibiliter dajouter une image a une histoire et de povoir modifier les information sur cette hitoire.
// TODO Ecrire l'histoire d'expemle.
// TODO I18n all the text.
// TODO add tags to story.
// TODO add difficulty to story.
// TODO add disclaimer builder not good for mobile.
// TODO add docs part.
// TODO add roadmap part.
