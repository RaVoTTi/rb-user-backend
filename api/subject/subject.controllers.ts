import { Request, Response } from 'express'
import resIdError from '../../utils/res-idError'
import {Subject} from './subject.models'

export const subjectGet = async (req: Request, res: Response) => {
    const { state } = req.query
    let query
    if (state === 'both') {
        query = {}
    } else {
        query = { state: true }
    }

    const subjects = await Subject.find(query)

    return res.status(200).json({
        ok: true,
        msg: '',
        result: subjects,
    })
}