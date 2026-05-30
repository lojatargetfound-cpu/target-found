'use client'

import {
  useState,
  useEffect,
  useRef,
} from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {
  ShoppingBag,
  Search,
  Heart,
  ArrowRight,
  X,
  User,
  LogOut,
  ChevronDown,
} from 'lucide-react'

import {
  motion,
  AnimatePresence,
} from 'framer-motion'

import { useFavoriteStore } from '@/store/favoriteStore'

interface NavbarProps {
  user: any
  cart: any[]
  openCart: () => void
  handleGoogleLogin: () => void
  handleLogout: () => void

  search: string
  setSearch: (value: string) => void
  products: any[]
}

export default function Navbar({
  user,
  cart,
  openCart,
  handleGoogleLogin,
  handleLogout,
  search,
  setSearch,
  products,
}: NavbarProps) {

  const [menuOpen, setMenuOpen] =
    useState(false)

  const [searchOpen, setSearchOpen] =
    useState(false)

  const [profileOpen, setProfileOpen] =
    useState(false)

  const profileRef =
    useRef<HTMLDivElement>(null)

  const { favorites } =
    useFavoriteStore()

  useEffect(() => {

    function handleClickOutside(
      event: MouseEvent
    ) {

      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target as Node
        )
      ) {

        setProfileOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    )

    return () => {

      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
    }

  }, [])

  useEffect(() => {

    if (
      menuOpen ||
      searchOpen ||
      profileOpen
    ) {

      document.body.style.overflow =
        'hidden'

    } else {

      document.body.style.overflow =
        'auto'
    }

    return () => {
      document.body.style.overflow =
        'auto'
    }

  }, [
    menuOpen,
    searchOpen,
    profileOpen,
  ])

  const filteredProducts =
    (products || []).filter((product) =>

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
    )

  return (
    <>

      <header className="sticky top-0 z-50 bg-[#F4F6F2]/80 backdrop-blur-xl border-b border-black/5">

        <div className="max-w-[1600px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">

          {/* LOGO */}

          <Link href="/">
            <h1 className="text-2xl font-black tracking-tight cursor-pointer">
              TARGET FOUND
            </h1>
          </Link>

          {/* NAV */}

          <nav className="hidden lg:flex items-center gap-10 font-semibold">
            <a href="#">Seleções</a>
            <a href="#">Ofertas</a>
            <a href="#">Lançamentos</a>
            <a href="#">Masculino</a>
            <a href="#">Feminino</a>
            <a href="#">SNKRS</a>
          </nav>

          {/* ACTIONS */}

          <div className="flex items-center gap-4">

            {/* MOBILE MENU */}

            <button
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              className="
                lg:hidden
                text-3xl
                font-bold
              "
            >
              ☰
            </button>

            {/* SEARCH */}

            <button
              onClick={() => {
                setSearch('')
                setSearchOpen(true)
              }}
              className="
                hover:scale-110
                transition
                hidden
                md:flex
              "
            >
              <Search size={22} />
            </button>

            {/* FAVORITES */}

            <Link
              href="/favorites"
              className="
                relative
                hover:scale-110
                transition
                hidden
                md:flex
              "
            >
              <Heart
                size={22}
                className={
                  favorites.length > 0
                    ? 'fill-black'
                    : ''
                }
              />

              {favorites.length > 0 && (
                <span
                  className="
                    absolute
                    -top-2
                    -right-2
                    bg-black
                    text-white
                    text-[10px]
                    w-5
                    h-5
                    rounded-full
                    flex
                    items-center
                    justify-center
                    font-bold
                  "
                >
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* CART */}

            <button
              onClick={openCart}
              className="
                relative
                hover:scale-110
                transition
              "
            >
              <ShoppingBag size={22} />

              {cart.length > 0 && (
                <span
                  className="
                    absolute
                    -top-2
                    -right-2
                    bg-black
                    text-white
                    text-xs
                    w-5
                    h-5
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  {cart.length}
                </span>
              )}
            </button>

            {/* USER */}

            {user ? (

              <div
                ref={profileRef}
                className="relative"
              >

                <button
                  onClick={() =>
                    setProfileOpen(
                      !profileOpen
                    )
                  }
                  className="
                    flex
                    items-center
                    gap-3
                    bg-white
                    px-3
                    py-2
                    rounded-full
                    shadow-lg
                    border
                    border-gray-100
                    hover:scale-105
                    transition-all
                  "
                >

                  {user.user_metadata
                    ?.avatar_url ? (

                    <Image
  src={
    user.user_metadata
      ?.avatar_url
  }
  alt="Avatar"
  width={40}
  height={40}
  className="
    w-10
    h-10
    rounded-full
    object-cover
  "
/>

                  ) : (

                    <div
                      className="
                        w-10
                        h-10
                        rounded-full
                        bg-black
                        text-white
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <User size={18} />
                    </div>
                  )}

                  <div className="hidden md:block text-left">

                    <p className="text-sm text-gray-400">
                      Bem-vindo
                    </p>

                    <h3 className="font-bold leading-none">
                      {
                        user.user_metadata
                          ?.full_name
                      }
                    </h3>
                  </div>

                  <ChevronDown
                    size={18}
                  />
                </button>

                <AnimatePresence>
                  {profileOpen && (

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -10,
                      }}

                      animate={{
                        opacity: 1,
                        y: 0,
                      }}

                      exit={{
                        opacity: 0,
                        y: -10,
                      }}

                      className="
                        absolute
                        right-0
                        mt-4
                        w-72
                        bg-white
                        rounded-[28px]
                        shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                        border
                        border-gray-100
                        overflow-hidden
                        z-50
                      "
                    >

                      <div className="p-6 border-b border-gray-100">

                        <div className="flex items-center gap-4">

                          {user.user_metadata
                            ?.avatar_url ? (

                        <Image
  src={
    user.user_metadata
      ?.avatar_url
  }
  alt="Avatar"
  width={64}
  height={64}
  className="
    w-16
    h-16
    rounded-full
    object-cover
  "
/>

                          ) : (

                            <div
                              className="
                                w-16
                                h-16
                                rounded-full
                                bg-black
                                text-white
                                flex
                                items-center
                                justify-center
                              "
                            >
                              <User size={24} />
                            </div>
                          )}

                          <div>

                            <h3 className="font-black text-lg">
                              {
                                user
                                  .user_metadata
                                  ?.full_name
                              }
                            </h3>

                            <p className="text-gray-500 text-sm break-all">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3">

                        <Link
                          href="/favorites"
                          className="
                            flex
                            items-center
                            gap-3
                            px-4
                            py-4
                            rounded-2xl
                            hover:bg-[#F4F6F2]
                            transition-all
                            font-semibold
                          "
                        >
                          <Heart size={18} />

                          Favoritos
                        </Link>

                        <button
                          onClick={
                            handleLogout
                          }
                          className="
                            w-full
                            flex
                            items-center
                            gap-3
                            px-4
                            py-4
                            rounded-2xl
                            hover:bg-red-50
                            hover:text-red-500
                            transition-all
                            font-semibold
                          "
                        >
                          <LogOut
                            size={18}
                          />

                          Sair da conta
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            ) : (

              <button
                onClick={
                  handleGoogleLogin
                }
                className="
                  bg-black
                  text-white
                  px-5
                  py-2
                  rounded-full
                  flex
                  items-center
                  gap-2
                  hover:scale-105
                  transition
                "
              >
                Entrar

                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}

      <AnimatePresence>

        {menuOpen && (

          <motion.div
            initial={{
              opacity: 0,
              x: '-100%',
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            exit={{
              opacity: 0,
              x: '-100%',
            }}

            transition={{
              duration: 0.35,
            }}

            className="
              fixed
              inset-0
              z-[999]
              bg-[#F4F6F2]
              lg:hidden
              flex
              flex-col
            "
          >

            {/* TOP */}

            <div
              className="
                h-20
                px-6
                border-b
                border-black/5
                flex
                items-center
                justify-between
              "
            >

              <h2 className="text-2xl font-black">
                MENU
              </h2>

              <button
                onClick={() =>
                  setMenuOpen(false)
                }

                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-white
                  border
                  border-gray-200
                  flex
                  items-center
                  justify-center
                  shadow-lg
                "
              >
                <X size={24} />
              </button>
            </div>

            {/* LINKS */}

            <div className="flex-1 px-6 py-10">

              <div className="flex flex-col gap-6">

                {[
                  'Seleções',
                  'Ofertas',
                  'Lançamentos',
                  'Masculino',
                  'Feminino',
                  'SNKRS',
                ].map((item) => (

                  <a
                    key={item}
                    href="#"

                    onClick={() =>
                      setMenuOpen(false)
                    }

                    className="
                      text-4xl
                      font-black
                      tracking-tight
                      active:scale-95
                      transition-all
                    "
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* MOBILE SEARCH */}

              <button
                onClick={() => {
                  setMenuOpen(false)
                  setSearchOpen(true)
                }}

                className="
                  mt-12
                  w-full
                  h-16
                  rounded-3xl
                  bg-white
                  border
                  border-gray-200
                  px-6
                  flex
                  items-center
                  gap-4
                  shadow-lg
                  font-semibold
                "
              >
                <Search size={22} />

                Buscar sneakers
              </button>
            </div>

            {/* BOTTOM */}

            <div
              className="
                p-6
                border-t
                border-black/5
                space-y-4
              "
            >

              <Link
                href="/favorites"

                className="
                  h-16
                  rounded-3xl
                  bg-white
                  border
                  border-gray-200
                  px-5
                  flex
                  items-center
                  justify-between
                  shadow-lg
                  font-bold
                "
              >
                <div className="flex items-center gap-3">
                  <Heart size={20} />
                  Favoritos
                </div>

                <span>
                  {favorites.length}
                </span>
              </Link>

              <button
                onClick={() => {
                  setMenuOpen(false)
                  openCart()
                }}

                className="
                  w-full
                  h-16
                  rounded-3xl
                  bg-black
                  text-white
                  px-5
                  flex
                  items-center
                  justify-between
                  shadow-xl
                  font-bold
                "
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag size={20} />
                  Carrinho
                </div>

                <span>
                  {cart.length}
                </span>
              </button>

              {!user ? (

                <button
                  onClick={
                    handleGoogleLogin
                  }

                  className="
                    w-full
                    h-16
                    rounded-3xl
                    bg-white
                    border
                    border-gray-200
                    px-5
                    flex
                    items-center
                    justify-center
                    gap-3
                    shadow-lg
                    font-bold
                  "
                >
                  Entrar

                  <ArrowRight size={18} />
                </button>

              ) : (

                <div
                  className="
                    bg-white
                    border
                    border-gray-200
                    rounded-[32px]
                    p-5
                    shadow-lg
                  "
                >

                  <div className="flex items-center gap-4 mb-5">
<Image
  src={
    user.user_metadata
      ?.avatar_url
  }
  alt=""
  width={56}
  height={56}
  className="
    w-14
    h-14
    rounded-full
    object-cover
  "
/>

                    <div>

                      <h3 className="font-black">
                        {
                          user.user_metadata
                            ?.full_name
                        }
                      </h3>

                      <p className="text-sm text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={
                      handleLogout
                    }

                    className="
                      w-full
                      h-14
                      rounded-2xl
                      bg-red-50
                      text-red-500
                      font-bold
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    <LogOut size={18} />

                    Sair da conta
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEARCH OVERLAY */}

      <AnimatePresence>
        {searchOpen && (

          <motion.div
            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            className="
              fixed
              inset-0
              z-[999]
              bg-black/40
              backdrop-blur-xl
              flex
              items-start
              justify-center
              pt-32
              px-6
            "
          >

            <motion.div
              initial={{
                y: -40,
                opacity: 0,
              }}

              animate={{
                y: 0,
                opacity: 1,
              }}

              exit={{
                y: -40,
                opacity: 0,
              }}

              transition={{
                duration: 0.3,
              }}

              className="
                w-full
                max-w-3xl
                bg-white
                rounded-[40px]
                p-8
                shadow-[0_20px_80px_rgba(0,0,0,0.25)]
              "
            >

              <div className="flex items-center justify-between mb-8">

                <h2 className="text-3xl font-black">
                  Buscar sneakers
                </h2>

                <button
                  onClick={() => {
                    setSearchOpen(false)
                    setSearch('')
                  }}
                  className="
                    w-12
                    h-12
                    rounded-full
                    bg-gray-100
                    flex
                    items-center
                    justify-center
                    hover:bg-black
                    hover:text-white
                    transition-all
                  "
                >
                  <X size={22} />
                </button>
              </div>

              <div className="relative mb-8">

                <Search
                  size={22}
                  className="
                    absolute
                    left-6
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="text"
                  placeholder="Buscar Nike, Jordan, Air Max..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    h-20
                    rounded-3xl
                    bg-[#F4F6F2]
                    pl-16
                    pr-6
                    text-xl
                    font-semibold
                    outline-none
                    border
                    border-gray-200
                    focus:ring-4
                    focus:ring-black/10
                  "
                />
              </div>

              {search.length === 0 ? (

                <div className="flex flex-wrap gap-3">

                  {[
                    'Nike',
                    'Jordan',
                    'Air Max',
                    'Puma',
                    'Adidas',
                  ].map((item) => (

                    <button
                      key={item}
                      onClick={() =>
                        setSearch(item)
                      }
                      className="
                        px-5
                        py-3
                        rounded-2xl
                        bg-[#F4F6F2]
                        hover:bg-black
                        hover:text-white
                        transition-all
                        font-semibold
                      "
                    >
                      {item}
                    </button>
                  ))}
                </div>

              ) : (

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">

                  {filteredProducts.length === 0 ? (

                    <div
                      className="
                        text-center
                        py-14
                        text-gray-400
                        font-semibold
                      "
                    >
                      Nenhum sneaker encontrado
                    </div>

                  ) : (

                    filteredProducts.map((product) => (

                      <a
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={() => {
                          setSearchOpen(false)
                          setSearch('')
                        }}
                        className="
                          flex
                          items-center
                          gap-5
                          bg-[#F4F6F2]
                          p-4
                          rounded-3xl
                          hover:bg-black
                          hover:text-white
                          transition-all
                          duration-300
                          group
                        "
                      >

                        <Image
  src={product.image}
  alt={product.name}
  width={96}
  height={96}
  className="
    w-24
    h-24
    object-cover
    rounded-2xl
  "
/>

                        <div className="flex-1">

                          <p
                            className="
                              text-sm
                              text-gray-400
                              uppercase
                              tracking-wider
                              group-hover:text-white/60
                            "
                          >
                            {product.brand}
                          </p>

                          <h3 className="text-xl font-black">
                            {product.name}
                          </h3>

                          <p
                            className="
                              text-sm
                              text-gray-500
                              group-hover:text-white/70
                            "
                          >
                            R$ {product.price}
                          </p>
                        </div>
                      </a>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}