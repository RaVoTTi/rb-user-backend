import { Request, Response } from 'express'
import resIdError from '../../utils/res-idError'
import {Autor} from './autor.models'


export const autorGet = async (req: Request, res: Response) => {
    const { state } = req.query
    let query
    if (state === 'both') {
        query = {}
    } else {
        query = { state: true }
    }
    const autors = await Autor.find(query)
    return res.status(200).json({
        ok: true,
        msg: '',
        result: autors,
    })
}
