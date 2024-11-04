// ProductItem.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductItem from '../app/_components/ProductItem';

// Mock data for the product
const mockProduct = {
    attributes: {
      images: {
        data: [
          {
            attributes: {
              url: 'https://example.com/image.jpg',
            },
          },
        ],
      },
      name: 'Sample Product',
      SellingPrice: 500,
      price: 1000,
    },
  };
  
  describe('ProductItem Component', () => {
    test('renders add to cart button', () => {
      render(<ProductItem product={mockProduct} />);
  
      // Check if the "Add to Cart" button is present
      const button = screen.getByTestId('add-to-cart-button');
      expect(button).toBeInTheDocument();
    });
  });