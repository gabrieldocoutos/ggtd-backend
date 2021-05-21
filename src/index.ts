import { Prisma, PrismaClient, User } from '@prisma/client'
import express from 'express'
import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import userRouter from './modules/user/userRouter'

dotenv.config()

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

prisma.$on('query', e => {
  console.log("Query: " + e.query)
  console.log("Duration: " + e.duration + "ms")
  console.log("\n")
})

type ExpressRequest = express.Request & {
  user?: User
}

function verifyJWT(req: ExpressRequest, res: express.Response, next: express.NextFunction){
  
  if (['/users/signin'].includes(req.url)) {
    return next()
  }

  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token.split(' ')[1], process.env.SECRET!, function(err, decoded) {

    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

    
    
    console.log('decoded', decoded)
    req.user = {...decoded} as User
    next();
  });
}


const app = express()

app.use(express.json())

app.use(verifyJWT)

app.use(userRouter)

app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`,
  ),
)



export { prisma, ExpressRequest }