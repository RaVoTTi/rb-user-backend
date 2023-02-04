interface IPayment {
    books: IBook[]
    user: IUser
}

import Stripe from 'stripe'
import { IBook } from '../api/book/book.models'
import { IUser } from '../api/user/user.models'

import {
    NODE_ENV,
    STRIPE_ENV,
    STRIPE_KEY_TEST,
    STRIPE_KEY,
    FRONT_URL_TEST,
    FRONT_URL,
} from '../config'
const apiKey = STRIPE_ENV === 'prod' ? STRIPE_KEY : STRIPE_KEY_TEST
const frontUrl = NODE_ENV === 'prod' ? FRONT_URL : FRONT_URL_TEST

const stripe = new Stripe(apiKey || '', { apiVersion: '2022-11-15' })

export const generatePaymentSession = async ({
    user,
    books,
}: IPayment)
: Promise<Stripe.Checkout.Session> => {
// { url: string } => {
    const apiKey = STRIPE_KEY_TEST

    let price = 0
    let booksIds: string[] = []
    const items = books.map((book) => {
        price += book.price
        booksIds.push(book.id)
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: book.name.toUpperCase(),
                    images: [],
                },
                unit_amount: book.price * 100,
            },

            quantity: 1,
        }
    })
    // console.log(typeof(booksIds) ,booksIds, JSON.stringify(booksIds))

    const session = await stripe.checkout.sessions.create({
        line_items: items,
        metadata: {
            user: user.id,
            price,
            books : JSON.stringify([...booksIds]),
            firstBuy: user.firstBuy ? 'true' : 'false',
            referredBy: user.referredBy ? user.referredBy : null 
        },
        customer_email: user.email,
        custom_text: {},
        mode: 'payment',
        success_url: `${frontUrl}/#/app/mylearning?state=success`,
        cancel_url: `${frontUrl}/#/app/mylearning?state=fail`,
        // automatic_payment_methods:{
        //     enabled: true
        // },
        // description: `${user.name} ${user.lastName} ${user._id} `,
    })


    return session
}
