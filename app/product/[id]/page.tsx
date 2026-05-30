import ProductPageClient from '@/components/product/ProductPageClient'

type Props = {
params: Promise<{
id: string
}>
}

export default async function ProductPage({
params,
}: Props) {

const { id } = await params

return ( <ProductPageClient id={id} />
)
}
