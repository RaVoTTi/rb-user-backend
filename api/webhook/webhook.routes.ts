import { Router } from 'express'
import express from 'express'
import { webhookPost } from './webhook.controller'

// PATH /webhook
export const router = Router()

router.post('/', express.raw({ type: 'application/json' }), webhookPost)
