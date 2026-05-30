
import type { Metadata } from 'next'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
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

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {

  const { data: product } =
    await supabase
      .from('products')
      .select('*')
      .eq('id', params.id)
      .single()

  if (!product) {

    return {
      title: 'Produto não encontrado',
    }
  }

  return {

    title: `${product.name} | TARGET FOUND`,

    description:
      product.description,

    openGraph: {

      title: product.name,

      description:
        product.description,

      images: [
        {
          url: product.image,
        },
      ],
    },
  }
}

export default function ProductPage() {

  const params = useParams()

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
            .eq('id', params.id)
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
          .neq('id', params.id)
          .limit(4)

        if (related) {
          setRelatedProducts(related)
        }

      } catch (err) {

        setError(
          'Erro ao carregar produto'
        )

      } finally {

        setLoading(false)
      }
    }

    loadProduct()

  }, [params.id])

  if (error) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#F4F6F2]
          px-6
        "
      >

        <div
          className="
            bg-white
            p-10
            rounded-[32px]
            shadow-xl
            text-center
            max-w-md
            w-full
          "
        >

          <h2 className="text-3xl font-black mb-4">
            Ops...
          </h2>

          <p className="text-gray-500 mb-8">
            {error}
          </p>

          <a
            href="/"
            className="
              inline-flex
              items-center
              justify-center
              h-14
              px-8
              rounded-2xl
              bg-black
              text-white
              font-bold
            "
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
        setSearch={(value: string) => {}}
        products={[]}
      />

      <main className="min-h-screen bg-[#F4F6F2]">

        <section className="max-w-[1350px] mx-auto px-6 md:px-8 py-10">

          {/* BREADCRUMB */}

          <div className="flex items-center gap-3 text-sm text-gray-400 mb-8 font-medium">
            <span>Home</span>
            <span>/</span>
            <span>{product.brand}</span>
            <span>/</span>
            <span className="text-black">
              {product.name}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* GALERIA */}

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

                    className={`
                      w-20
                      h-20
                      rounded-2xl
                      overflow-hidden
                      border-2
                      transition-all
                      duration-300

                      ${
                        selectedImage === image
                          ? 'border-black scale-105 shadow-lg'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }
                    `}
                  >
                    <Image
                      src={image}
                      alt=""
                      width={200}
                      height={200}
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />
                  </button>
                ))}
              </div>

              <motion.div
                key={selectedImage}

                initial={{
                  opacity: 0,
                  scale: 0.96,
                }}

                animate={{
                  opacity: 1,
                  scale: 1,
                }}

                transition={{
                  duration: 0.4,
                }}

                className="
                  flex-1
                  bg-white
                  rounded-[32px]
                  overflow-hidden
                  shadow-[0_20px_60px_rgba(0,0,0,0.10)]
                  relative
                  group
                  cursor-zoom-in
                "
              >

                <div
                  className="
                    overflow-hidden
                    w-full
                    h-[560px]
                  "
                >

                  <Image
                    src={selectedImage}
                    alt={product.name}
                    width={1200}
                    height={1200}

                    onMouseMove={(e) => {

                      const target =
                        e.currentTarget

                      const rect =
                        target.getBoundingClientRect()

                      const x =
                        ((e.clientX - rect.left) / rect.width) * 100

                      const y =
                        ((e.clientY - rect.top) / rect.height) * 100

                      target.style.transformOrigin =
                        `${x}% ${y}%`
                    }}

                    onMouseLeave={(e) => {

                      e.currentTarget.style.transformOrigin =
                        'center center'
                    }}

                    className="
                      w-full
                      h-[560px]
                      object-cover
                    "
                  />
                </div>

                {/* BADGE PREMIUM */}

                <div
                  className="
                    absolute
                    top-6
                    left-6
                    bg-black
                    text-white
                    px-4
                    py-2
                    rounded-full
                    text-xs
                    font-bold
                    tracking-wider
                    uppercase
                    backdrop-blur-xl
                  "
                >
                  Premium
                </div>

              </motion.div>
            </div>

            {/* INFO */}

            <div className="sticky top-24">

              <div className="flex items-center gap-3 mb-4">

                <div className="bg-black text-white px-3 py-1.5 rounded-full text-xs font-bold">
                  ORIGINAL
                </div>

                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>

                <p className="text-gray-500 text-sm">
                  (124 avaliações)
                </p>
              </div>

              <p className="uppercase tracking-[0.3em] text-gray-400 text-xs mb-5">
                {product.brand}
              </p>

              <h1 className="text-4xl md:text-6xl font-black leading-none mb-6">
                {product.name}
              </h1>

              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-xl">
                {product.description}
              </p>

              {/* PREÇO */}

              <div className="mb-8">

                <p className="text-gray-400 mb-2 text-sm">
                  Preço
                </p>

                <div className="flex items-end gap-3 flex-wrap">

                  <h2 className="text-5xl font-black">
                    R$ {product.price}
                  </h2>

                  <span className="text-green-600 font-bold text-base">
                    Em estoque
                  </span>
                </div>
              </div>

              {/* TAMANHOS */}

              <div className="mb-10">

                <div className="flex items-center justify-between mb-4">

                  <p className="font-bold text-base">
                    Selecione o tamanho
                  </p>

                  <p className="text-gray-400 text-sm">
                    Guia de tamanhos
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-3">

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
                        font-bold
                        text-base
                        transition-all
                        duration-300
                        border-2

                        ${
                          selectedSize === size
                            ? 'bg-black text-white border-black scale-105'
                            : 'bg-white border-gray-200 hover:border-black'
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* BOTÃO */}

              <button
                onClick={() =>
                  addToCart({
                    ...product,
                    selectedSize,
                  })
                }

                disabled={!selectedSize}

                className="
                  w-full
                  bg-black
                  text-white
                  px-10
                  py-5
                  rounded-2xl
                  text-lg
                  font-bold
                  hover:scale-[1.02]
                  transition-all
                  duration-300
                  shadow-xl
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                "
              >
                {selectedSize
                  ? `Adicionar tamanho ${selectedSize}`
                  : 'Selecione um tamanho'}
              </button>

              {/* CARDS */}

              <div className="mt-12 space-y-4">

                <div className="bg-white rounded-[26px] p-5 shadow-lg">

                  <div className="flex items-center gap-3 mb-3">
                    <ShieldCheck size={20} />

                    <h3 className="font-black text-lg">
                      Produto original
                    </h3>
                  </div>

                  <p className="text-gray-500 leading-relaxed text-sm">
                    Todos os sneakers vendidos são
                    100% autênticos e verificados.
                  </p>
                </div>

                <div className="bg-white rounded-[26px] p-5 shadow-lg">

                  <div className="flex items-center gap-3 mb-3">
                    <Truck size={20} />

                    <h3 className="font-black text-lg">
                      Entrega rápida
                    </h3>
                  </div>

                  <p className="text-gray-500 leading-relaxed text-sm">
                    Frete rápido para todo Brasil
                    com rastreamento completo.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* RELACIONADOS */}

        {relatedProducts.length > 0 && (

          <section className="pb-24">

            <div className="max-w-[1350px] mx-auto px-6 md:px-8">

              <div className="flex items-end justify-between mb-10">

                <div>
                  <p className="uppercase tracking-[0.3em] text-gray-400 text-sm mb-3">
                    Recomendados
                  </p>

                  <h2 className="text-4xl font-black">
                    Produtos relacionados
                  </h2>
                </div>
              </div>

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