import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favourites: [],
   cartItems: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
    
     toggleFavourite: (state, action) => {
      const item = action.payload;

      const exists = state.favourites.find(
        (fav: any) => fav.id === item.id
      );

      if (exists) {
        // remove
        state.favourites = state.favourites.filter(
          (fav: any) => fav.id !== item.id
        );
      } else {
        // add
        state.favourites.push(item);
      }
    },
   
    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.cartItems.find(
        (item: any) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          product,
          quantity: 1,
        });
      }
    },

    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.cartItems.find(
        (item: any) => item.product.id === productId
      );
      if (item) item.quantity += 1;
    },

    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.cartItems.find(
        (item: any) => item.product.id === productId
      );

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (item: any) => item.product.id !== productId
          );
        }
      }
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item: any) => item.product.id !== productId
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
 toggleFavourite,
 addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = userSlice.actions;
export default userSlice.reducer;
