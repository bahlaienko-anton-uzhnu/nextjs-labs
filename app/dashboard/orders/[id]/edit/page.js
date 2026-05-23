'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

const STATUSES = [
  { value: 'pending', label: 'Очікує' },
  { value: 'preparing', label: 'Готується' },
  { value: 'ready', label: 'Готово' },
  { value: 'completed', label: 'Виконано' },
  { value: 'cancelled', label: 'Скасовано' },
]

export default function EditOrderPage() {
  const router = useRouter()
  const params = useParams()

  const [order, setOrder] = useState(null)
  const [status, setStatus] = useState('pending')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setLoading(false)
          return
        }

        setOrder(data)
        setStatus(data.status)
        setNotes(data.notes || '')
        setLoading(false)
      })
      .catch(() => {
        setError('Помилка завантаження')
        setLoading(false)
      })
  }, [params.id])

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const res = await fetch(`/api/orders/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes }),
    })

    const body = await res.json().catch(() => ({}))
    setSaving(false)

    if (!res.ok) {
      setError(body.errors?.join(', ') || body.error || 'Помилка збереження')
      return
    }

    router.push(`/dashboard/orders/${params.id}`)
    router.refresh()
  }

  if (loading) {
    return <div className="text-gray-700">Завантаження...</div>
  }

  if (!order) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded">
        {error || 'Замовлення не знайдено'}
      </div>
    )
  }

  return (
    <div className="max-w-2xl text-black">
      <Link
        href={`/dashboard/orders/${params.id}`}
        className="text-green-700 hover:underline text-sm"
      >
        &larr; До замовлення
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 my-6">
        Редагування замовлення
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-5">
        <div className="text-gray-900">
          <p>
            Користувач: <strong>{order.user?.name}</strong>
          </p>
          <p>
            Сума: <strong>{order.totalPrice} грн</strong>
          </p>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Статус
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border rounded text-black bg-white"
          >
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Коментар
          </label>

          <textarea
            rows="3"
            maxLength="300"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2 border rounded text-black bg-white"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 font-bold disabled:opacity-50"
          >
            {saving ? 'Збереження...' : 'Зберегти'}
          </button>

          <Link
            href={`/dashboard/orders/${params.id}`}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-400 font-bold"
          >
            Скасувати
          </Link>
        </div>
      </form>
    </div>
  )
}