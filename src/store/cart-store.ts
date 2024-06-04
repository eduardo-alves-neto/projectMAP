import { create } from 'zustand';

import { MoviesInCartType } from '@/types/movie-in-cart';

type CartStore = {
  cart: MoviesInCartType[];
  addToCart: (item: MoviesInCartType) => void;
  removeToCart: (item: MoviesInCartType) => void;
  updateMovieInCart: (item: MoviesInCartType) => void;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>((set, get) => {
  return {
    cart: [],
    addToCart: (movie) => {
      set((state) => {
        const existingMovie = state.cart.find((item) => item.id === movie.id);

        if (existingMovie) {
          const cart = state.cart.map((item) =>
            item.id === movie.id ? { ...item, amount: item.amount + movie.amount } : item,
          );
          return { cart };
        } else return { cart: [...state.cart, movie] };
      });
    },
    removeToCart: (item) => {
      set((state) => ({ cart: state.cart.filter((movie) => movie.id !== item.id) }));
    },
    updateMovieInCart: (item) =>
      set((state) => {
        const cart = state.cart.map((movie) => (movie.id === item.id ? item : movie));
        return { cart };
      }),
    totalPrice: () => {
      const cartItems: MoviesInCartType[] = get().cart;
      let total = 0;
      cartItems.forEach((item) => {
        total += item.price;
      });
      return total;
    },
  };
});
