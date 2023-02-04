// EXPRESS
import { Router } from 'express'
import { check, query, body, param } from 'express-validator'

// VALIDATORS
import { validateCamps } from '../../middlewares/validate-camps'

// CONTROLLERS
import {  bookGet, bookGetById, bookGetByIds } from './book.controllers'
import { clearCamps } from '../../middlewares/clear-camps'
import { validateUserJwt } from '../../middlewares/validate-user-JWT'

// PATH /api/book
export const router = Router()

// ROUTES

// NO REGISTER
router.get(
    '/',
    query('isfeatured', 'It have to be boolean').optional().isBoolean(),
    
    query('from', 'It have to be boolean').optional().isNumeric(),
    query('until', 'It have to be boolean').optional().isNumeric(),
    query('ids', "it isn't a valid id").optional().isArray(),

    bookGet
)
router.get(
    '/ids',
    [
        query('ids', "it isn't a valid id").optional().isArray(),
        // check('id', "it isn't a valid id").isArray(),
        validateCamps,
    ],
    bookGetByIds
)
// router.get(
//     '/ids/:ids',
//     [
//         // check('ids', "it isn't a valid id").notEmpty(),
//         // check('id', "it isn't a valid id").isArray(),
//            validateCamps
//         ],
//     bookGetByIds
// )
router.get(
    '/id/:id',
    [check('id', "it isn't a valid id").isMongoId(), validateCamps],
    bookGetById
)

