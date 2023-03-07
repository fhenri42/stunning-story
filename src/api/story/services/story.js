'use strict';

/**
 * story service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::story.story');
