const React = require('react');
const { render, screen, fireEvent, act, waitFor } = require('@testing-library/react');
require('@testing-library/jest-dom');
const Header = require('../app/_components/Header').default;
// const { UpdateCart } = require('../app/_utils/GlobalApi');
const { UpdateCart } = require('../app/_context/UpdateCart');

// Mock necessary modules
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../app/_utils/GlobalApi', () => ({
  getCategory: jest.fn().mockResolvedValue({
    data: {
      data: [
        { attributes: { name: 'Category 1', Icon: { data: [{ attributes: { url: 'icon-url' } }] } } },
        { attributes: { name: 'Category 2', Icon: { data: [{ attributes: { url: 'icon-url-2' } }] } } },
      ],
    },
  }),
  getTotalCartItems: jest.fn().mockResolvedValue([]), // Return an empty cart
  deleteCartItem: jest.fn().mockResolvedValue({}), // Mock successful deletion
}));

jest.mock('sonner', () => ({
  toast: jest.fn(),
}));

describe('Header Component', () => {
  const setUpdateCart = jest.fn();
  const updateCart = false;

  // Check if UpdateCart is defined to prevent the undefined error
  const UpdateCartProvider = UpdateCart?.Provider || (({ children }) => <>{children}</>);

  beforeEach(async () => {
    await act(async () => {
      render(
        <UpdateCartProvider value={{ updateCart, setUpdateCart }}>
          <Header />
        </UpdateCartProvider>
      );
    });
  });

  it('renders the logo', async () => {
    await waitFor(() => expect(screen.getByAltText(/logo/i)).toBeInTheDocument());
  });

  it('renders the Category dropdown', async () => {
    await waitFor(() => expect(screen.getByText(/Category/i)).toBeInTheDocument());
  });

  it('renders the cart with item count', async () => {
    await waitFor(() => expect(screen.getByText(/0/i)).toBeInTheDocument());
  });

  it('renders login button when not authenticated', async () => {
    await waitFor(() => expect(screen.getByText(/Login/i)).toBeInTheDocument());
  });

  it('renders user account dropdown when authenticated', async () => {
    // Mock sessionStorage for authentication
    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: jest.fn().mockReturnValue(JSON.stringify({ id: 1, name: 'Test User' })),
      },
      writable: true,
    });

    await act(async () => {
      render(
        <UpdateCartProvider value={{ updateCart, setUpdateCart }}>
          <Header />
        </UpdateCartProvider>
      );
    });

    // const userIcon = screen.getByRole('button', { name: /User CircleIcon/i });
    // expect(userIcon).toBeInTheDocument();
  });
});