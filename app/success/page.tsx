'use client'

import { useEffect } from 'react'

import Link from 'next/link'

import { CheckCircle2 } from 'lucide-react'

import { useCartStore } from '@/store/cartStore'

export default function SuccessPage() {
  const { clearCart } = useCartStore()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <main className="min-h-screen bg-[#F4F6F2] flex items-center justify-center px-6">
      <div className="bg-white max-w-xl w-full rounded-[40px] shadow-2xl p-10 md:p-14 text-center fade-up">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-5 rounded-full">
            <CheckCircle2
              size={70}
              className="text-green-600"
            />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-4">
          Pedido Confirmado
        </h1>

        <p className="text-gray-500 text-lg leading-relaxed mb-8">
          Seu pagamento foi aprovado com
          sucesso.
          <br />
          Estamos preparando seu pedido.
        </p>

        <div className="bg-[#F4F6F2] rounded-3xl p-6 mb-8">
          <p className="text-sm text-gray-500 mb-2">
            STATUS
          </p>

          <h2 className="text-2xl font-black">
            Pagamento Aprovado ✅
          </h2>
        </div>

        <Link
          href="/"
          className="bg-black hover:bg-gray-800 transition text-white px-8 py-4 rounded-2xl inline-flex items-center gap-2 font-bold"
        >
          Voltar para loja
        </Link>
      </div>
    </main>
  )
}