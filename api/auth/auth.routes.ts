import { emailConfirmationGet, forgotPasswordPatch, forgotPasswordSendPatch, loginPost, resendEmailConfirmationPatch, signUpPost, verifyGet } from './auth.controllers'
import { Router } from 'express'
import { validateEmail } from '../user/user.validators'
import { validateCamps } from '../../middlewares/validate-camps'
import { check } from 'express-validator'
import { clearCamps } from '../../middlewares/clear-camps'
import { validateUserJwt } from '../../middlewares/validate-user-JWT'
import { validateEmailJwt } from '../../middlewares/validate-email-JWT'
import { validatePassJwt } from '../../middlewares/validate-pass-JWT'

// PATH /api/auth/
export const router = Router()

// ROUTES
router.post(
    '/login',
    [
        check('email', 'Email is required').notEmpty(),
        check('password', 'Password is required').notEmpty(),
        validateCamps,
        check('email', 'Email is required').isEmail(),
        check('password', 'Password need to be string').isString(),
        check('password', 'Password need to be more than 6 char').isLength({
            min: 6,
        }),
        validateCamps,
    ],
    loginPost
)

router.get('/verify', [validateUserJwt], verifyGet)
router.get('/confirmation/:token', [validateEmailJwt], emailConfirmationGet)
router.patch('/resend/confirmation', [
    check('email', 'Email is required').notEmpty(),
    check('email', 'Email is required').isEmail(),
    validateCamps,


], resendEmailConfirmationPatch)

router.patch('/forgot/password/:token', [
    check('password', 'password is required').notEmpty(),
    check('password', 'password is required').isString(),


    validatePassJwt], forgotPasswordPatch)
router.patch('/forgot/password', [
    check('email', 'Email is required').notEmpty(),
    check('email', 'Email is required').isEmail(),
    validateCamps,


], forgotPasswordSendPatch)


router.post(
    '/signup',
    [
        check('name', 'Name is required').notEmpty(),
        check('lastName', 'lastName is required').notEmpty(),
        check('email', 'Email is required').notEmpty(),
        check('password', 'Password is required').notEmpty(),
        check('phone', 'The phone is required').notEmpty(),
        validateCamps,
        check('name', 'Name is required').isString(),
        check('lastName', 'lastName is required').isString(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password need to be more than 6 char').isLength({
            min: 6,
        }),
        check('phone', 'phone is required').isNumeric(),
        check('referredBy').optional().isString().withMessage(''),
        validateCamps,
        check('email').custom(validateEmail).withMessage('Email is in used'),
        validateCamps,
        clearCamps(['isAdmin', 'state','referralCode' ]),
    ],
    signUpPost
)
