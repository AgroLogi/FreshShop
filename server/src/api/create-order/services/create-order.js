'use strict';

/**
 * create-order service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::create-order.create-order');
