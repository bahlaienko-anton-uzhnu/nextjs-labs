'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import BookForm from '@/components/BookForm'

export default function EditBookPage() {
  const { id } = useParams()
  const router = useRouter()

  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [submitError, setSubmitError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(`/api/books/${id}`)

        if (!response.ok) {
          throw new Error('Книгу не знайдено')
        }

        const data = await response.json()
        setBook(data)
      } catch (error) {
        setLoadError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [id])

  async function handleSubmit(formData) {
    setSubmitError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.errors?.join(', ') || data.error || 'Помилка оновлення')
      }

      router.push(`/dashboard/books/${id}`)
    } catch (error) {
      setSubmitError(error.message)
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <div className="text-gray-700">Завантаження...</div>
  }

  if (loadError) {
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
          <p className="text-gray-700">{loadError}</p>
        </div>
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
          initialData={book}
          onSubmit={handleSubmit}
          submitLabel="Зберегти зміни"
          isSubmitting={isSubmitting}
          error={submitError}
        />
      </div>
    </div>
  )
}