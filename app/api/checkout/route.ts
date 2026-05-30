import { NextResponse } from 'next/server'

import Stripe from 'stripe'

import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const cart = body.cart
    const user = body.user

    // valida carrinho
    if (!cart || cart.length === 0) {
      return NextResponse.json(
        {
          error: 'Carrinho vazio',
        },
        {
          status: 400,
        }
      )
    }

    // calcula total
    const total = cart.reduce(
      (acc: number, item: any) =>
        acc +
        Number(item.price) *
          item.quantity,
      0
    )

    // cria sessão stripe
    const session =
      await stripe.checkout.sessions.create({
        payment_method_types: [
  'card',
  'pix',
],

        mode: 'payment',

        line_items: cart.map((item: any) => ({
          price_data: {
            currency: 'brl',

            product_data: {
              name: item.name,

              images: [item.image],
            },

            unit_amount:
              Number(item.price) * 100,
          },

          quantity: item.quantity || 1,
        })),

        metadata: {
          user_id: user?.id || '',
          customer_email:
            user?.email || '',
        },

        success_url: `${
          process.env.NEXT_PUBLIC_SITE_URL ||
          'http://localhost:3000'
        }/success`,

        cancel_url: `${
          process.env.NEXT_PUBLIC_SITE_URL ||
          'http://localhost:3000'
        }`,
      })

    // salva pedido
    if (user) {
      const { error } =
        await supabase.from('orders').insert([
          {
            user_id: user.id,

            customer_name:
              user.user_metadata
                ?.full_name || '',

            customer_email:
              user.email || '',

            total,

            products: cart,

            stripe_session_id:
              session.id,
          },
        ])

      if (error) {
        console.log(
          'ERRO AO SALVAR PEDIDO:',
          error
        )
      }
    }

    return NextResponse.json({
      url: session.url,
    })
  } catch (error) {
    console.log(
      'ERRO CHECKOUT STRIPE:',
      error
    )

    return NextResponse.json(
      {
        error:
          'Erro ao criar checkout',
      },
      {
        status: 500,
      }
    )
  }
}