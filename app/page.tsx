'use client'

import Footer from '@/components/layout/Footer'
import toast from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import { useEffect, useState } from 'react'
import Loading from '@/components/ui/Loading'
import { supabase } from '../lib/supabase'

import { useCartStore } from '@/store/cartStore'

import ProductCard from '@/components/product/ProductCard'
import CartSidebar from '@/components/cart/CartSidebar'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Home() {

  const [products, setProducts] =
    useState<any[]>([])

  const [user, setUser] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState('')

  const [selectedBrand, setSelectedBrand] =
    useState('Todos')

  const [sortBy, setSortBy] =
    useState('default')

  const [checkoutLoading, setCheckoutLoading] =
    useState(false)

  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    isOpen,
    openCart,
    closeCart,
  } = useCartStore()

  useEffect(() => {

    async function loadProducts() {

      const { data, error } =
        await supabase
          .from('products')
          .select('*')

      if (error) {
        console.log(error)
      }

      if (data) {
        setProducts(data)
      }

      setLoading(false)
    }

    async function loadUser() {

      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)
    }

    loadProducts()
    loadUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_: any, session: any) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      subscription.unsubscribe()
    }

  }, [])

  async function handleGoogleLogin() {

    await supabase.auth.signInWithOAuth({
      provider: 'google',

      options: {
        redirectTo:
          'http://localhost:3000',
      },
    })
  }

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  async function handleCheckout() {

    if (!user) {

      toast.error(
        'Faça login antes de finalizar a compra.'
      )

      return
    }

    try {

      setCheckoutLoading(true)

      const response =
        await fetch(
          '/api/checkout',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({
              cart,
              user,
            }),
          }
        )

      const data =
        await response.json()

      if (data.url) {

        window.location.href =
          data.url

      } else {

        console.log(data)

        toast.error(
          data.error ||
          'Erro ao iniciar checkout'
        )
      }

    } catch (error) {

      console.log(error)

      toast.error(
        'Erro no checkout'
      )

    } finally {

      setCheckoutLoading(false)
    }
  }

  const filteredProducts =
    products
      .filter((product: any) => {

        const matchesSearch =
          product.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          product.brand
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )

        const matchesBrand =
          selectedBrand ===
            'Todos' ||

          product.brand ===
            selectedBrand

        return (
          matchesSearch &&
          matchesBrand
        )
      })

      .sort((a: any, b: any) => {

        if (sortBy === 'low') {

          return (
            Number(a.price) -
            Number(b.price)
          )
        }

        if (sortBy === 'high') {

          return (
            Number(b.price) -
            Number(a.price)
          )
        }

        if (sortBy === 'az') {

          return a.name.localeCompare(
            b.name
          )
        }

        return 0
      })

  if (loading) {
    return <Loading />
  }

  return (
    <>

      {isOpen && (
        <CartSidebar
          cart={cart}
          closeCart={closeCart}
          removeFromCart={
            removeFromCart
          }
          increaseQuantity={
            increaseQuantity
          }
          decreaseQuantity={
            decreaseQuantity
          }
          handleCheckout={
            handleCheckout
          }
          checkoutLoading={
            checkoutLoading
          }
        />
      )}

      <main className="min-h-screen bg-[#F4F6F2]">

        <Navbar
          user={user}
          cart={cart}
          openCart={openCart}
          handleGoogleLogin={
            handleGoogleLogin
          }
          handleLogout={
            handleLogout
          }
          search={search}
          setSearch={setSearch}
          products={products}
        />

        {/* HERO */}

        <section className="px-6 md:px-10 pt-4 pb-14">

          <div
            className="
              max-w-[1400px]
              mx-auto
              relative
              overflow-hidden
              rounded-[40px]
              bg-black
              min-h-[620px]
              flex
              items-center
            "
          >

            <Image
  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  alt="Sneaker"
  fill
  className="
    absolute
    inset-0
    w-full
    h-full
    object-cover
    opacity-70
  "
/>

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-black
                via-black/80
                to-transparent
              "
            />

            <div
              className="
                relative
                z-20
                px-8
                md:px-16
                max-w-3xl
              "
            >

              <motion.div
                initial={{
                  opacity: 0,
                  y: 40,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  duration: 0.8,
                }}
              >

                <p
                  className="
                    uppercase
                    tracking-[0.35em]
                    text-sm
                    text-white/50
                    mb-6
                  "
                >
                  Nova coleção 2026
                </p>

                <h1
                  className="
                    text-5xl
                    md:text-8xl
                    font-black
                    leading-none
                    text-white
                    mb-8
                  "
                >
                  STREETWEAR
                  <br />
                  REDEFINED
                </h1>

                <p
                  className="
                    text-lg
                    md:text-2xl
                    text-white/70
                    leading-relaxed
                    mb-10
                  "
                >
                  Sneakers premium inspirados
                  na cultura urbana, design
                  futurista e performance extrema.
                </p>

                <div className="flex flex-wrap gap-4">

                  <button
                    className="
                      bg-white
                      text-black
                      px-8
                      py-4
                      rounded-2xl
                      font-bold
                      hover:scale-105
                      transition-all
                    "
                  >
                    Explorar coleção
                  </button>

                  <button
                    className="
                      border
                      border-white/20
                      text-white
                      px-8
                      py-4
                      rounded-2xl
                      font-bold
                      hover:bg-white
                      hover:text-black
                      transition-all
                    "
                  >
                    Ver lançamentos
                  </button>
                </div>

              </motion.div>
            </div>
          </div>
        </section>

        {/* BENEFÍCIOS */}

        <section className="px-6 md:px-10 pb-20">

          <div
            className="
              max-w-[1400px]
              mx-auto
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-4
              gap-5
            "
          >

            {[
              {
                title: 'Frete grátis',
                desc: 'Entregamos para todo Brasil com rapidez.',
              },

              {
                title: 'PIX instantâneo',
                desc: 'Pagamento aprovado na hora.',
              },

              {
                title: 'Produtos premium',
                desc: 'Sneakers exclusivos e limitados.',
              },

              {
                title: 'Compra segura',
                desc: 'Checkout protegido com Stripe.',
              },
            ].map((item) => (

              <div
                key={item.title}
                className="
                  bg-white
                  rounded-[28px]
                  p-7
                  shadow-lg
                  border
                  border-gray-100
                "
              >

                <h3 className="text-2xl font-black mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUTOS */}

        <section
          className="
            max-w-[1400px]
            mx-auto
            px-6
            md:px-10
            pb-20
            w-full
          "
        >

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-4
              mb-8
            "
          >

            {[
              'Todos',
              'Nike',
              'Adidas',
              'Puma',
              'Jordan',
            ].map((brand) => (

              <button
                key={brand}

                onClick={() =>
                  setSelectedBrand(
                    brand
                  )
                }

                className={`
                  px-6
                  py-3
                  rounded-2xl
                  font-semibold
                  transition-all
                  duration-300

                  ${
                    selectedBrand ===
                    brand

                      ? 'bg-black text-white shadow-xl scale-105'

                      : 'bg-white text-black hover:bg-black hover:text-white shadow-md'
                  }
                `}
              >
                {brand}
              </button>
            ))}
          </div>

          <div className="mb-14">

            <select
              value={sortBy}

              onChange={(e) =>
                setSortBy(
                  e.target.value
                )
              }

              className="
                bg-white
                border
                border-gray-200
                rounded-2xl
                px-5
                py-4
                shadow-lg
                outline-none
                focus:ring-4
                focus:ring-black/10
                font-semibold
                transition
              "
            >

              <option value="default">
                Ordenar por
              </option>

              <option value="low">
                Menor preço
              </option>

              <option value="high">
                Maior preço
              </option>

              <option value="az">
                A-Z
              </option>
            </select>
          </div>

          {filteredProducts.length === 0 ? (

            <div
              className="
                bg-white
                rounded-[32px]
                p-16
                text-center
                shadow-xl
                border
                border-gray-100
              "
            >

              <h2
                className="
                  text-4xl
                  font-black
                  mb-4
                "
              >
                Nenhum sneaker encontrado
              </h2>

              <p
                className="
                  text-gray-500
                  text-lg
                "
              >
                Tente buscar outro
                modelo ou marca.
              </p>
            </div>

          ) : (

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-3
                2xl:grid-cols-4
                gap-10
              "
            >

              {filteredProducts.map(
                (product: any) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={
                      addToCart
                    }
                  />
                )
              )}
            </div>
          )}
        </section>

        {/* DROP DA SEMANA */}

        <section className="px-6 md:px-10 pb-24">

          <div
            className="
              max-w-[1400px]
              mx-auto
              bg-black
              rounded-[40px]
              overflow-hidden
              grid
              grid-cols-1
              lg:grid-cols-2
              min-h-[500px]
            "
          >

            <div
              className="
                p-10
                md:p-16
                flex
                flex-col
                justify-center
                text-white
              "
            >

              <p
                className="
                  uppercase
                  tracking-[0.3em]
                  text-sm
                  text-white/50
                  mb-6
                "
              >
                Drop da semana
              </p>

              <h2
                className="
                  text-5xl
                  md:text-7xl
                  font-black
                  leading-none
                  mb-8
                "
              >
                AIR JORDAN
                <br />
                RETRO
              </h2>

              <p
                className="
                  text-white/70
                  text-lg
                  leading-relaxed
                  mb-10
                  max-w-xl
                "
              >
                O sneaker mais desejado da semana
                chegou em edição limitada.
              </p>

              <button
                className="
                  bg-white
                  text-black
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                  w-fit
                  hover:scale-105
                  transition-all
                "
              >
                Comprar agora
              </button>
            </div>

            <div className="relative">

              <img
                src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111"
                alt="Jordan"
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                "
              />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}