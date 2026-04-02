'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'

export default function BookDetailPage({ params }) {
  const { id } = use(params)
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(`/api/books/${id}`)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Книгу не знайдено')
          }
          throw new Error('Помилка завантаження')
        }

        const data = await response.json()
        setBook(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-400 mb-4">404</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <Link href="/dashboard/books" className="text-blue-600 hover:underline">
          ← До списку книг
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/dashboard/books" className="text-blue-600 hover:underline">
        ← Назад до списку
      </Link>

      <div className="mt-4 bg-white border border-gray-200 rounded-xl p-6 shadow">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {book.emoji} {book.name}
          </h1>

          <span
            className={`px-3 py-1 rounded text-sm ${
              book.available
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {book.available ? 'В наявності' : 'Немає'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Категорія</p>
            <p className="text-gray-900 font-medium">{book.category}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Ціна</p>
            <p className="text-gray-900 font-medium">{book.price} грн</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Опис</p>
          <p className="text-gray-800">{book.description}</p>
        </div>
      </div>
    </div>
  )
}