import { NextResponse } from 'next/server'
import { getBookById, updateBook, deleteBook } from '@/lib/books'

// GET /api/books/1
export async function GET(request, { params }) {
  const { id } = await params
  const book = getBookById(id)

  if (!book) {
    return NextResponse.json(
      { error: 'Книгу не знайдено' },
      { status: 404 }
    )
  }

  return NextResponse.json(book)
}

// PUT /api/books/1
export async function PUT(request, { params }) {
  const { id } = await params

  try {
    const body = await request.json()

    if (!body.name || !body.category || !body.price) {
      return NextResponse.json(
        { error: "Поля name, category та price є обов'язковими" },
        { status: 400 }
      )
    }

    const updated = updateBook(id, body)

    if (!updated) {
      return NextResponse.json(
        { error: 'Книгу не знайдено' },
        { status: 404 }
      )
    }

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json(
      { error: 'Невалідний JSON' },
      { status: 400 }
    )
  }
}

// DELETE /api/books/1
export async function DELETE(request, { params }) {
  const { id } = await params
  const deleted = deleteBook(id)

  if (!deleted) {
    return NextResponse.json(
      { error: 'Книгу не знайдено' },
      { status: 404 }
    )
  }

  return NextResponse.json({
    message: `Книгу "${deleted.name}" видалено`,
    deleted
  })
}