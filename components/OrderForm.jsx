'use client'

import { useEffect, useState } from 'react'
import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import Link from 'next/link'

import { createOrderSchema } from '@/lib/validations/order'
import FormField from '@/components/forms/FormField'

export default function OrderForm() {
  const router = useRouter()
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'admin'

  const [books, setBooks] = useState([])
  const [users, setUsers] = useState([])
  const [loadingBooks, setLoadingBooks] = useState(true)

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      user: '',
      items: [{ book: '', quantity: 1 }],
      notes: '',
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })

  const items = useWatch({
    control,
    name: 'items',
  })

  useEffect(() => {
    fetch('/api/books')
      .then((res) => res.json())
      .then((data) => {
        setBooks(Array.isArray(data) ? data : [])
        setLoadingBooks(false)
      })
      .catch(() => setLoadingBooks(false))
  }, [])

  useEffect(() => {
    if (!isAdmin) return

    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setUsers(data)
      })
  }, [isAdmin])

  useEffect(() => {
    if (isAdmin && session?.user?.id) {
      setValue('user', session.user.id)
    }
  }, [isAdmin, session?.user?.id, setValue])

  function getBook(id) {
    return books.find((book) => book._id === id)
  }

  const totalPrice = (items || []).reduce((sum, item) => {
    const book = getBook(item?.book)
    const quantity = Number(item?.quantity || 0)

    if (!book) return sum

    return sum + Number(book.price || 0) * quantity
  }, 0)

  async function onSubmit(data) {
    const payload =
      isAdmin && data.user
        ? data
        : { ...data, user: undefined }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const body = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(
          body.errors?.join(', ') ||
            body.error ||
            'Не вдалося створити замовлення'
        )
      }

      toast.success('Замовлення створено')
      router.push(`/dashboard/orders/${body._id}`)
      router.refresh()
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (loadingBooks) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-gray-500">
        Завантаження книг...
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded-lg shadow"
    >
      {isAdmin && (
        <FormField label="Користувач *" error={errors.user?.message}>
          <select
            {...register('user')}
            className="w-full px-4 py-2 border rounded text-black bg-white"
          >
            <option value="">Оберіть користувача</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </FormField>
      )}

      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-gray-700 font-bold">
            Позиції замовлення *
          </label>

          <button
            type="button"
            onClick={() => append({ book: '', quantity: 1 })}
            className="text-green-700 hover:underline text-sm font-medium"
          >
            + Додати позицію
          </button>
        </div>

        <div className="space-y-3">
          {fields.map((field, index) => {
            const item = items?.[index]
            const book = getBook(item?.book)
            const quantity = Number(item?.quantity || 0)
            const subtotal = book ? Number(book.price || 0) * quantity : 0
            const itemErrors = errors.items?.[index]

            return (
              <div
                key={field.id}
                className="flex gap-3 items-start bg-gray-50 p-3 rounded border"
              >
                <div className="flex-1">
                  <select
                    {...register(`items.${index}.book`)}
                    className="w-full px-3 py-2 border rounded text-black bg-white"
                  >
                    <option value="">Оберіть книгу</option>
                    {books.map((book) => (
                      <option key={book._id} value={book._id}>
                        {book.name} — {book.price} грн
                      </option>
                    ))}
                  </select>

                  {itemErrors?.book && (
                    <p className="text-xs text-red-600 mt-1">
                      {itemErrors.book.message}
                    </p>
                  )}
                </div>

                <div className="w-24">
                  <input
                    type="number"
                    min="1"
                    max="20"
                    {...register(`items.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-3 py-2 border rounded text-black bg-white"
                  />

                  {itemErrors?.quantity && (
                    <p className="text-xs text-red-600 mt-1">
                      {itemErrors.quantity.message}
                    </p>
                  )}
                </div>

                <div className="w-28 text-right pt-2 text-sm text-gray-700">
                  {subtotal} грн
                </div>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                  className="text-red-600 hover:text-red-800 disabled:text-gray-300 text-lg px-2"
                >
                  ×
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <FormField label="Коментар" error={errors.notes?.message}>
        <textarea
          rows="3"
          maxLength="300"
          {...register('notes')}
          className="w-full px-4 py-2 border rounded text-black bg-white"
        />
      </FormField>

      <div className="bg-green-50 border border-green-200 px-4 py-3 rounded">
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-700">Разом:</span>
          <span className="text-2xl font-bold text-green-700">
            {totalPrice} грн
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 font-bold disabled:opacity-50"
        >
          {isSubmitting ? 'Створення...' : 'Створити замовлення'}
        </button>

        <Link
          href="/dashboard/orders"
          className="bg-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-400 font-bold inline-block"
        >
          Скасувати
        </Link>
      </div>
    </form>
  )
}