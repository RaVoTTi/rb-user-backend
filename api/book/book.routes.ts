// EXPRESS
import { Router } from 'express'
import { check, body } from 'express-validator'

// VALIDATORS
import { validateCamps } from '../../middlewares/validate-camps'

// CONTROLLERS
import {
    bookGet,
    bookGetById,

} from './book.controllers'
import { clearCamps } from '../../middlewares/clear-camps'
import { validateUserJwt } from '../../middlewares/validate-user-JWT'

// PATH /api/book
export const router = Router()

// ROUTES

// NO REGISTER
router.get('/', bookGet)
router.get(
    '/:id',
    [check('id', "it isn't a valid id").isMongoId(), validateCamps],
    bookGetById
)
