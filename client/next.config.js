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

/* HARD */
// TODO Ajouter un système d'inventaire.

// TODO Save the state of the story for the player. be able to resume the story.
// TODO Comment faire pour l'edtion des iputs des nodes ??

/* EASY */
// TODO Ecrire l'histoire d'expemle.
// TODO I18n all the text.
// TODO add difficulty to story.
// TODO add docs part.
// TODO add a Profile page.
// TODO change footer
// TODO Instagram account
