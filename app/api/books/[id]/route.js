import dbConnect from '@/lib/db'
import Book from '@/lib/models/Book'

// GET /api/books/:id
export async function GET(request, { params }) {
  await dbConnect()
  const { id } = await params

  try {
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
      { error: 'Невалідний ID' },
      { status: 400 }
    )
  }
}

// PUT /api/books/:id
export async function PUT(request, { params }) {
  await dbConnect()
  const { id } = await params

  try {
    const body = await request.json()

    const book = await Book.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (!book) {
      return Response.json(
        { error: 'Книгу не знайдено' },
        { status: 404 }
      )
    }

    return Response.json(book)
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message)
      return Response.json({ errors: messages }, { status: 400 })
    }

    return Response.json(
      { error: 'Помилка сервера' },
      { status: 500 }
    )
  }
}

// DELETE /api/books/:id
export async function DELETE(request, { params }) {
  await dbConnect()
  const { id } = await params

  try {
    const book = await Book.findByIdAndDelete(id)

    if (!book) {
      return Response.json(
        { error: 'Книгу не знайдено' },
        { status: 404 }
      )
    }

    return Response.json({
      message: `Книгу "${book.name}" видалено`
    })
  } catch (error) {
    return Response.json(
      { error: 'Невалідний ID' },
      { status: 400 }
    )
  }
}