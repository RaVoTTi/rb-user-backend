import { Response, Request, NextFunction } from 'express'

export const headerSetter = (a: string, b: string) => {
    ;return(req: Request, res: Response, next: NextFunction) => {
        res.set(a, b)

        next()
    }
}
