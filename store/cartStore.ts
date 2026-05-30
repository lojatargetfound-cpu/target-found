import { create } from 'zustand'

import { persist } from 'zustand/middleware'

interface Product {
  id: number

  name: string

  brand: string

  image: string

  price: number

  quantity: number
}

interface CartStore {
  cart: Product[]

  isOpen: boolean

  openCart: () => void

  closeCart: () => void

  addToCart: (product: Product) => void

  removeFromCart: (id: number) => void

  increaseQuantity: (id: number) => void

  decreaseQuantity: (id: number) => void
}

export const useCartStore =
  create<CartStore>()(
    persist(
      (set) => ({
        cart: [],

        isOpen: false,

        openCart: () =>
          set({
            isOpen: true,
          }),

        closeCart: () =>
          set({
            isOpen: false,
          }),

        addToCart: (product) =>
          set((state) => {
            const existingProduct =
              state.cart.find(
                (item) =>
                  item.id === product.id
              )

            if (existingProduct) {
              return {
                cart: state.cart.map(
                  (item) =>
                    item.id === product.id
                      ? {
                          ...item,

                          quantity:
                            item.quantity + 1,
                        }
                      : item
                ),
              }
            }

            return {
              cart: [
                ...state.cart,

                {
                  ...product,

                  quantity: 1,
                },
              ],
            }
          }),

        removeFromCart: (id) =>
          set((state) => ({
            cart: state.cart.filter(
              (item) => item.id !== id
            ),
          })),

          clearCart: () =>
  set({
    cart: [],
  }),
        increaseQuantity: (id) =>
          set((state) => ({
            cart: state.cart.map(
              (item) =>
                item.id === id
                  ? {
                      ...item,

                      quantity:
                        item.quantity + 1,
                    }
                  : item
            ),
          })),

        decreaseQuantity: (id) =>
          set((state) => ({
            cart: state.cart
              .map((item) =>
                item.id === id
                  ? {
                      ...item,

                      quantity:
                        item.quantity - 1,
                    }
                  : item
              )
              .filter(
                (item) => item.quantity > 0
              ),
          })),
      }),

      {
        name: 'target-found-cart',
      }
    )
  )