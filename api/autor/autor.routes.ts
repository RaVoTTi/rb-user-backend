// EXPRESS
import { Router } from 'express'

// CONTROLLERS
import { autorGet } from './autor.controllers'

// PATH /api/autor
export const router = Router()

// ROUTES
// ADMIN
router.get('/', autorGet)
