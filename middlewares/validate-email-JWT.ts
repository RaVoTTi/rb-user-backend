import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from '../api/user/user.models'
import { EMAIL_PRIVATE_KEY, FRONT_URL, FRONT_URL_TEST, NODE_ENV } from '../config'



export const validateEmailJwt = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { token } = req.params
    const url = NODE_ENV === 'prod' ? FRONT_URL : FRONT_URL_TEST + '/auth/login'


    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "Token doesn't exist",
            result: [],
        })
    }

    try {
        if (!EMAIL_PRIVATE_KEY) {
            return res.status(500).json({
                ok: false,
                msg: "Private Key doesn't exist",
                result: [],
            })
        }

        const payload = jwt.verify(token, EMAIL_PRIVATE_KEY) as JwtPayload

        // console.log(payload);
        const { email } = payload

        const user = await User.findOneAndUpdate({ $and: [{ email }, { state: true }] }, { emailConfirmed: true })
        if (!user) {
            return res.status(401).json({
                ok: false,
                msg: 'Invalid Token',
                result: [],
            })
        }
        next()
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid Token',
            result: [],
        })
    }
}
