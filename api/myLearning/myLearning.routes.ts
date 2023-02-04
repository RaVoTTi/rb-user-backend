// EXPRESS
import { Router } from 'express'
import { check } from 'express-validator'
import { validateCamps } from '../../middlewares/validate-camps'

// VALIDATORS

import { validateUserJwt } from '../../middlewares/validate-user-JWT'
import {
    myLearningGet,
    myLearningGetById,
    // myLearningGetById,
    myLearningPatchById,
} from './myLearning.controllers'

// PATH /api/order
export const router = Router()

router.get('/', [validateUserJwt], myLearningGet)
router.get(
    '/id/:id',
    [
        validateUserJwt,
        check('id', "it isn't a valid id").isMongoId(),
        validateCamps,
    ],
    myLearningGetById
)
router.patch(
    '/:id',
    [
        validateUserJwt,
        check('id', "it isn't a valid id").isMongoId(),
        validateCamps,
    ],
    myLearningPatchById
)
