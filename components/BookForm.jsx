'use client'

import { useState } from 'react'
import Link from 'next/link'

const CATEGORIES = ['Фантастика', 'Класика', 'Поезія', 'Пригоди']

export default function BookForm({
  initialData,
  onSubmit,
  submitLabel = 'Зберегти',
  isSubmitting,
  error,
}) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || '',
    price: initialData?.price || '',
    description: initialData?.description || '',
    emoji: initialData?.emoji || '📘',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...formData, price: Number(formData.price) })
  }

  return (
    <>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Назва *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500 text-black"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Категорія *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500 text-black"
            >
              <option value="">Оберіть категорію</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Ціна (грн) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500 text-black"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Emoji</label>
            <input
              type="text"
              name="emoji"
              value={formData.emoji}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500 text-black"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Опис</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500 text-black"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 font-bold disabled:opacity-50"
          >
            {isSubmitting ? 'Збереження...' : submitLabel}
          </button>

          <Link
            href="/dashboard/books"
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-400 font-bold inline-block"
          >
            Скасувати
          </Link>
        </div>
      </form>
    </>
  )
}