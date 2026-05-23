import dbConnect from '@/lib/db'
import Book from '@/lib/models/Book'
import { authorize } from '@/lib/authorize'

import { createBookSchema } from '@/lib/validations/book'
import { sanitizeObject } from '@/lib/sanitize'

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

export async function POST(request) {
  const { error } = await authorize("admin")
  if (error) return error

  try {
    await dbConnect()

    const data = await request.json()
    const result = createBookSchema.safeParse(data)

    if (!result.success) {
      const messages = result.error.issues.map((e) => e.message)

      return Response.json(
        { errors: messages },
        { status: 400 }
      )
    }

    const sanitized = sanitizeObject(result.data)
    const newBook = await Book.create(sanitized)

    return Response.json(newBook, { status: 201 })
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    )
  }
}