'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function BooksPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Всі')

  async function fetchBooks() {
    try {
      setLoading(true)
      setError(null)

      let url = '/api/books?'
      if (search) url += `search=${encodeURIComponent(search)}&`
      if (category !== 'Всі') url += `category=${encodeURIComponent(category)}`

      const response = await fetch(url)
      if (!response.ok) throw new Error('Помилка завантаження')

      const data = await response.json()
      setBooks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [search, category])

  async function handleDelete(id) {
    if (!confirm('Видалити книгу?')) return

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Помилка видалення')
      fetchBooks()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          📚 Книги ({books.length})
        </h1>

        <Link
          href="/dashboard/books/new"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Додати книгу
        </Link>
      </div>

      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Пошук книги..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-4 py-2 bg-white text-black placeholder:text-gray-400 caret-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option>Всі</option>
          <option>Фантастика</option>
          <option>Класика</option>
          <option>Поезія</option>
          <option>Пригоди</option>
        </select>
      </div>

      {loading && (
        <div className="text-center py-10 text-gray-600">
          Завантаження...
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {book.emoji} {book.name}
            </h2>

            <p className="text-gray-600 mb-2">{book.description}</p>

            <p className="text-sm text-gray-500 mb-1">
              Категорія: {book.category}
            </p>

            <p className="text-sm text-gray-500 mb-3">
              Ціна: {book.price} грн
            </p>

            <div className="flex justify-between items-center">
              <Link
                href={`/dashboard/books/${book.id}`}
                className="text-blue-600 hover:underline"
              >
                Детальніше
              </Link>

              <button
                onClick={() => handleDelete(book.id)}
                className="text-red-600 hover:text-red-800"
              >
                Видалити
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}