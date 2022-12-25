import { Response, Request, NextFunction } from 'express'

import resIdError from '../../utils/res-idError'
import { Book, IEvaluation } from '../book/book.models'

// NO REGISTER

export const bookGet = async (req: Request, res: Response) => {
    const { state } = req.query
    let query
    if (state === 'both') {
        query = {}
    } else {
        query = { state: true }
    }
    const books = await Book.find(query)
        .populate({ path: 'autor', select: 'name' })
        .populate({ path: 'subject', select: ['name'] })
        .select('-content -richDescription -evaluation -numReviews ')

    return res.status(200).json({
        ok: true,
        msg: [],
        result: books,
    })
}

export const bookGetById = async (req: Request, res: Response) => {
    const { id: _id } = req.params

    const book = await Book.findOne({
        $and: [{ _id }, { state: true }],
    })
        .populate({ path: 'autor', select: 'name' })
        .populate({ path: 'subject', select: ['name'] })

    if (!book) return resIdError(res)

    return res.status(200).json({
        ok: true,
        msg: [],
        result: book,
    })
}
