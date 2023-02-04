import { Request, Response } from 'express'
import { authJWT } from '../../helpers/JWT/authJWT'
import bcrypt from 'bcrypt'

import { User } from '../user/user.models'
import { Order } from '../order/order.models'
import { Result } from 'express-validator'
import { calculatePercentage } from '../../helpers/calculatePercentage'

export const passwordPut = async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body
    const { user } = req
    try {
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect username or password.',
            })
        }

        const access = user.comparePassword(oldPassword)
        if (!access) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect username or password.',
            })
        }
        const salt = bcrypt.genSaltSync(7)
        const password = bcrypt.hashSync(newPassword, salt)

        await User.findByIdAndUpdate({ _id: user._id }, { password })

        return res.status(201).json({
            ok: true,
            msg: 'Change Password Succesfull',
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            ok: false,
            msg: 'Change Password Fail',
        })
    }
}


export const detailsGet = async (req: Request, res: Response) => {
    const { user } = req
    const { name, lastName, phone, email, referralCode } = user
    res.status(200).json({
        ok: true,
        msg: 'Token is valid',
        result: { name, lastName, phone, email, referralCode },
    })
}

