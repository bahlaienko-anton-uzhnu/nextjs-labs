import dbConnect from '@/lib/db'

export async function GET() {
  try {
    await dbConnect()

    return Response.json({
      message: 'MongoDB підключено!',
      status: 'ok',
    })
  } catch (error) {
    return Response.json(
      {
        message: 'Помилка підключення',
        error: error.message,
      },
      { status: 500 }
    )
  }
}