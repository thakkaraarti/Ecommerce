import React from 'react';
import { Text } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import ProductScreen from '../src/screens/Product/ProductScreen';
import userReducer from '../src/redux/slices/userSlice'
import { ApiServiceGet } from '../src/globalFunctions/apiService';
import EmptyList from '../src/globalFunctions/EmptyList';
jest.mock('../src/globalFunctions/apiService', () => ({
  ApiServiceGet: jest.fn(),
}));


// Mock ProductCard (child component)
jest.mock('../src/components/ProductCard', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return ({ item }: any) => <Text>{item.title}</Text>;
});



// Mock Loader
jest.mock('../src/components/IndicatorModal', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return ({ isLoading }: any) =>
    isLoading ? <Text>Loading...</Text> : null;
});



// Mock Empty List component
jest.mock('../src/globalFunctions/EmptyList', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return () => <Text>No data found</Text>;
});



/* =========================
   HELPER FUNCTION
========================= */

const renderWithStore = (ui: React.ReactNode) => {
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });

  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  );
};

/* =========================
   TEST CASES
========================= */

describe('ProductScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loader while fetching products', async () => {
    (ApiServiceGet as jest.Mock).mockResolvedValueOnce([]);

    const { getByText } = renderWithStore(<ProductScreen />);

    expect(getByText('Loading...')).toBeTruthy();
  });

  it('renders products when API returns data', async () => {
    (ApiServiceGet as jest.Mock).mockResolvedValueOnce([
      {
        id: 1,
        title: 'Product 1',
        price: 10,
        images: ['img'],
      },
      {
        id: 2,
        title: 'Product 2',
        price: 20,
        images: ['img'],
      },
    ]);

    const { getByText } = renderWithStore(<ProductScreen />);

    await waitFor(() => {
      expect(getByText('Product 1')).toBeTruthy();
      expect(getByText('Product 2')).toBeTruthy();
    });
  });

  it('shows empty list text when no products found', async () => {
    (ApiServiceGet as jest.Mock).mockResolvedValueOnce([]);

    const { getByText } = renderWithStore(<ProductScreen />);

    await waitFor(() => {
      expect(getByText('No data found')).toBeTruthy();
    });
  });
});
