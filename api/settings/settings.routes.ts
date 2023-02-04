import { detailsGet, passwordPut } from './settings.controllers'
import { Router } from 'express'
import { validateEmail } from '../user/user.validators'
import { validateCamps } from '../../middlewares/validate-camps'
import { check } from 'express-validator'
import { clearCamps } from '../../middlewares/clear-camps'
import { validateUserJwt } from '../../middlewares/validate-user-JWT'

// PATH /api/auth/
export const router = Router()

// ROUTES
router.put(
    '/password',
    [
        validateUserJwt,
        check('oldPassword', 'Email is required').notEmpty(),
        check('newPassword', 'Password is required').notEmpty(),
        validateCamps,
        check('oldPassword', 'Email is required').isString(),
        check('newPassword', 'Password have to be more than 6 characters')
            .isString()
            .isLength({
                min: 6,
            }),

        validateCamps,
    ],
    passwordPut
)



router.get('/details', [validateUserJwt], detailsGet)

// router.post(
//     '/signup',
//     [
//         check('name', 'Name is required').notEmpty(),
//         check('lastName', 'lastName is required').notEmpty(),
//         check('email', 'Email is required').notEmpty(),
//         check('password', 'Password is required').notEmpty(),
//         check('phone', 'The phone is required').notEmpty(),
//         validateCamps,
//         check('name', 'Name is required').isString(),
//         check('lastName', 'lastName is required').isString(),
//         check('email', 'Email is required').isEmail(),
//         check('password', 'Password need to be more than 6 char').isLength({
//             min: 6,
//         }),
//         check('phone', 'phone is required').isNumeric(),
//         validateCamps,
//         check('email').custom(validateEmail).withMessage('Email is in used'),
//         validateCamps,
//         clearCamps(['isAdmin', 'state']),
//     ],
//     signUpPost
// )
