// NODE
import { Request, Response } from 'express'
// TERCEROS
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import  {nanoid} from 'nanoid'
// ME
import { User } from '../user/user.models'
import { API_URL, FRONT_URL, FRONT_URL_TEST, NODE_ENV } from '../../config'
import { authJWT, emailJWT, passwordJWT } from '../../helpers/JWT'
import { passwordTemplate } from '../../helpers/email/password.template'
import { signupTemplate } from '../../helpers/email'

const transporter = nodemailer.createTransport({
    host: 'smtppro.zoho.com',
    port: 465,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
})

export const loginPost = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ $and: [{ email }, { state: true }] })
        if (!user) {
            return res.status(401).json({
                ok: false,
                msg: 'Incorrect username or password.',
            })
        }
        if (!user.emailConfirmed) {
            return res.status(401).json({
                ok: false,
                msg: 'Please confirm your email to login',
            })
        }

        const access = user.comparePassword(password)
        if (!access) {
            return res.status(401).json({
                ok: false,
                msg: 'Incorrect username or password.',
            })
        }

        const token = await authJWT(user.id, user.isAdmin)

        return res.status(200).json({
            ok: true,
            msg: 'Login Succesfull',
            token: token,
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            ok: false,
            msg: 'Login Fail',
        })
    }
}

export const verifyGet = async (req: Request, res: Response) => {
    res.status(200).json({
        ok: true,
        msg: 'Token is valid',
    })
}
export const resendEmailConfirmationPatch = async (
    req: Request,
    res: Response
) => {
    const { email } = req.body
    emailJWT(email).then((token) => {
        const url =
            NODE_ENV === 'prod'
                ? `${FRONT_URL}/#/auth/confirmation/${token}`
                : `${FRONT_URL_TEST}/#/auth/confirmation/${token}`
        transporter.sendMail({
            to: email,
            from: process.env.EMAIL_ADDRESS,
            subject: 'Confirm Email',
            html: signupTemplate(url),
        })
    })
    res.status(201).json({
        ok: true,
        msg: 'Confirmation email sent',
    })
}
export const forgotPasswordPatch = async (req: Request, res: Response) => {
    const { password: noHashPassword } = req.body
    const { id } = req.user

    const salt = bcrypt.genSaltSync(7)
    const password = bcrypt.hashSync(noHashPassword, salt)

    const user = await User.findByIdAndUpdate(
        { _id: id },
        { password },
        { new: true }
    )

    if (!user) {
        return res.status(401).json({
            ok: true,
            msg: 'Something Happend',
        })
    }
    return res.status(201).json({
        ok: true,
        msg: 'Password changed Succesfully',
    })
}
export const forgotPasswordSendPatch = async (req: Request, res: Response) => {
    const { email } = req.body
    const user = await User.findOne({ $and: [{ email }, { state: true }] })
    if (!user) {
        return res.status(401).json({
            ok: true,
            msg: 'What do you looking for?',
        })
    }
    const { name, lastName } = user

    const nameComplete = `${name.toUpperCase()}  ${lastName.toUpperCase()}`

    passwordJWT(email).then((token) => {
        const url =
            NODE_ENV === 'prod'
                ? `${FRONT_URL}/#/auth/change/${token}`
                : `${FRONT_URL_TEST}/#/auth/change/${token}`
        transporter.sendMail({
            to: email,
            from: process.env.EMAIL_ADDRESS,
            subject: 'Password recovery',
            html: passwordTemplate(url, nameComplete),
        })
    })
    return res.status(201).json({
        ok: true,
        msg: 'Password recovery link sent',
    })
}
export const emailConfirmationGet = async (req: Request, res: Response) => {
    return res.status(201).json({
        ok: true,
        msg: 'Email Confirmation Succesfull',
    })
}

export const signUpPost = async (req: Request, res: Response) => {
    const {
        password: noHashPassword,
        referredBy,
        ...rest
    } = req.body

    const salt = bcrypt.genSaltSync(7)
    const password = bcrypt.hashSync(noHashPassword, salt)

    const referralCode = nanoid(12)

    const user = new User({
        ...rest,
        ...(referredBy ? { referredBy } : {}),
        referralCode,
        password,
    })



    await user.save()



    emailJWT(user.email).then((token) => {
        const url =
            NODE_ENV === 'prod'
                ? `${FRONT_URL}/#/auth/confirmation/${token}`
                : `${FRONT_URL_TEST}/#/auth/confirmation/${token}`
        transporter.sendMail({
            to: user.email,
            from: process.env.EMAIL_ADDRESS,
            subject: 'Confirm Email',
            html: signupTemplate(url),

        })
    })

    res.status(201).json({
        ok: true,
        msg: 'Check your email to login',
    })
}

