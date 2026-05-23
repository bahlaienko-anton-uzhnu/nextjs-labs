'use client'

import { useEffect, useState, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const emptyItem = () => ({
  book: '',
  quantity: 1,
})

export default function OrderForm({
  onSubmit,
  isSubmitting,
  error,
}) {
  const { data: session } = useSession()

  const isAdmin =
    session?.user?.role === 'admin'

  const [books, setBooks] = useState([])
  const [items, setItems] = useState([emptyItem()])
  const [notes, setNotes] = useState('')
  const [loadingBooks, setLoadingBooks] = useState(true)

  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState('')

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
        if (Array.isArray(data)) {
          setUsers(data)
        }
      })
  }, [isAdmin])

  useEffect(() => {
    if (
      isAdmin &&
      session?.user?.id &&
      !userId
    ) {
      setUserId(session.user.id)
    }
  }, [isAdmin, session?.user?.id, userId])

  const booksById = useMemo(() => {
    const map = new Map()

    books.forEach((b) => {
      map.set(b._id, b)
    })

    return map
  }, [books])

  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => {
      const book = booksById.get(item.book)

      if (!book) return sum

      return (
        sum +
        book.price * Number(item.quantity || 0)
      )
    }, 0)
  }, [items, booksById])

  const updateItem = (index, patch) => {
    setItems((prev) =>
      prev.map((it, i) =>
        i === index
          ? { ...it, ...patch }
          : it
      )
    )
  }

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      emptyItem(),
    ])
  }

  const removeItem = (index) => {
    setItems((prev) =>
      prev.length === 1
        ? prev
        : prev.filter((_, i) => i !== index)
    )
  }

  const canSubmit =
    items.length > 0 &&
    items.every(
      (it) =>
        it.book &&
        Number(it.quantity) >= 1
    )

  const handleSubmit = (e) => {
    e.preventDefault()

    const payload = {
      items: items.map((it) => ({
        book: it.book,
        quantity: Number(it.quantity),
      })),
      notes: notes.trim(),
    }

    if (isAdmin && userId) {
      payload.user = userId
    }

    onSubmit(payload)
  }

  if (loadingBooks) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-gray-500">
        Завантаження книг...
      </div>
    )
  }

  return (
    <>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow"
      >
        {isAdmin && (
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Користувач *
            </label>

            <select
              required
              value={userId}
              onChange={(e) =>
                setUserId(e.target.value)
              }
              className="w-full px-4 py-2 border rounded text-black bg-white"
            >
              <option value="">
                Оберіть користувача
              </option>

              {users.map((u) => (
                <option
                  key={u._id}
                  value={u._id}
                >
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-gray-700 font-bold">
              Позиції замовлення
            </label>

            <button
              type="button"
              onClick={addItem}
              className="text-green-700 hover:underline text-sm"
            >
              + Додати
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => {
              const book =
                booksById.get(item.book)

              const subtotal = book
                ? book.price *
                  Number(item.quantity || 0)
                : 0

              return (
                <div
                  key={index}
                  className="flex gap-3 items-start bg-gray-50 p-3 rounded border"
                >
                  <div className="flex-1">
                    <select
                      required
                      value={item.book}
                      onChange={(e) =>
                        updateItem(index, {
                          book: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded text-black bg-white"
                    >
                      <option value="">
                        Оберіть книгу
                      </option>

                      {books.map((b) => (
                        <option
                          key={b._id}
                          value={b._id}
                        >
                          {b.name} — {b.price} грн
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-24">
                    <input
                      type="number"
                      min="1"
                      max="20"
                      required
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(index, {
                          quantity:
                            e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded text-black bg-white"
                    />
                  </div>

                  <div className="w-24 text-right pt-2 text-sm text-gray-700">
                    {subtotal
                      ? `${subtotal} грн`
                      : '—'}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeItem(index)
                    }
                    disabled={items.length === 1}
                    className="text-red-600 text-lg px-2"
                  >
                    ×
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Коментар
          </label>

          <textarea
            rows="3"
            maxLength="300"
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            className="w-full px-4 py-2 border rounded text-black bg-white"
          />
        </div>

        {totalPrice > 0 && (
          <div className="bg-green-50 border border-green-200 px-4 py-3 rounded">
            <p className="text-gray-700">
              <strong>До сплати:</strong>{' '}
              <span className="text-xl font-bold text-green-700">
                {totalPrice} грн
              </span>
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={
              isSubmitting || !canSubmit
            }
            className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 font-bold disabled:opacity-50"
          >
            {isSubmitting
              ? 'Створення...'
              : 'Створити замовлення'}
          </button>

          <Link
            href="/dashboard/orders"
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-400 font-bold inline-block"
          >
            Скасувати
          </Link>
        </div>
      </form>
    </>
  )
}