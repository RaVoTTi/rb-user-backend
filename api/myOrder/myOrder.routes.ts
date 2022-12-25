import { Router } from 'express'
import { check } from 'express-validator'
import { validateCamps } from '../../middlewares/validate-camps'
import { validateUserJwt } from '../../middlewares/validate-user-JWT'
import {

    myOrdersGet,
    myPlaceOrderPost,
} from './myOrder.controllers'

// PATH /api/myorders
export const router = Router()

router.get('/', [validateUserJwt], myOrdersGet)

router.post(
    '/placeorder/:id',
    [
        validateUserJwt,
        check('id', "it isn't a valid id").isMongoId(),
        check('price', "it isn't a valid id").notEmpty(),
        check('price', "it isn't a valid id").isNumeric(),


        validateCamps,
    ],
    myPlaceOrderPost
)
