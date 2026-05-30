'use client'

import { motion } from 'framer-motion'

import { Heart } from 'lucide-react'

import toast from 'react-hot-toast'

import { useFavoriteStore } from '@/store/favoriteStore'

import Image from 'next/image'

interface ProductCardProps {
  product: any
  addToCart: (product: any) => void
}

export default function ProductCard({
  product,
  addToCart,
}: ProductCardProps) {

  const {
    toggleFavorite,
    isFavorite,
  } = useFavoriteStore()

  const favorite =
    isFavorite(product.id)

  function handleFavorite(
    e: any
  ) {

    e.preventDefault()

    toggleFavorite(product)

    if (favorite) {

      toast.success(
        'Removido dos favoritos'
      )

    } else {

      toast.success(
        'Adicionado aos favoritos'
      )
    }
  }

  return (
    <motion.a
      href={`/product/${product.id}`}

      initial={{
        opacity: 0,
        y: 40,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.6,
      }}

      viewport={{
        once: true,
      }}

      className="
        group
        bg-white
        rounded-[36px]
        overflow-hidden
        relative
        shadow-[0_20px_60px_rgba(0,0,0,0.12)]
        hover:shadow-[0_30px_80px_rgba(0,0,0,0.18)]
        transition-all
        duration-500
        hover:-translate-y-4
        border
        border-gray-100
      "
    >

      <div className="relative overflow-hidden">

        <button
          onClick={handleFavorite}

          className={`
            absolute
            top-5
            right-5
            z-20
            w-12
            h-12
            rounded-full
            backdrop-blur-md
            flex
            items-center
            justify-center
            shadow-lg
            transition-all
            duration-300
            hover:scale-110

            ${
              favorite
                ? 'bg-black text-white scale-110'
                : 'bg-white/90 text-black'
            }
          `}
        >

          <Heart
            size={22}

            className={`
              transition-all
              duration-300

              ${
                favorite
                  ? 'fill-white'
                  : ''
              }
            `}
          />
        </button>

        <div
          className="
            relative
            w-full
            h-[420px]
            overflow-hidden
          "
        >

          <Image
            src={
              product?.image ||
              '/placeholder.png'
            }

            alt={
              product?.name ||
              'Sneaker'
            }

            fill

            sizes="
              (max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw
            "

            className="
              object-cover
              group-hover:scale-110
              transition-transform
              duration-700
            "

            onError={(e: any) => {
              e.currentTarget.src =
                '/placeholder.png'
            }}
          />
        </div>

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/20
            to-transparent
            opacity-0
            group-hover:opacity-100
            transition-all
            duration-500
          "
        />

        <div
          className="
            absolute
            top-5
            left-5
            bg-black
            text-white
            text-xs
            font-bold
            px-4
            py-2
            rounded-full
            tracking-wide
          "
        >
          PREMIUM
        </div>
      </div>

      <div className="p-7">

        <p className="text-gray-400 text-sm mb-3 uppercase tracking-widest">
          {product?.brand || 'Sneaker'}
        </p>

        <h2 className="text-3xl font-black mb-3">
          {product?.name || 'Produto'}
        </h2>

        <p className="text-gray-500 leading-relaxed mb-8 line-clamp-2">
          {
            product?.description ||
            'Sneaker premium exclusivo.'
          }
        </p>

        <div className="flex items-end justify-between mt-auto">

          <div>

            <p className="text-gray-400 text-sm">
              Preço
            </p>

            <p className="text-4xl font-black">
              R$ {product?.price || 0}
            </p>
          </div>

          <button
            onClick={(e) => {

              e.preventDefault()

              addToCart(product)
            }}

            className="
              bg-black
              text-white
              px-7
              py-4
              rounded-2xl
              font-bold
              shadow-lg
              transition-all
              duration-500
              opacity-90
              group-hover:opacity-100
              group-hover:scale-105
              hover:bg-gray-900
            "
          >
            Comprar
          </button>
        </div>
      </div>
    </motion.a>
  )
}