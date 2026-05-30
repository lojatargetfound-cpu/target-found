'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
} from 'lucide-react'

type CartSidebarProps = {
  cart: any[]
  closeCart: () => void
  removeFromCart: (id: number) => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  handleCheckout: () => void
  checkoutLoading: boolean
}

export default function CartSidebar({
  cart,
  closeCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  handleCheckout,
  checkoutLoading,
}: CartSidebarProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeCart}
        className="
          fixed
          inset-0
          bg-black/50
          backdrop-blur-md
          z-40
        "
      />

      <motion.div
        initial={{ x: 500 }}
        animate={{ x: 0 }}
        exit={{ x: 500 }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 200,
        }}
        className="
          fixed
          top-0
          right-0
          w-full
          md:w-[460px]
          h-screen
          bg-white
          z-50
          shadow-2xl
          overflow-y-auto
          flex
          flex-col
        "
      >
        <div className="p-8 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-[0.2em]">
                Sua bag
              </p>

              <h2 className="text-4xl font-black mt-2">
                Carrinho
              </h2>
            </div>

            <button
              onClick={closeCart}
              className="
                w-12
                h-12
                rounded-full
                bg-gray-100
                hover:bg-black
                hover:text-white
                transition-all
                flex
                items-center
                justify-center
                text-xl
                font-bold
              "
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-6">
          {cart.length === 0 && (
            <div
              className="
                bg-[#F4F6F2]
                rounded-[32px]
                p-10
                text-center
              "
            >
              <ShoppingBag
                size={50}
                className="mx-auto mb-5 text-gray-400"
              />

              <h3 className="text-2xl font-black mb-2">
                Carrinho vazio
              </h3>

              <p className="text-gray-500">
                Adicione produtos para continuar.
              </p>
            </div>
          )}

          {cart.map((item: any) => (
            <motion.div
              layout
              key={item.id}
              className="
                bg-[#F8F8F8]
                rounded-[32px]
                p-5
                border
                border-gray-100
              "
            >
              <div className="flex gap-4">
                <Image
  src={item.image}
  alt={item.name}
  width={200}
  height={200}
  className="
    w-28
    h-28
    object-cover
    rounded-2xl
  "
/>

                <div className="flex-1">
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
                    {item.brand}
                  </p>
{item.selectedSize && (
  <p className="text-sm text-gray-400 mb-3">
    Tamanho: {item.selectedSize}
  </p>
)}
                  <h3 className="text-xl font-black leading-tight mb-2">
                    {item.name}
                  </h3>

                  <p className="text-2xl font-black">
                    R$ {item.price}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                    className="
                      w-10
                      h-10
                      rounded-full
                      bg-white
                      hover:bg-black
                      hover:text-white
                      transition-all
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Minus size={16} />
                  </button>

                  <span className="font-black text-lg w-6 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                    className="
                      w-10
                      h-10
                      rounded-full
                      bg-white
                      hover:bg-black
                      hover:text-white
                      transition-all
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    text-red-500
                    font-semibold
                    hover:opacity-70
                    transition
                  "
                >
                  <Trash2 size={18} />
                  Remover
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="p-8 border-t border-gray-100 bg-white">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-500 text-lg">
                Subtotal
              </span>

              <span className="text-4xl font-black">
                R${' '}
                {cart.reduce(
                  (
                    total: number,
                    item: any
                  ) =>
                    total +
                    Number(item.price) *
                      item.quantity,
                  0
                )}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="
                w-full
                bg-black
                text-white
                py-5
                rounded-3xl
                font-bold
                text-lg
                flex
                items-center
                justify-center
                gap-3
                hover:scale-[1.02]
                transition-all
                duration-300
                shadow-2xl
              "
            >
              {checkoutLoading
                ? 'Processando...'
                : 'Finalizar Compra'}

              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </motion.div>
    </>
  )
}