import { Router } from 'express'
import { check } from 'express-validator'
import { validateCamps } from '../../middlewares/validate-camps'
import { validateUserJwt } from '../../middlewares/validate-user-JWT'
import {

    myOrderEvaluationPatch,
    myOrderGetById,
    myOrderGetEvaluation,
    myOrdersGet,
    mySessionPost,
} from './myOrder.controllers'

// PATH /api/myorder
export const router = Router()

router.get('/', [validateUserJwt], myOrdersGet)

router.get(
    '/id/:id',
    [
        validateUserJwt,
        check('id', "it isn't a valid id").isMongoId(),
        validateCamps,
    ],
    myOrderGetById
)
router.get(
    '/evaluation/:id',
    [
        validateUserJwt,
        check('id', "it isn't a valid id").isMongoId(),
        validateCamps,
    ],
    myOrderGetEvaluation
)
router.post(
    '/session',
    [
        validateUserJwt,
        check('ids', "it isn't a valid id").isArray(),
        // check('price', "it isn't a valid id").notEmpty(),
        // check('price', "it isn't a valid id").isNumeric(),

        validateCamps,
    ],
    mySessionPost
)
router.patch(
    '/id/:id',
    [
        validateUserJwt,
        check('id', "it isn't a valid id").isMongoId(),

        validateCamps,
    ],
    myOrderEvaluationPatch
)







