import type { Metadata } from 'next'

import { supabase } from '@/lib/supabase'

import ProductPageClient from '@/components/product/ProductPageClient'

type Props = {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {

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

    description: product.description,

    openGraph: {
      title: product.name,

      description: product.description,

      images: [
        {
          url: product.image,
        },
      ],
    },
  }
}

export default function ProductPage({
  params,
}: Props) {

  return (
    <ProductPageClient id={params.id} />
  )
}