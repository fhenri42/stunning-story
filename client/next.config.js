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
    },
  },
);

// TODO Faire du sytle
// TODO Faire le menu pour allez sur la builder/ story
// TODO Ajouter la posibiliter dajouter une image a une histoire et de povoir modifier les information sur cette hitoire
// TODO Ecrire l'histoire d'expemle
// TODO I18n all the text
