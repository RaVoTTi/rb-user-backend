// EXPRESS
import { Router } from 'express'

// CONTROLLERS
import { subjectGet } from './subject.controllers'

// PATH /api/subject
export const router = Router()

// ROUTES

// NO REGISTER
router.get('/', subjectGet)
