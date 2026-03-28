'use client'

import { useState } from 'react'
import MenuCard from './MenuCard'
import { books } from '@/lib/books'

const categories = ["Всі", ...new Set(books.map(b => b.category))]

export default function MenuFilter() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Всі')

  const filtered = books.filter(book => {
    return (
      book.name.toLowerCase().includes(search.toLowerCase()) &&
      (activeCategory === 'Всі' || book.category === activeCategory)
    )
  })

  return (
    <div>
      <input
        placeholder="Пошук..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      <div className="flex gap-2 mb-4">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filtered.map(book => (
          <MenuCard key={book.id} {...book} />
        ))}
      </div>
    </div>
  )
}