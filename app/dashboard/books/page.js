import dbConnect from '@/lib/db'
import Book from '@/lib/models/Book'
import Link from 'next/link'

export default async function BooksPage() {
  await dbConnect()

  const books = await Book.find().lean()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          📚 Книги ({books.length})
        </h1>

        <Link
          href="/dashboard/books/new"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          + Додати книгу
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {books.map((book) => (
          <div
            key={book._id.toString()}
            className="bg-white p-6 rounded shadow text-gray-900"
          >
            <h2 className="text-xl font-bold mb-2 text-gray-900">
              {book.emoji} {book.name}
            </h2>

            <p className="text-gray-700 mb-2">{book.description}</p>

            <p className="text-sm text-gray-600">
              Категорія: {book.category}
            </p>

            <p className="text-sm text-gray-600 mb-4">
              Ціна: {book.price} грн
            </p>

            <div className="flex gap-4">
              <Link
                href={`/dashboard/books/${book._id}`}
                className="text-blue-600 hover:underline"
              >
                Детальніше
              </Link>

              <Link
                href={`/dashboard/books/${book._id}/edit`}
                className="text-green-600 hover:underline"
              >
                Редагувати
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}