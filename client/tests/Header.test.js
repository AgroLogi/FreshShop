import { render, screen } from '@testing-library/react';
import Header from '../app/_components/Header';
import { UpdateCart } from '../app/_context/UpdateCart';

const mockUpdateCart = { updateCart: false, setUpdateCart: jest.fn() };

describe('Header Component', () => {
  it('renders the logo', () => {
    render(
      <UpdateCart.Provider value={mockUpdateCart}>
        <Header />
      </UpdateCart.Provider>
    );

    // Check if the logo is rendered
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });
});
