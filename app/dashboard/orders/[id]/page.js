import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import dbConnect from '@/lib/db'

import Order from '@/lib/models/Order'
import OrderItem from '@/lib/models/OrderItem'
import Book from '@/lib/models/Book'
import User from '@/lib/models/User'

import OrderStatusBadge from '@/components/OrderStatusBadge'
import OrderActions from '@/components/OrderActions'

void [Book, User, OrderItem]

export default async function OrderDetailsPage({ params }) {
  const session = await auth()

  if (!session) redirect('/login')

  const { id } = await params

  await dbConnect()

  let order

  try {
    order = await Order.findById(id)
      .populate({
        path: 'user',
        select: 'name email role',
      })
      .populate({
        path: 'items',
        populate: {
          path: 'book',
          select: 'name price emoji category description',
        },
      })
      .lean({ virtuals: true })
  } catch {
    notFound()
  }

  if (!order) notFound()

  const isAdmin = session.user.role === 'admin'
  const isOwner = order.user?._id?.toString() === session.user.id

  if (!isAdmin && !isOwner) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded">
        У вас немає доступу до цього замовлення.
      </div>
    )
  }

  const serialized = JSON.parse(JSON.stringify(order))
  const items = serialized.items || []

  return (
    <div className="max-w-3xl text-black">
      <div className="mb-4">
        <Link
          href="/dashboard/orders"
          className="text-green-700 hover:underline text-sm"
        >
          &larr; До списку
        </Link>
      </div>

      <div className="flex justify-between items-start mb-6 text-black">
        <h1 className="text-3xl font-bold text-gray-900">
          Замовлення #{serialized._id.slice(-6)}
        </h1>

        <OrderStatusBadge status={serialized.status} />
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-5 text-black">
        <div className="text-gray-900">
          <strong>Користувач:</strong> {serialized.user?.name}
        </div>

        <div className="text-gray-900">
          <strong>Дата:</strong>{' '}
          {new Date(serialized.createdAt).toLocaleString('uk-UA')}
        </div>

        {serialized.notes && (
          <div className="text-gray-900">
            <strong>Коментар:</strong> {serialized.notes}
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
        Позиції
      </h2>

      <div className="bg-white rounded-lg shadow overflow-hidden text-black">
        <table className="w-full text-gray-900">
          <thead className="bg-gray-100 text-gray-900">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase">
                Книга
              </th>

              <th className="px-4 py-3 text-right text-xs font-bold uppercase">
                Ціна
              </th>

              <th className="px-4 py-3 text-right text-xs font-bold uppercase">
                К-сть
              </th>

              <th className="px-4 py-3 text-right text-xs font-bold uppercase">
                Сума
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-gray-900">
            {items.map((it) => {
              const subtotal = it.priceAtOrder * it.quantity

              return (
                <tr key={it._id}>
                  <td className="px-4 py-3 text-gray-900">
                    {it.book ? (
                      <div>
                        <div className="font-medium text-gray-900">
                          {it.book.name}
                        </div>

                        <div className="text-xs text-gray-700">
                          {it.book.category}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-500 italic">
                        (книгу видалено)
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-right text-gray-900">
                    {it.priceAtOrder} грн
                  </td>

                  <td className="px-4 py-3 text-right text-gray-900">
                    {it.quantity}
                  </td>

                  <td className="px-4 py-3 text-right font-medium text-gray-900">
                    {subtotal} грн
                  </td>
                </tr>
              )
            })}
          </tbody>

          <tfoot className="bg-gray-100 text-gray-900">
            <tr>
              <td
                colSpan={3}
                className="px-4 py-3 text-right font-bold text-gray-900"
              >
                Разом:
              </td>

              <td className="px-4 py-3 text-right text-xl font-bold text-green-700">
                {serialized.totalPrice} грн
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-6">
        <OrderActions
          order={serialized}
          role={session.user.role}
          currentUserId={session.user.id}
        />
      </div>
    </div>
  )
}