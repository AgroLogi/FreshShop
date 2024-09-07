'use strict';

/**
 * user-cart service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-cart.user-cart');
