import { MetadataRoute } from 'next'

import { supabase } from '@/lib/supabase'

export default async function sitemap():
  Promise<MetadataRoute.Sitemap> {

  const { data: products } =
    await supabase
      .from('products')
      .select('id')

  const productUrls =
    (products || []).map(
      (product) => ({
        url:
          `https://seudominio.com/product/${product.id}`,

        lastModified:
          new Date(),

        changeFrequency:
          'weekly' as const,

        priority: 0.8,
      })
    )

  return [

    {
      url: 'https://seudominio.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },

    ...productUrls,
  ]
}