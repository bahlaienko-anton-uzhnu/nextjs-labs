import mongoose from 'mongoose'

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: Number,
  emoji: String,
  category: String,
  available: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true })

export default mongoose.models.Book || mongoose.model('Book', BookSchema)