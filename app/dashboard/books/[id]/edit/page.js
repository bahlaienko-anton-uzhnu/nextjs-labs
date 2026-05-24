'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import BookForm from '@/components/BookForm'

export default function EditBookPage() {
  const { id } = useParams()

  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    fetch(`/api/books/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Книгу не знайдено')
        }

        return res.json()
      })
      .then((data) => {
        setBook(data)
        setLoading(false)
      })
      .catch((error) => {
        setLoadError(error.message)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <div className="text-gray-700">Завантаження...</div>
  }

  if (loadError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded">
        {loadError}
      </div>
    )
  }

  return (
    <div>
      <Link
        href={`/dashboard/books/${id}`}
        className="text-green-700 hover:underline mb-4 inline-block"
      >
        &larr; Назад до книги
      </Link>

      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Редагувати: {book.name}
        </h1>

        <BookForm
          mode="edit"
          bookId={id}
          initialData={book}
        />
      </div>
    </div>
  )
}