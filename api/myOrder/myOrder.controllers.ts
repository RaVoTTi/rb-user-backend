import { Response, Request, NextFunction } from 'express'
import { generatePaymentSession } from '../../helpers/stripe'
import resIdError from '../../utils/res-idError'
import { Book } from '../book/book.models'
import { Order } from '../order/order.models'
import { calculatePercentage } from '../../helpers/calculatePercentage'

export const myOrdersGet = async (req: Request, res: Response) => {
    const { user } = req
    let orders
    orders = await Order.find({
        $and: [{ user: user._id }],
    })
        .populate({ path: 'books', select: 'name price image' })
        .select('-stripeId -user')

    if (!orders) return resIdError(res)

    res.status(200).json({
        ok: true,
        msg: '',
        result: orders,
    })
}
export const myOrderGetById = async (req: Request, res: Response) => {
    const { id: _id } = req.params

    const { user } = req

    const order = await Order.findOne({
        $and: [{ _id }, { state: true }, { user: user._id }],
    })
        .populate({ path: 'books', select: 'name price' })
        .populate({ path: 'user', select: 'name lastName' })

    if (!order) return resIdError(res)

    return res.status(200).json({
        ok: true,
        msg: '',
        result: order,
    })
}
export const myOrderGetEvaluation = async (req: Request, res: Response) => {
    const { id: _id } = req.params

    const { user } = req

    const order = await Order.findOne({
        $and: [{ _id }, { state: true }, { user: user._id }],
    })
        .select('books')
        .populate({ path: 'books', select: 'name price evaluation' })

    if (!order?.books) return resIdError(res)

    return res.status(200).json({
        ok: true,
        msg: '',
        result: order.books,
    })
}
export const mySessionPost = async (req: Request, res: Response) => {
    const { user } = req
    const { ids } = req.body


    const bookExist = await Book.find({
        $and: [{ _id: { $in: ids } }, { state: true }],
    }).select('price name')

    if (!bookExist) return resIdError(res)

    try {
        const session = await generatePaymentSession({
            user,
            books: bookExist,
        })

            if (session?.url) {
                return res.status(200).json({
                    ok: true,
                    msg: '',
                    result: { url: session.url },
                })
            } else {
                return res.status(500).json({
                    ok: true,
                    msg: '',
                })
            }
        }
        
     catch (e) {
        console.log(e)
        return res.status(500).json({
            ok: false,
            msg: '',
        })
    }
}
export const myOrderEvaluationPatch = async (req: Request, res: Response) => {
    const { user } = req
    const { id: _id } = req.params
    const now = new Date();

    // Sumar 4 días a la fecha de hoy
    const dateClaimable = new Date(now);
    dateClaimable.setDate(now.getDate() + 4);

    const order = await Order.findOneAndUpdate(
        {
            _id,
            user: user._id,
            condition: 'purchased',
        },
        {
            condition: 'pending cashback',
            dateClaimable
        }
    )

    if (!order) return resIdError(res)

    return res.status(200).json({
        ok: true,
        msg: '',
    })
}

export const cashbackTotalGet = async (req: Request, res: Response) => {
    const { user } = req

    const total = await Order.aggregate([
        {
            $match: {
                $and: [{ user: user._id, condition: 'claimable cashback' }],
            },
        },
        {
            $group: {
                _id: null,
                total: { $sum: '$price' },
            },
        },
    ])
    let cashback
    if (total && total.length > 0 && total[0].total) {
        cashback = calculatePercentage(total[0].total);
    }

    res.status(200).json({
        ok: true,
        msg: '',
        result: cashback || 0,
    })
}
export const cashbackPut = async (req: Request, res: Response) => {
    const { type, wallet } = req.body
    const { user } = req
    try {
        const total = await Order.aggregate([
            {
                $match: {
                    $and: [{ user: user._id, condition: 'claimable cashback' }],
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$price' },
                },
            },
        ])
        const cashback = calculatePercentage(total[0].total || 0)
        const orders = await Order.updateMany({ user: user._id, condition: 'claimable cashback' }, { condition: 'claimed cashback' },)
        console.log(orders)


        return res.status(201).json({
            ok: true,
            msg: 'Cashback Claimed Succesfull',
            result: 0
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            ok: false,
            msg: 'Claim cashback fail',
        })
    }
}
