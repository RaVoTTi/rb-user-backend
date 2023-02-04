import { Response, Request, NextFunction } from 'express'
import Stripe from 'stripe'
import { Order } from '../order/order.models'
import {
    STRIPE_ENV,
    STRIPE_KEY_TEST,
    STRIPE_KEY,
    STRIPE_WEBHOOK_TEST,
    STRIPE_WEBHOOK,
    REFERRAL_PERCENTAGE,

} from '../../config'
import { IBook } from '../book/book.models'
import { User } from '../user/user.models'
import { Referral } from '../referral/referral.models'

const apiKey = STRIPE_ENV === 'prod' ? STRIPE_KEY : STRIPE_KEY_TEST
const endpointSecret =
    STRIPE_ENV === 'prod' ? STRIPE_WEBHOOK : STRIPE_WEBHOOK_TEST


const stripe = new Stripe(apiKey ?? '', { apiVersion: '2022-11-15' })
const referralPercentage = parseFloat((REFERRAL_PERCENTAGE ?? '0.05'))

export const webhookPost = async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] ?? ''
    let event
    try {

        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            endpointSecret || ''
        )
    } catch (err) {
        console.log('error')
        res.status(400).send(`Webhook Error1: ${err}`)
        return
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            try {
                const { metadata } = event.data.object as {
                    metadata: {
                        books: string
                        user: string
                        price: number
                        firstBuy: string
                        referredBy: string | null
                    }
                }
                const { books: booksRaw, user, price, firstBuy: firstBuyRaw, } = metadata

                const referredBy = metadata?.referredBy

                const books = JSON.parse(booksRaw) as string[]
                const firstBuy = firstBuyRaw === 'true' ? true : false

                if (firstBuy === true && referredBy?.length === 12) {

                    const referralUser = await User.findOne({ referralCode: referredBy })

                    if (referralUser) {

                        const referralAmount = new Referral({
                            cashback: price * referralPercentage,
                            user: referralUser?._id,
                        })
                        referralAmount.save()
                    }
                }

                const order = new Order({
                    books,
                    price,
                    user,
                    condition: 'purchased',
                })
                const [referredUser] = await Promise.all([
                    User.findByIdAndUpdate({ _id: user }, { $push: { books }, firstBuy: false }, { new: true }),
                    order.save()
                ])




            } catch (err) {
                res.status(400).send(`Webhook Error2: ${err}`)
                return
            }

            break
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send()
}
