import mongoose, { ConnectOptions } from 'mongoose'

const connectDB = async () => {
  try {
const options = {
  useUnifiedTopology: true ,
  useNewUrlParser: true,
  connectTimeoutMS: 10000, 
}

    await mongoose.connect(process.env.MONGODB_URI!,options)
    console.log('Connected to MongoDBd')
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
}

export default connectDB
