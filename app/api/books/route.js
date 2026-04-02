import { NextResponse } from 'next/server'
import { books, addBook } from '@/lib/books'

// GET /api/books — список книг з фільтрацією
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')

  let result = [...books]

  if (category && category !== 'Всі') {
    result = result.filter(book => book.category === category)
  }

  if (search) {
    result = result.filter(book =>
      book.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  return NextResponse.json(result)
}

// POST /api/books — створення нової книги
export async function POST(request) {
  try {
    const body = await request.json()

    if (!body.name || !body.category || !body.price) {
      return NextResponse.json(
        { error: "Поля name, category та price є обов'язковими" },
        { status: 400 }
      )
    }

    if (typeof body.price !== 'number' || body.price <= 0) {
      return NextResponse.json(
        { error: 'Ціна має бути додатнім числом' },
        { status: 400 }
      )
    }

    const newBook = addBook(body)
    return NextResponse.json(newBook, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Невалідний JSON' },
      { status: 400 }
    )
  }
}