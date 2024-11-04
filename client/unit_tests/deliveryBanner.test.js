// DeliveryBanner.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import DeliveryBanner from '../app/_components/DeliveryBanner';

// Mock data for the deliveryBanner
const mockDeliveryBanner = [
  {
    attributes: {
      image: {
        data: [
          {
            attributes: {
              url: 'https://example.com/image1.jpg',
            },
          },
        ],
      },
      alt: 'Delivery Image 1',
    },
  },
  {
    attributes: {
      image: {
        data: [
          {
            attributes: {
              url: 'https://example.com/image2.jpg',
            },
          },
        ],
      },
      alt: 'Delivery Image 2',
    },
  },
];

describe('DeliveryBanner Component', () => {
  test('renders delivery images correctly', () => {
    render(<DeliveryBanner deliveryBanner={mockDeliveryBanner} />);

    // Check if both images are rendered
    const images = screen.getAllByAltText(/delivery image/i);
    expect(images).toHaveLength(2); // Ensure there are two images

    // Check the src attribute of each image
    expect(images[0]).toHaveAttribute('src', 'https://example.com/image1.jpg');
    expect(images[1]).toHaveAttribute('src', 'https://example.com/image2.jpg');
  });
});
