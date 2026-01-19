import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import ProductCard from '../src/components/ProductCard';
import {
  addToCart,
  toggleFavourite,
  increaseQuantity,
  decreaseQuantity,
} from '../src/redux/slices/userSlice';



const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

import { useSelector } from 'react-redux';



const product = {
  id: 1,
  title: 'Product 1',
  price: 100,
  images: ['https://test.com/img.png'],
};



describe('ProductCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product title and price', () => {
    (useSelector as jest.Mock).mockImplementation((cb) =>
      cb({
        user: {
          favourites: [],
          cartItems: [],
        },
      })
    );

    const { getByText } = render(<ProductCard item={product} />);

    expect(getByText('$100')).toBeTruthy();
    expect(getByText('Product 1')).toBeTruthy();
  });

  it('shows Add to Cart when product is not in cart', () => {
    (useSelector as jest.Mock).mockImplementation((cb) =>
      cb({
        user: {
          favourites: [],
          cartItems: [],
        },
      })
    );

    const { getByText } = render(<ProductCard item={product} />);

    fireEvent.press(getByText('Add to Cart'));

    expect(mockDispatch).toHaveBeenCalledWith(addToCart(product));
  });

  it('shows quantity controls when product is in cart', () => {
    (useSelector as jest.Mock).mockImplementation((cb) =>
      cb({
        user: {
          favourites: [],
          cartItems: [
            {
              product,
              quantity: 2,
            },
          ],
        },
      })
    );

    const { getByText } = render(<ProductCard item={product} />);

    expect(getByText('2')).toBeTruthy();
    expect(getByText('+')).toBeTruthy();
    expect(getByText('−')).toBeTruthy();
  });

  it('increments quantity when + is pressed', () => {
    (useSelector as jest.Mock).mockImplementation((cb) =>
      cb({
        user: {
          favourites: [],
          cartItems: [
            {
              product,
              quantity: 1,
            },
          ],
        },
      })
    );

    const { getByText } = render(<ProductCard item={product} />);

    fireEvent.press(getByText('+'));

    expect(mockDispatch).toHaveBeenCalledWith(
      increaseQuantity(product.id)
    );
  });

  it('decrements quantity when − is pressed', () => {
    (useSelector as jest.Mock).mockImplementation((cb) =>
      cb({
        user: {
          favourites: [],
          cartItems: [
            {
              product,
              quantity: 2,
            },
          ],
        },
      })
    );

    const { getByText } = render(<ProductCard item={product} />);

    fireEvent.press(getByText('−'));

    expect(mockDispatch).toHaveBeenCalledWith(
      decreaseQuantity(product.id)
    );
  });

  it('toggles favourite when heart is pressed', () => {
    (useSelector as jest.Mock).mockImplementation((cb) =>
      cb({
        user: {
          favourites: [],
          cartItems: [],
        },
      })
    );

    const { getByText } = render(<ProductCard item={product} />);

    fireEvent.press(getByText('🤍'));

    expect(mockDispatch).toHaveBeenCalledWith(
      toggleFavourite(product)
    );
  });
});
