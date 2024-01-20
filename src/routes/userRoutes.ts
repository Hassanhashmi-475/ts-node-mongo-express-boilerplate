import { Router } from 'express'
import {
   
   allUsers,
   loginUser, registerUser,
} from '../controllers/UserService'

const userRouter = Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/', allUsers)



export default userRouter
