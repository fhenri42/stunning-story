'use strict';

/**
 * page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::page.page',  ({ strapi }) => ({
  async create(ctx) {
console.log('Ctx =>',ctx.query.story)
const response = await super.create(ctx);
const [story] = await strapi.entityService.findMany('api::story.story', {
  fields: ['id', 'title', 'slug'],
  populate: ['pages'],
  filters: { $and: [{slug: ctx.query.story }] },
});

console.log('Entries =>',story,
{data: {
  pages: [...story.pages, response.data.id],
}},)

const newStory = await strapi.entityService.update('api::story.story', story.id, {
  data: {
    pages: [...story.pages, response.data.id],
  },
});
console.log('NewStory',newStory)

console.log(response)

return response;

  },

  // async delete(ctx) {
  //   console.log('Ctx =>',ctx.query.story)
  //   const response = await super.create(ctx);
  //   const [story] = await strapi.entityService.findMany('api::story.story', {
  //     fields: ['id', 'title', 'slug'],
  //     populate: ['pages'],
  //     filters: { $and: [{slug: ctx.query.story }] },
  //   });

  //   console.log('Entries =>',story,
  //   {data: {
  //     pages: [...story.pages, response.data.id],
  //   }},)

  //   const newStory = await strapi.entityService.update('api::story.story', story.id, {
  //     data: {
  //       pages: [...story.pages, response.data.id],
  //     },
  //   });
  //   console.log('NewStory',newStory)

  //   console.log(response)

  //   return response;

  //     },


}));
