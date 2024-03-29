import { Response, Request, NextFunction } from 'express'

export const validateIsAdminRole = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { user } = req
    if (!user) {
        return res.status(500).json({
            ok: false,
            msg: ['Error server token'],
            result: [],
        })
    }
    if (user.isAdmin !== true) {
        return res.status(401).json({
            ok: false,
            msg: ["You don't have access"],
            result: [],
        })
    }

    next()
}