import { Response } from 'express'
import { Prisma, User } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { prisma, ExpressRequest as Request } from '../../index'


interface userCredentials {
  email: string;
  password: string;
}

async function createUser(req: Request, res: Response) {

  try {
    const user: User = req.body

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    
    const { password, ...createUser} = await prisma.user.create({ data: user })    
    return res.send(createUser)

  } catch (error) {
    res.send(error.message)
  }
}


async function signIn(req: Request, res: Response) {
  try {
    const userCredentials  = req.body
    const user = await prisma.user.findUnique({ where: {
      email: userCredentials.email
    } })

    if (!user) {
      return res.status(404).send('user not found')
    }
      
    const hasValidCredentials = await bcrypt.compare(userCredentials.password, user.password)
    if (hasValidCredentials) {
      const token = jwt.sign({ ...user }, process.env.SECRET!);
      return res.json({ auth: true, token: token });
    }
      
    return res.status(403).send('wrong credentials')
    
    
  } catch (error) {
    res.send(error.message)
  }
}

async function me (req: Request, res: Response) {
  try {
    const user = await prisma.user.findUnique({ where: {
      id: req?.user?.id
    } })
  if (user) {
    const {password, ...rest} = user
    res.send(rest)
  }
  res.status(403).send('unauthorized')
  } catch (error) {
    res.send(error.message)
  }
  
}


export { createUser, signIn, me }