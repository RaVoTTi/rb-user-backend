import { Response, Request, NextFunction } from 'express'
import { generatePaymentSession } from '../../helpers/stripe'
import resIdError from '../../utils/res-idError'
import { Book } from '../book/book.models'
import { Order } from '../order/order.models'

export const myPlaceOrderPost = async (req: Request, res: Response) => {
    const { user } = req
    const { price } = req.body

    const { id } = req.params

    const bookExist = await Book.findOne({
        $and: [{ _id: id }, { state: true }],
    }).select('maxPrice minPrice name')

    if (!bookExist) return resIdError(res)

    if (price < bookExist.minPrice || price > bookExist.maxPrice) {
        return res.status(400).json({
            ok: false,
            msg: ['The price is invalid'],
        })
    }

    try {
        const url = await generatePaymentSession({
            price,
            user,
            book: bookExist,
        })

        return res.status(200).json({
            url
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            ok: true,
            msg: [],
        })
    }
}

export const myOrdersGet = async (req: Request, res: Response) => {
    const { user } = req
    let orders
    orders = await Order.find({
        $and: [{ user: user._id }],
    })
        .populate({ path: 'book', select: 'name' })
        .select('-stripeId -user')

    if (!orders) return resIdError(res)

    res.status(200).json({
        ok: true,
        msg: [],
        result: orders,
    })
}
