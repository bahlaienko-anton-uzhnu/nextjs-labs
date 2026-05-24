'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'

export default function OrderActions({ order, role, currentUserId }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const orderId = order?._id?.toString()
  const isAdmin = role === 'admin'

  const isOwner =
    (order.user?._id || order.user || '').toString() === currentUserId

  const canCancel = isOwner && order.status === 'pending'

  async function handleDelete() {
    if (!orderId) {
      toast.error('Немає ID замовлення')
      return
    }

    if (!confirm('Видалити замовлення?')) return

    setLoading(true)

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || 'Помилка видалення')
      }

      toast.success('Замовлення видалено')
      router.push('/dashboard/orders')
      router.refresh()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleCancel() {
    if (!orderId) {
      toast.error('Немає ID замовлення')
      return
    }

    if (!confirm('Скасувати це замовлення?')) return

    setLoading(true)

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'cancelled',
        }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.errors?.[0] || data.error || 'Помилка скасування')
      }

      toast.success('Замовлення скасовано')
      router.refresh()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-3 flex-wrap">
      {isAdmin && (
        <>
          <Link
            href={`/dashboard/orders/${orderId}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium"
          >
            Редагувати
          </Link>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm font-medium disabled:opacity-50"
          >
            {loading ? '...' : 'Видалити'}
          </button>
        </>
      )}

      {!isAdmin && canCancel && (
        <button
          onClick={handleCancel}
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm font-medium disabled:opacity-50"
        >
          {loading ? '...' : 'Скасувати'}
        </button>
      )}
    </div>
  )
}