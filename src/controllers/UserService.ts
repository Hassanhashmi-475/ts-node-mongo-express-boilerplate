import dotenv from 'dotenv'
dotenv.config()
import * as bcrypt from 'bcryptjs'
import User,{IUser} from '../models/User'
import { signInToken } from '../config/Auth'
import { log } from 'console'

const registerUser = async (req: any, res: any) => {
  try {
    const { name, email, password }= req.body

    
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser: IUser = new User({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),  
      updatedAt: new Date(),
    })

    await newUser.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const loginUser = async (req: any, res: any) => {
  try {
    const user = await User.findOne({ email: req.body.registerEmail })
   
    if (
      user &&
      user.password &&
      bcrypt.compareSync(req.body.password, user.password)
    ) {
      const token = signInToken(user)

      
      res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        image: user.image,
      })

      log(req.user)
    } else {
      res.status(401).send({
        message: 'Invalid user or password!',
      })
    }
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    })
  }
}

const allUsers =async (req:any,res:any) => {
  
  const users = await User.find({})
  res.send(users)
}

export { loginUser, registerUser ,allUsers}
