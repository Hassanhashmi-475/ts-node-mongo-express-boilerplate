import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

enum AdminRole {
  Admin = 'Admin',  
}


interface IAdmin extends Document { 
  name?:string
  image?: string
  address?: string
  country?: string
  city?: string
  email: string
  phone?: string
  password: string
  role: AdminRole
  joiningDate?: Date
  createdAt: Date
  updatedAt: Date
}

const adminSchema: Schema<IAdmin> = new mongoose.Schema(
  {
    name: {
        type:String,
        required:true
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
      default: bcrypt.hashSync('12345678', 10),
    },
    role: {
      type: String,
      required: false,
      default: AdminRole.Admin,
      enum: Object.values(AdminRole),
    },
    joiningDate: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

const Admin = mongoose.model<IAdmin>('Admin', adminSchema)

export default Admin
