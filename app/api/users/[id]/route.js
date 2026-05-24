import dbConnect from '@/lib/db'
import User from '@/lib/models/User'

export async function PUT(request, { params }) {
  try {
    await dbConnect()

    const { id } = await params
    const body = await request.json()

    const role = body.role

    if (!['admin', 'user'].includes(role)) {
      return Response.json(
        { error: 'Невалідна роль' },
        { status: 400 }
      )
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select('-password')

    if (!updatedUser) {
      return Response.json(
        { error: 'Користувача не знайдено' },
        { status: 404 }
      )
    }

    return Response.json(updatedUser)
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    )
  }
}