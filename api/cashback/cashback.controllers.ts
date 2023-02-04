import { Response, Request, NextFunction } from 'express'
import { Cashback } from './cashback.models'
import fs from 'fs'
import { calculatePercentage } from '../../helpers/calculatePercentage'
import { IOrder, Order } from '../order/order.models'
import { Referral } from '../referral/referral.models'
import { Model, Document } from 'mongoose'
import { aggregateCashback } from '../../helpers/aggregateCashback'
import { updateManyCashback } from '../../helpers/updateManyCashback'
import { REFERRAL_PERCENTAGE } from '../../config'
import { getCryptoPrice } from '../../helpers/getCryptoPrice'



export const cashbackGet = async (req: Request, res: Response) => {
    const { user } = req
    const userId = user._id;

    const [booksCashback, referralCashback] = await Promise.all([
        aggregateCashback(Order, userId, 'price'),
        aggregateCashback(Referral, userId, 'cashback')
    ]);
    let totalBooks = 0
    if (booksCashback?.[0]?.total ?? 0 > 0) {
        totalBooks = calculatePercentage(booksCashback[0].total)
    }
    let totalReferral = 0

    if (referralCashback?.[0]?.total ?? 0 > 0) {
        totalReferral = referralCashback[0].total
    }
    const cashback = totalBooks + totalReferral

    res.status(200).json({
        ok: true,
        msg: '',
        result: cashback,

    })
}

export const cashbackPut = async (req: Request, res: Response) => {
    const { type, wallet } = req.body
    const { user } = req
    const userId = user._id;
    try {
        const [booksCashback, referralCashback] = await Promise.all([
            aggregateCashback(Order, userId, 'price'),
            aggregateCashback(Referral, userId, 'cashback')
        ]);
        let totalBooks = 0
        if (booksCashback?.[0]?.total ?? 0 > 0) {
            totalBooks = calculatePercentage(booksCashback[0].total)
        }
        let totalReferral = 0

        if (referralCashback?.[0]?.total ?? 0 > 0) {
            totalReferral = referralCashback[0].total
        }
        const total = totalBooks + totalReferral
        if (total > 0) {

            const amount = total

            const [orders, referral] = await Promise.all([
                updateManyCashback(Order, userId),
                updateManyCashback(Referral, userId)
            ]);
            if (!orders || !referral) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Something happened',
                })
            }

            const cashback = new Cashback({
                amount,
                type,
                wallet,
            })
            await cashback.save()
            return res.status(201).json({
                ok: true,
                msg: 'Cashback Claimed Succesfully',
            })

        } else {
            return res.status(400).json({
                ok: true,
                msg: "You don't have nothing to claim",
            })
        }
    } catch (err) {
        console.log('error', err)
        return res.status(500).json({
            ok: false,
            msg: 'Claim cashback fail',
        })
    }
}
export const cashbackAllGet = async (req: Request, res: Response) => {

    let ADA = 1
    const response = await getCryptoPrice('cardano')
    if (response?.data[0]?.current_price) {
        ADA = response?.data[0]?.current_price
    }
    // if (response) {
    //     ADA = response.current_price
    // }


    const aggregate = await Cashback.aggregate([
        {
            $match: {
                transferred: false,
            },
        },
        {
            $group: {
                _id: null,
                ids: { $push: '$_id' },
                csv: {
                    $push: {
                        wallet: '$wallet' ,
                        amount: {$round:{ $divide: ['$amount', ADA] }},
                    },
                },
                count: {
                    $sum: 1,
                },
            },
        },
    ])

    if (aggregate?.[0]?.count ?? 0 > 0) {
        const { ids, csv } = aggregate[0] as {
            ids: string[]
            csv: [
                {
                    wallet: string
                    amount: number
                }
            ]
        }


        res.status(200).json({
            ok: true,
            msg: '',
            result: csv,
        })

    } else {
        return res.status(500).json({
            ok: false,
            msg: 'Get all cashbacks fail',
        })
    }

}






export const cashbackAllPutTrue = async (req: Request, res: Response) => {


    const { ids } = req.body

    try {

        const cashback = await Cashback.updateMany(
            { _id: { $in: ids } },

            { $set: { transferred: true } }
        )



        return res.status(200).json({
            ok: true,
            msg: '',
            result: cashback,
        })

    } catch {
        return res.status(500).json({
            ok: false,
            msg: 'Put all cashbacks fail',
        })
    }

}





