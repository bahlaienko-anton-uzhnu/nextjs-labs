'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Error caught:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-5xl mb-4">⚠️</div>

        <h2 className="text-2xl font-bold text-red-600 mb-3">
          Виникла помилка
        </h2>

        <p className="text-gray-700 mb-6">
          {error.message}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
         <button
  onClick={() => window.location.reload()}
  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
>
  Спробувати знову
</button>

          <button
            onClick={() => window.location.reload()}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
          >
            Оновити сторінку
          </button>
        </div>
      </div>
    </div>
  )
}