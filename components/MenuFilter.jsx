'use client'

import { useState } from 'react'
import MenuCard from './MenuCard'

const menuItems = [
  { id: 1, name: "1984", description: "Антиутопія Орвелла", price: 250, emoji: "📕", category: "Фантастика", available: true },
  { id: 2, name: "Дюна", description: "Наукова фантастика", price: 320, emoji: "📙", category: "Фантастика", available: true },
  { id: 3, name: "Кобзар", description: "Поезії Шевченка", price: 180, emoji: "📗", category: "Поезія", available: false },
  { id: 4, name: "Лісова пісня", description: "Драма Лесі Українки", price: 190, emoji: "📘", category: "Поезія", available: true },
  { id: 5, name: "Тигролови", description: "Пригодницький роман", price: 210, emoji: "📔", category: "Пригоди", available: true },
  { id: 6, name: "Острів скарбів", description: "Класика пригод", price: 230, emoji: "📚", category: "Пригоди", available: true },
  { id: 7, name: "Майстер і Маргарита", description: "Роман Булгакова", price: 270, emoji: "📖", category: "Класика", available: false },
  { id: 8, name: "Тіні забутих предків", description: "Повість Коцюбинського", price: 220, emoji: "📓", category: "Класика", available: true },
]

const categories = ['Всі', ...new Set(menuItems.map(item => item.category))]

export default function MenuFilter() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Всі')
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'Всі' || item.category === activeCategory
    const matchesAvailability = !showAvailableOnly || item.available

    return matchesSearch && matchesCategory && matchesAvailability
  })

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Пошук книги..."
        className="w-full px-4 py-3 border rounded-lg mb-6 focus:outline-none focus:border-green-600 text-gray-900"
      />

      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeCategory === cat
                ? 'bg-green-700 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-2 mb-6 cursor-pointer">
        <input
          type="checkbox"
          checked={showAvailableOnly}
          onChange={(e) => setShowAvailableOnly(e.target.checked)}
        />
        <span className="text-gray-700">Тільки в наявності</span>
      </label>

      <p className="text-sm text-gray-500 mb-4">
        Знайдено: {filteredItems.length} з {menuItems.length}
      </p>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <MenuCard key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <p className="text-center py-12 text-gray-400">Нічого не знайдено</p>
      )}
    </div>
  )
}