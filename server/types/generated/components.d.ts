import type { Schema, Attribute } from '@strapi/strapi';

export interface OrderItemOrderedItem extends Schema.Component {
  collectionName: 'components_order_item_ordered_items';
  info: {
    displayName: 'OrderedItem';
    description: '';
  };
  attributes: {
    quantity: Attribute.Integer;
    amount: Attribute.Decimal;
    product: Attribute.Relation<
      'order-item.ordered-item',
      'oneToOne',
      'api::product.product'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'order-item.ordered-item': OrderItemOrderedItem;
    }
  }
}
