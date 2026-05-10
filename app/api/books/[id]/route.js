import dbConnect from '@/lib/db'
import Book from '@/lib/models/Book'
import { authorize } from '@/lib/authorize'

// GET — отримати книгу по ID
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

// PUT — оновити книгу
export async function PUT(request, { params }) {
  const { error } = await authorize("admin")
  if (error) return error

  try {
    await dbConnect()

    const { id } = await params
    const body = await request.json()

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      body,
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

// DELETE — видалити книгу
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