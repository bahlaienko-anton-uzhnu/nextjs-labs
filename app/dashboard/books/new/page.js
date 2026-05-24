'use client'

import Link from 'next/link'
import BookForm from '@/components/BookForm'

export default function NewBookPage() {
  return (
    <div>
      <Link
        href="/dashboard/books"
        className="text-green-700 hover:underline mb-4 inline-block"
      >
        &larr; Назад до списку
      </Link>

      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Додати нову книгу
        </h1>

        <BookForm mode="create" />
      </div>
    </div>
  )
}