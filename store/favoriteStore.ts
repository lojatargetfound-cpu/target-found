import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoriteStore {
  favorites: any[]

  addFavorite: (product: any) => void

  removeFavorite: (id: number) => void

  toggleFavorite: (product: any) => void

  isFavorite: (id: number) => boolean
}

export const useFavoriteStore =
  create<FavoriteStore>()(
    persist(
      (set, get) => ({

        favorites: [],

        addFavorite: (product) => {

          const alreadyExists =
            get().favorites.some(
              (item) =>
                item.id === product.id
            )

          if (alreadyExists) return

          set((state) => ({
            favorites: [
              ...state.favorites,
              product,
            ],
          }))
        },

        removeFavorite: (id) =>
          set((state) => ({
            favorites:
              state.favorites.filter(
                (item) =>
                  item.id !== id
              ),
          })),

        toggleFavorite: (product) => {

          const exists =
            get().favorites.some(
              (item) =>
                item.id === product.id
            )

          if (exists) {

            set((state) => ({
              favorites:
                state.favorites.filter(
                  (item) =>
                    item.id !== product.id
                ),
            }))

          } else {

            set((state) => ({
              favorites: [
                ...state.favorites,
                product,
              ],
            }))
          }
        },

        isFavorite: (id) => {

          return get().favorites.some(
            (item) =>
              item.id === id
          )
        },
      }),
      {
        name: 'favorite-storage',
      }
    )
  )