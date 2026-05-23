import dbConnect from '@/lib/db'
import Order from '@/lib/models/Order'
import OrderItem from '@/lib/models/OrderItem'

export async function GET(request, { params }) {
  await dbConnect()

  try {
    const { id } = await params

    const order = await Order.findById(id)
      .populate('user', 'name email role')
      .populate({
        path: 'items',
        populate: {
          path: 'book',
          select: 'name price emoji category',
        },
      })

    if (!order) {
      return Response.json({ error: 'Замовлення не знайдено' }, { status: 404 })
    }

    return Response.json(order)
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  await dbConnect()

  try {
    const { id } = await params
    const body = await request.json()

    const updatedOrder = await Order.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (!updatedOrder) {
      return Response.json({ error: 'Замовлення не знайдено' }, { status: 404 })
    }

    return Response.json(updatedOrder)
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  await dbConnect()

  try {
    const { id } = await params

    await OrderItem.deleteMany({ order: id })
    const deleted = await Order.deleteOne({ _id: id })

    if (deleted.deletedCount === 0) {
      return Response.json({ error: 'Замовлення не знайдено' }, { status: 404 })
    }

    return Response.json({ message: 'Замовлення видалено' })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}