'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import OrderStatusBadge from '@/components/OrderStatusBadge'

export default function OrdersPage() {
  const { data: session } = useSession()
  const role = session?.user?.role

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="text-gray-600">Завантаження...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {role === 'admin' ? 'Усі замовлення' : 'Мої замовлення'}
        </h1>

        <Link
          href="/dashboard/orders/new"
          className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
        >
          + Нове замовлення
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          Замовлень поки немає.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Дата
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Користувач
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Книги
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Сума
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Статус
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Дії
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleString('uk-UA')}
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-700">
                    {order.user?.name || '—'}
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-700">
                    {order.items?.slice(0, 2).map((item) => (
                      <div key={item._id}>
                        {item.book?.name || '(видалено)'} × {item.quantity}
                      </div>
                    ))}
                    {order.items?.length > 2 && (
                      <div className="text-xs text-gray-500">
                        і ще {order.items.length - 2}
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-3 font-medium text-gray-900">
                    {order.totalPrice} грн
                  </td>

                  <td className="px-4 py-3">
                    <OrderStatusBadge status={order.status} />
                  </td>

                  <td className="px-4 py-3">
                    <Link
                      href={`/dashboard/orders/${order._id}`}
                      className="text-green-700 hover:underline text-sm"
                    >
                      Переглянути
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}