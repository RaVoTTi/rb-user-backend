import { Response, Request, NextFunction } from 'express'
import resIdError from '../../utils/res-idError'
import { Order } from '../order/order.models'

export const myLearningGet = async (req: Request, res: Response) => {
    const { user } = req
    let learnings
    learnings = await Order.find({
        $and: [{ user: user._id }, { condition: 'purchased' }],
    })
        .populate({ path: 'book', select: 'evaluation content name' })
        .select('-dateCreated -user -condition')

    if (!learnings) return resIdError(res)

    res.status(200).json({
        ok: true,
        msg: [],
        result: learnings,
    })
}
// export const myLearningGetById = async (req: Request, res: Response) => {
//     const { id } = req.params
//     const { user } = req
    
//     let learning
//     learning = await Order.find({
//         {
//             $and: [{ _id: id }, { user: user._id }],
//         },
//     })


//     if (!learning) return resIdError(res)

//     res.status(200).json({
//         ok: true,
//         msg: [],
//         result: learning,
//     })
// }
export const myLearningPatchById = async (req: Request, res: Response) => {
    const { id } = req.params
    const { user } = req


    let learning
    learning = await Order.findOneAndUpdate(
        {
            $and: [{ _id: id }, { user: user._id }, { condition: 1},],
        },
        {condition: 2},
        {new: true}
        )
    if (!learning) return resIdError(res)

    res.status(200).json({
        ok: true,
        msg: [],
        result: learning,
    })
}