import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import Admin from '../models/Admin'

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string
        name: string
        email: string
        address: string
        phone: string
        image: string
      }
    }
  }
}
const signInToken = (user: {
  _id: string
  name: string
  email: string
  address?: string 
  phone?: string
  image?: string
}): string => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address || '', 
      phone: user.phone || '', 
      image: user.image || '', 
    },
    process.env.JWT_SECRET || '',
    {
      expiresIn: '2d',
    }
  )
}

const tokenForVerify = (user: {
  _id: string
  name: string
  email: string
  password: string
}): string => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    },
    process.env.JWT_SECRET_FOR_VERIFY || '',
    { expiresIn: '15m' }
  )
}

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  try {
    if (authorization) {
      const token = authorization.split(' ')[1]
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || ''
      ) as JwtPayload
      req.user = {
        _id: decoded._id,
        name: decoded.name,
        email: decoded.email,
        address: decoded.address,
        phone: decoded.phone,
        image: decoded.image,
      }
      next()
    } else {
      throw new Error('Authorization header missing')
    }
  } catch (err: any) {
    res.status(401).send({
      message: err.message,
    })
  }
}
const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const admin = await Admin.findOne({ role: 'Admin' })
  if (admin) {
    next()
  } else {
    res.status(401).send({
      message: 'User is not Admin',
    })
  }
}

export { signInToken, tokenForVerify, isAuth, isAdmin }
