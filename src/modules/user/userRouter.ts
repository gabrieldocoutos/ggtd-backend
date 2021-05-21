import express from 'express'

import { createUser, me, signIn } from './userController'

const router = express.Router()

router.post('/users', createUser)

router.post('/users/signin', signIn)

router.get('/users/me', me)

export default router