'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/product/ProductCard'

import { useFavoriteStore } from '@/store/favoriteStore'
import { useCartStore } from '@/store/cartStore'

import {
  Heart,
  ShoppingBag,
  ArrowLeft,
} from 'lucide-react'

import Link from 'next/link'

export default function FavoritesPage() {

  const {
    favorites,
  } = useFavoriteStore()

  const {
    addToCart,
    cart,
    openCart,
  } = useCartStore()

  return (
    <>
      <Navbar
  user={null}
  cart={cart}
  openCart={openCart}
  handleGoogleLogin={() => {}}
  handleLogout={() => {}}
  search=""
  setSearch={() => {}}
  products={[]}
/>

      <main className="min-h-screen bg-[#F4F6F2]">

        {/* HERO */}

        <section className="px-6 md:px-10 pt-8 pb-10">

          <div
            className="
              max-w-[1500px]
              mx-auto
              bg-black
              rounded-[40px]
              overflow-hidden
              relative
              px-8
              md:px-14
              py-14
              text-white
            "
          >

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-black
                via-black/90
                to-transparent
              "
            />

            <div className="relative z-10">

              <div
                className="
                  w-20
                  h-20
                  rounded-full
                  bg-white/10
                  backdrop-blur-xl
                  flex
                  items-center
                  justify-center
                  mb-8
                "
              >
                <Heart
                  size={36}
                  className="fill-white"
                />
              </div>

              <p
                className="
                  uppercase
                  tracking-[0.3em]
                  text-sm
                  text-white/60
                  mb-4
                "
              >
                Sua coleção premium
              </p>

              <h1
                className="
                  text-4xl
                  md:text-6xl
                  font-black
                  leading-none
                  mb-6
                "
              >
                FAVORITOS
              </h1>

              <p
                className="
                  text-white/70
                  text-lg
                  max-w-2xl
                  leading-relaxed
                "
              >
                Seus sneakers favoritos
                reunidos em um só lugar.
              </p>

              <div
                className="
                  flex
                  items-center
                  gap-6
                  mt-10
                  flex-wrap
                "
              >

                <div
                  className="
                    bg-white/10
                    border
                    border-white/10
                    rounded-2xl
                    px-6
                    py-4
                  "
                >
                  <p className="text-white/50 text-sm mb-1">
                    Favoritos
                  </p>

                  <h3 className="text-3xl font-black">
                    {favorites.length}
                  </h3>
                </div>

                <Link
                  href="/"
                  className="
                    flex
                    items-center
                    gap-3
                    bg-white
                    text-black
                    px-7
                    py-4
                    rounded-2xl
                    font-bold
                    hover:scale-105
                    transition-all
                    duration-300
                  "
                >
                  <ArrowLeft size={18} />

                  Voltar às compras
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CONTEÚDO */}

        <section className="max-w-[1500px] mx-auto px-6 md:px-10 pb-24">

          {favorites.length === 0 ? (

            <div
              className="
                bg-white
                rounded-[40px]
                p-16
                text-center
                shadow-xl
                border
                border-gray-100
              "
            >

              <div
                className="
                  w-24
                  h-24
                  rounded-full
                  bg-black
                  text-white
                  flex
                  items-center
                  justify-center
                  mx-auto
                  mb-8
                "
              >
                <Heart
                  size={40}
                />
              </div>

              <h2
                className="
                  text-4xl
                  font-black
                  mb-5
                "
              >
                Nenhum favorito ainda
              </h2>

              <p
                className="
                  text-gray-500
                  text-lg
                  max-w-xl
                  mx-auto
                  leading-relaxed
                  mb-10
                "
              >
                Explore nossa coleção
                premium e salve seus
                sneakers favoritos.
              </p>

              <Link
                href="/"
                className="
                  inline-flex
                  items-center
                  gap-3
                  bg-black
                  text-white
                  px-8
                  py-5
                  rounded-2xl
                  font-bold
                  hover:scale-105
                  transition-all
                  duration-300
                "
              >
                <ShoppingBag size={20} />

                Explorar sneakers
              </Link>
            </div>

          ) : (

            <>
              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-12
                  flex-wrap
                  gap-5
                "
              >

                <div>
                  <p
                    className="
                      uppercase
                      tracking-[0.3em]
                      text-sm
                      text-gray-400
                      mb-3
                    "
                  >
                    Selecionados por você
                  </p>

                  <h2
                    className="
                      text-4xl
                      font-black
                    "
                  >
                    Sneakers favoritos
                  </h2>
                </div>

                <div
                  className="
                    bg-white
                    px-6
                    py-4
                    rounded-2xl
                    shadow-lg
                    border
                    border-gray-100
                  "
                >
                  <p className="text-gray-400 text-sm">
                    Total salvo
                  </p>

                  <h3 className="text-3xl font-black">
                    {favorites.length}
                  </h3>
                </div>
              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  lg:grid-cols-4
                  gap-8
                "
              >
                {favorites.map((product) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                  />
                ))}
              </div>
            </>
          )}
        </section>

        <Footer />
      </main>
    </>
  )
}