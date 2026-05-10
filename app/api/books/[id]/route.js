import dbConnect from '@/lib/db'
import Book from '@/lib/models/Book'
import { authorize } from '@/lib/authorize'

import { updateBookSchema } from '@/lib/validations/book'
import { sanitizeObject } from '@/lib/sanitize'

export async function GET(request, { params }) {
  try {
    await dbConnect()

    const { id } = await params
    const book = await Book.findById(id)

    if (!book) {
      return Response.json(
        { error: 'Книгу не знайдено' },
        { status: 404 }
      )
    }

    return Response.json(book)
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  const { error } = await authorize("admin")
  if (error) return error

  try {
    await dbConnect()

    const { id } = await params
    const data = await request.json()
    const result = updateBookSchema.safeParse(data)

    if (!result.success) {
      const messages = result.error.issues.map((e) => e.message)

      return Response.json(
        { errors: messages },
        { status: 400 }
      )
    }

    const sanitized = sanitizeObject(result.data)

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      sanitized,
      { new: true, runValidators: true }
    )

    if (!updatedBook) {
      return Response.json(
        { error: 'Книгу не знайдено' },
        { status: 404 }
      )
    }

    return Response.json(updatedBook)
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  const { error } = await authorize("admin")
  if (error) return error

  try {
    await dbConnect()

    const { id } = await params
    const deletedBook = await Book.findByIdAndDelete(id)

    if (!deletedBook) {
      return Response.json(
        { error: 'Книгу не знайдено' },
        { status: 404 }
      )
    }

    return Response.json({
      message: 'Книгу видалено'
    })
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    )
  }
}