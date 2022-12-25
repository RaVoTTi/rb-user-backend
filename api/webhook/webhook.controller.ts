import { Response, Request, NextFunction } from 'express'
import Stripe from 'stripe'
import { Order } from '../order/order.models'
import {
    NODE_ENV,
    STRIPE_KEY_TEST,
    STRIPE_KEY,
    STRIPE_WEBHOOK_TEST,
    STRIPE_WEBHOOK,
} from '../../config/config'

const apiKey = NODE_ENV === 'prod' ? STRIPE_KEY : STRIPE_KEY_TEST
const endpointSecret =
    NODE_ENV === 'prod' ? STRIPE_WEBHOOK : STRIPE_WEBHOOK_TEST

const stripe = new Stripe(apiKey ?? '', { apiVersion: '2022-11-15' })

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
        console.log(err)
        res.status(400).send(`Webhook Error: ${err}`)
        return
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            // try {
                const { metadata } = event.data.object as {
                    metadata: {
                        book: string
                        user: string
                        price: number
                    }
                }
                const order = new Order({
                    book: metadata.book,
                    price: metadata.price,
                    user: metadata.user,
                    condition: 'purchased',
                })
                await order.save()
            //     console.log(event.data.object)  
            // } catch (err) {
            //     console.log(err)
            // }

            break
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send()
}
