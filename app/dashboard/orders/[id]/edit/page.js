'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import Link from 'next/link'

import { updateOrderSchema } from '@/lib/validations/order'
import FormField from '@/components/forms/FormField'

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
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateOrderSchema),
    defaultValues: {
      status: 'pending',
      notes: '',
    },
  })

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
          setLoading(false)
          return
        }

        setOrder(data)
        reset({
          status: data.status || 'pending',
          notes: data.notes || '',
        })
        setLoading(false)
      })
      .catch(() => {
        toast.error('Помилка завантаження')
        setLoading(false)
      })
  }, [params.id, reset])

  async function onSubmit(data) {
    try {
      const res = await fetch(`/api/orders/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const body = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(
          body.errors?.join(', ') ||
            body.error ||
            'Помилка збереження'
        )
      }

      toast.success('Замовлення оновлено')
      router.push(`/dashboard/orders/${params.id}`)
      router.refresh()
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (loading) {
    return <div className="text-gray-700">Завантаження...</div>
  }

  if (!order) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded">
        Замовлення не знайдено
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow space-y-5"
      >
        <div className="text-gray-900">
          <p>
            Користувач:{' '}
            <strong>{order.user?.name || '—'}</strong>
          </p>

          <p>
            Сума:{' '}
            <strong>{order.totalPrice} грн</strong>
          </p>
        </div>

        <FormField
          label="Статус *"
          error={errors.status?.message}
        >
          <select
            {...register('status')}
            className="w-full px-4 py-2 border rounded text-black bg-white"
          >
            {STATUSES.map((status) => (
              <option
                key={status.value}
                value={status.value}
              >
                {status.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          label="Коментар"
          error={errors.notes?.message}
        >
          <textarea
            rows="3"
            maxLength="300"
            {...register('notes')}
            className="w-full px-4 py-2 border rounded text-black bg-white"
          />
        </FormField>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 font-bold disabled:opacity-50"
          >
            {isSubmitting
              ? 'Збереження...'
              : 'Зберегти'}
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