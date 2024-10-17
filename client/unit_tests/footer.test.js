import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../app/_components/Footer';


describe('Footer component', () => {
    it('renders correctly', () => {
        const { container } = render(<Footer />);
        // console.log(container);
        expect(container).toMatchSnapshot();
      });
  
    it('has a logo image', () => {
      const { getByRole } = render(<Footer />);
      const logoImage = getByRole('img');
      expect(logoImage).toBeInTheDocument();
    });
  
    it('has a list of links', () => {
        const { getAllByRole } = render(<Footer />);
        const lists = getAllByRole('list');
        const linkList = lists[1]; // or lists[0] depending on the order
        expect(linkList).toBeInTheDocument();
      });
  
    it('has social media links', () => {
      const { getAllByRole } = render(<Footer />);
      const socialMediaLinks = getAllByRole('link');
      expect(socialMediaLinks).toHaveLength(11);
    });
  });