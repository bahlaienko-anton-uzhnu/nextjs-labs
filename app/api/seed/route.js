import dbConnect from '@/lib/db'
import Book from '@/lib/models/Book'

const initialBooks = [
  {
    name: '1984',
    description: 'Антиутопія Джорджа Орвелла про контроль та свободу.',
    price: 250,
    emoji: '📕',
    category: 'Фантастика',
    available: true,
  },
  {
    name: 'Кобзар',
    description: 'Збірка поезій Тараса Шевченка.',
    price: 180,
    emoji: '📗',
    category: 'Поезія',
    available: false,
  },
  {
    name: 'Дюна',
    description: 'Науково-фантастичний роман про боротьбу за владу.',
    price: 320,
    emoji: '📙',
    category: 'Фантастика',
    available: true,
  },
  {
    name: 'Тигролови',
    description: 'Пригодницький роман Івана Багряного.',
    price: 210,
    emoji: '📔',
    category: 'Пригоди',
    available: true,
  },
  {
    name: 'Лісова пісня',
    description: 'Драма Лесі Українки про природу і кохання.',
    price: 190,
    emoji: '📘',
    category: 'Поезія',
    available: true,
  },
  {
    name: 'Острів скарбів',
    description: 'Класичний роман про піратів та пригоди.',
    price: 230,
    emoji: '📚',
    category: 'Пригоди',
    available: true,
  },
  {
    name: 'Майстер і Маргарита',
    description: 'Роман Булгакова з містикою і сатирою.',
    price: 270,
    emoji: '📖',
    category: 'Класика',
    available: false,
  },
  {
    name: 'Тіні забутих предків',
    description: 'Повість про життя гуцулів і кохання.',
    price: 220,
    emoji: '📓',
    category: 'Класика',
    available: true,
  },
  {
    name: 'Гаррі Поттер',
    description: 'Фентезі про школу магії.',
    price: 300,
    emoji: '📒',
    category: 'Фантастика',
    available: true,
  },
  {
    name: 'Алхімік',
    description: 'Філософська книга про шлях до мрії.',
    price: 200,
    emoji: '📔',
    category: 'Класика',
    available: true,
  },
]

export async function GET() {
  try {
    await dbConnect()

    await Book.deleteMany({})
    const books = await Book.create(initialBooks)

    return Response.json({
      message: `Базу наповнено: ${books.length} книг`,
      books,
    })
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    )
  }
}