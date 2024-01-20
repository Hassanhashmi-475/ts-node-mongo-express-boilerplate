import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  name: string
  image?: string
  address?: string
  country?: string
  city?: string
  email: string
  phone?: string
  password?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model<IUser>('User', UserSchema)

export default User
