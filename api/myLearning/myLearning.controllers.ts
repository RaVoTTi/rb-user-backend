import { Response, Request, NextFunction } from 'express'
import resIdError from '../../utils/res-idError'
import { Order } from '../order/order.models'
import { User } from '../user/user.models'
import { Book } from '../book/book.models'

export const myLearningGet = async (req: Request, res: Response) => {
    const { user } = req

    const books = await Book.find({ _id: { $in: user.books } })
        .populate({ path: 'autor', select: 'name' })
        .populate({ path: 'subject', select: 'name' })

    if (!books) return resIdError(res)

    res.status(200).json({
        ok: true,
        msg: '',
        result: books,
    })
}
export const myLearningGetById = async (req: Request, res: Response) => {
    const { id: _id } = req.params
    const { user } = req

    const book = await Book.findById({ _id })
        .select('content name ')


    if (!book) return resIdError(res)

    res.status(200).json({
        ok: true,
        msg: '',
        result: book,
    })
}
export const myLearningPatchById = async (req: Request, res: Response) => {
    const { id } = req.params
    const { user } = req


    let learning
    learning = await Order.findOneAndUpdate(
        {
            $and: [{ _id: id }, { user: user._id }, { condition: 1 },],
        },
        { condition: 2 },
        { new: true }
    )
    if (!learning) return resIdError(res)

    res.status(200).json({
        ok: true,
        msg: '',
        result: learning,
    })
}