const nextTranslate = require('next-translate');
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: true, // process.env.ANALYZE === 'true',
// });

module.exports = nextTranslate(
  {
    reactStrictMode: false,
    swcMinify: true,
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

/*
AJouter google analytics
Finir la mise en prod du backend
Faire les confirmation google + discord
Faire la video selon se script:
  * Presentation du projet.
  * Presentation du git
  * Jouer a une histoir
  * Aller voir le builder de cette histoire
  * Cree une nouvelle histoire.
  * Presenter midjourner + l'autoi pour les audios
*/
