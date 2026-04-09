'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function BookDetailPage() {
  const { id } = useParams()
  const router = useRouter()

  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(`/api/books/${id}`)

        if (!response.ok) {
          throw new Error('Книгу не знайдено')
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

  async function handleDelete() {
    const ok = confirm(`Видалити книгу "${book.name}"?`)
    if (!ok) return

    try {
      setDeleting(true)

      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Помилка видалення')
      }

      router.push('/dashboard/books')
    } catch (err) {
      alert(err.message)
      setDeleting(false)
    }
  }

  if (loading) {
    return <div className="text-gray-700">Завантаження...</div>
  }

  if (error) {
    return (
      <div>
        <Link
          href="/dashboard/books"
          className="text-green-700 hover:underline mb-4 inline-block"
        >
          &larr; Назад до списку
        </Link>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Помилка</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Link
        href="/dashboard/books"
        className="text-green-700 hover:underline mb-4 inline-block"
      >
        &larr; Назад до списку
      </Link>

      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {book.emoji} {book.name}
            </h1>
            <p className="text-gray-500 mt-2">ID: {book._id}</p>
          </div>

          <span
            className={`px-3 py-1 rounded text-sm font-medium ${
              book.available
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {book.available ? 'В наявності' : 'Немає'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Категорія</p>
            <p className="text-gray-900 font-medium">{book.category}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Ціна</p>
            <p className="text-gray-900 font-medium">{book.price} грн</p>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-1">Опис</p>
          <p className="text-gray-800">{book.description || 'Без опису'}</p>
        </div>

        <div className="flex gap-4">
          <Link
            href={`/dashboard/books/${book._id}/edit`}
            className="bg-green-700 text-white px-5 py-2 rounded hover:bg-green-800"
          >
            Редагувати
          </Link>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 disabled:opacity-50"
          >
            {deleting ? 'Видалення...' : 'Видалити'}
          </button>
        </div>
      </div>
    </div>
  )
}