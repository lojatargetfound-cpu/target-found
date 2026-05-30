'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

import { motion } from 'framer-motion'

import { supabase } from '@/lib/supabase'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/product/ProductCard'

import { useCartStore } from '@/store/cartStore'

import {
  Star,
  ShieldCheck,
  Truck,
} from 'lucide-react'

type Props = {
  id: string
}

export default function ProductPageClient({
  id,
}: Props) {

  const [product, setProduct] =
    useState<any>(null)

  const [relatedProducts, setRelatedProducts] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  const [selectedImage, setSelectedImage] =
    useState('')

  const [selectedSize, setSelectedSize] =
    useState('')

  const {
    addToCart,
    cart,
    openCart,
  } = useCartStore()

  useEffect(() => {

    async function loadProduct() {

      try {

        setLoading(true)

        const { data, error } =
          await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single()

        if (error || !data) {

          setError(
            'Produto não encontrado'
          )

          setLoading(false)

          return
        }

        setProduct(data)

        setSelectedImage(
          data.image || ''
        )

        const {
          data: related,
        } = await supabase
          .from('products')
          .select('*')
          .neq('id', id)
          .limit(4)

        if (related) {
          setRelatedProducts(related)
        }

      } catch {

        setError(
          'Erro ao carregar produto'
        )

      } finally {

        setLoading(false)
      }
    }

    loadProduct()

  }, [id])

  if (error) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#F4F6F2] px-6">

        <div className="bg-white p-10 rounded-[32px] shadow-xl text-center max-w-md w-full">

          <h2 className="text-3xl font-black mb-4">
            Ops...
          </h2>

          <p className="text-gray-500 mb-8">
            {error}
          </p>

          <a
            href="/"
            className="inline-flex items-center justify-center h-14 px-8 rounded-2xl bg-black text-white font-bold"
          >
            Voltar para loja
          </a>
        </div>
      </div>
    )
  }

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Carregando...
      </div>
    )
  }

  const galleryImages =

    product.images &&
    product.images.length > 0

      ? product.images

      : [product.image]

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

        <section className="max-w-[1350px] mx-auto px-6 md:px-8 py-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            <div className="flex gap-4">

              <div className="flex flex-col gap-3">

                {galleryImages.map((
                  image: string,
                  index: number
                ) => (

                  <button
                    key={index}
                    onClick={() =>
                      setSelectedImage(image)
                    }
                  >
                    <Image
                      src={image}
                      alt=""
                      width={200}
                      height={200}
                      className="w-20 h-20 object-cover rounded-2xl"
                    />
                  </button>
                ))}
              </div>

              <motion.div
                key={selectedImage}

                initial={{
                  opacity: 0,
                }}

                animate={{
                  opacity: 1,
                }}

                className="flex-1 bg-white rounded-[32px] overflow-hidden shadow-xl"
              >

                <Image
                  src={selectedImage}
                  alt={product.name}
                  width={1200}
                  height={1200}
                  className="w-full h-[560px] object-cover"
                />
              </motion.div>
            </div>

            <div>

              <div className="flex items-center gap-1 text-yellow-500 mb-4">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>

              <p className="uppercase tracking-[0.3em] text-gray-400 text-xs mb-5">
                {product.brand}
              </p>

              <h1 className="text-5xl font-black mb-6">
                {product.name}
              </h1>

              <p className="text-gray-500 text-lg mb-8">
                {product.description}
              </p>

              <h2 className="text-5xl font-black mb-10">
                R$ {product.price}
              </h2>

              <div className="grid grid-cols-4 gap-3 mb-10">

                {[
                  '38',
                  '39',
                  '40',
                  '41',
                  '42',
                  '43',
                  '44',
                  '45',
                ].map((size) => (

                  <button
                    key={size}

                    onClick={() =>
                      setSelectedSize(size)
                    }

                    className={`
                      h-14
                      rounded-2xl
                      border-2
                      font-bold

                      ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'bg-white border-gray-200'
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  addToCart({
                    ...product,
                    selectedSize,
                  })
                }

                disabled={!selectedSize}

                className="w-full bg-black text-white px-10 py-5 rounded-2xl text-lg font-bold"
              >
                Adicionar ao carrinho
              </button>

              <div className="mt-12 space-y-4">

                <div className="bg-white rounded-[26px] p-5 shadow-lg">

                  <div className="flex items-center gap-3 mb-3">
                    <ShieldCheck size={20} />

                    <h3 className="font-black text-lg">
                      Produto original
                    </h3>
                  </div>

                  <p className="text-gray-500 text-sm">
                    Todos os sneakers vendidos são autênticos.
                  </p>
                </div>

                <div className="bg-white rounded-[26px] p-5 shadow-lg">

                  <div className="flex items-center gap-3 mb-3">
                    <Truck size={20} />

                    <h3 className="font-black text-lg">
                      Entrega rápida
                    </h3>
                  </div>

                  <p className="text-gray-500 text-sm">
                    Frete rápido para todo Brasil.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (

          <section className="pb-24">

            <div className="max-w-[1350px] mx-auto px-6 md:px-8">

              <h2 className="text-4xl font-black mb-10">
                Produtos relacionados
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {relatedProducts.map((product) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </main>
    </>
  )
}