import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db'
import { isAuth } from './config/Auth'
import userRoutes from './routes/userRoutes'

dotenv.config()

const app = express()

connectDB()

app.use(express.json())
app.use(cors())
// setupTelegramBot(app)
// setupReminderTelegramBot(app)
// setupFinancialTelegramBot2(app)



app.use('/api/user', userRoutes)

export default app
