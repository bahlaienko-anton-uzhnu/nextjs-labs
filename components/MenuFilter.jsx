'use client'

import { useState } from 'react'
import MenuCard from './MenuCard'
import { books, getCategories } from '@/lib/books'

const categories = getCategories()

export default function MenuFilter() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Всі')

  const filtered = books.filter((book) => {
    return (
      book.name.toLowerCase().includes(search.toLowerCase()) &&
      (activeCategory === 'Всі' || book.category === activeCategory)
    )
  })

  return (
    <div>
      <input
        type="text"
        placeholder="Пошук..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-black placeholder:text-gray-500 bg-white"
      />

      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeCategory === cat
                ? 'bg-green-700 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((book) => (
          <MenuCard key={book.id} {...book} />
        ))}
      </div>
    </div>
  )
}