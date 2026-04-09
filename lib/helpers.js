import dbConnect from './db'
import Book from './models/Book'

export async function getBookStats() {
  await dbConnect()

  const books = await Book.find()
  const total = books.length
  const available = books.filter((b) => b.available).length
  const unavailable = total - available
  const categories = [...new Set(books.map((b) => b.category))]
  const avgPrice =
    total > 0
      ? Math.round(books.reduce((sum, b) => sum + b.price, 0) / total)
      : 0

  return {
    total,
    available,
    unavailable,
    categoriesCount: categories.length,
    avgPrice,
  }
}