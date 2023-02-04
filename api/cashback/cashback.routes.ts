import { Router } from 'express'
import { check } from 'express-validator'
import { validateCamps } from '../../middlewares/validate-camps'
import { validateUserJwt } from '../../middlewares/validate-user-JWT'
import { cashbackAllGet, cashbackGet, cashbackPut } from './cashback.controllers'
import { validateIsAdminRole } from '../../middlewares/validate-isAdmin-JWT'

export const router = Router()


router.put(
  '/',
  [
      validateUserJwt,
      check('type', 'type is required').notEmpty(),
      check('wallet', 'wallet is required').notEmpty(),
      validateCamps,
      check('type', 'type is required')
          .isString()
          .isIn(["ADA"]),
      check('wallet', 'wallet have to be more than 6 characters').isString().isLength({
          min: 6,
      }),

      validateCamps,
  ],
  cashbackPut
)
router.get('/', [validateUserJwt], cashbackGet)
router.get('/all', 
[validateUserJwt, validateIsAdminRole],
 cashbackAllGet)

