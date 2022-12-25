interface IPayment {
    price: number
    book: IBook
    user: IUser
}

import Stripe from 'stripe'
import { IBook } from '../api/book/book.models'
import { IUser } from '../api/user/user.models'

import { NODE_ENV, STRIPE_KEY_TEST, STRIPE_KEY, FRONT_URL } from '../config/config'



export const generatePaymentSession = async ({
    price,
    user,
    book,
}: IPayment) => {

    const apiKey = NODE_ENV === 'prod' ? STRIPE_KEY : STRIPE_KEY_TEST
    const stripe = new Stripe(apiKey || '', { apiVersion: '2022-11-15' })

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: book.name,
                        images: [],

                    },
                    unit_amount: price * 100,
                },

                quantity: 1,
            },
        ],
        metadata:{
            user: user.id,
            price,
            book: book.id,
        },
        customer_email: user.email,
        custom_text: {},
        mode: 'payment',
        success_url: `${FRONT_URL}/#/app/mylearning?state=success`,
        cancel_url: `${FRONT_URL}/#/app/mylearning?state=fail`,
        // automatic_payment_methods:{
        //     enabled: true
        // },
        // description: `${user.name} ${user.lastName} ${user._id} `,
    })

    return session.url
}
