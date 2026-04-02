'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewBookPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const formData = new FormData(e.target)

    const data = {
      name: formData.get('name'),
      category: formData.get('category'),
      price: Number(formData.get('price')),
      description: formData.get('description'),
      emoji: formData.get('emoji') || '📘',
      available: formData.get('available') === 'on',
    }

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || 'Помилка створення')
      }

      router.push('/dashboard/books')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const inputStyle = { color: '#111827', backgroundColor: '#ffffff' }

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/dashboard/books" className="text-blue-600 hover:underline">
        ← Назад до списку
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-6 text-gray-900">
        📚 Додати нову книгу
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-xl p-6 shadow-md space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Назва *
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Наприклад: Гаррі Поттер"
            style={inputStyle}
            className="w-full border border-gray-300 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-green-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Категорія *
          </label>
          <select
            name="category"
            required
            style={inputStyle}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-600"
          >
            <option>Фантастика</option>
            <option>Класика</option>
            <option>Поезія</option>
            <option>Пригоди</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ціна (грн) *
          </label>
          <input
            type="number"
            name="price"
            required
            min="1"
            placeholder="100"
            style={inputStyle}
            className="w-full border border-gray-300 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-green-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Emoji
          </label>
          <input
            type="text"
            name="emoji"
            placeholder="📘"
            style={inputStyle}
            className="w-full border border-gray-300 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-green-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Опис
          </label>
          <textarea
            name="description"
            rows="3"
            placeholder="Короткий опис книги..."
            style={inputStyle}
            className="w-full border border-gray-300 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-green-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="available" defaultChecked />
          <span className="text-gray-700">В наявності</span>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
        >
          {saving ? 'Збереження...' : 'Створити книгу'}
        </button>
      </form>
    </div>
  )
}