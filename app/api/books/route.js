import dbConnect from '@/lib/db'
import Book from '@/lib/models/Book'

// GET — отримати всі книги
export async function GET() {
  try {
    await dbConnect()

    const books = await Book.find()

    return Response.json(books)
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

// POST — створити книгу
export async function POST(request) {
  try {
    await dbConnect()

    const body = await request.json()

    const newBook = await Book.create(body)

    return Response.json(newBook, { status: 201 })
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    )
  }
}