'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BookForm from '@/components/BookForm'

export default function NewBookPage() {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData) => {
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.errors?.join(', ') || data.error || 'Помилка створення')
      }

      router.push('/dashboard/books')
    } catch (err) {
      setError(err.message)
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <Link href="/dashboard/books" className="text-green-700 hover:underline mb-4 inline-block">
        &larr; Назад до списку
      </Link>

      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Додати нову книгу
        </h1>

        <BookForm
          onSubmit={handleSubmit}
          submitLabel="Створити"
          isSubmitting={isSubmitting}
          error={error}
        />
      </div>
    </div>
  )
}