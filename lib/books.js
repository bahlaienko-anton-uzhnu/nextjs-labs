let books = [
  {
    id: 1,
    name: "1984",
    description: "Антиутопія Джорджа Орвелла про контроль та свободу.",
    price: 250,
    emoji: "📕",
    category: "Фантастика",
    available: true,
  },
  {
    id: 2,
    name: "Кобзар",
    description: "Збірка поезій Тараса Шевченка.",
    price: 180,
    emoji: "📗",
    category: "Поезія",
    available: false,
  },
  {
    id: 3,
    name: "Дюна",
    description: "Науково-фантастичний роман про боротьбу за владу.",
    price: 320,
    emoji: "📙",
    category: "Фантастика",
    available: true,
  },
  {
    id: 4,
    name: "Тигролови",
    description: "Пригодницький роман Івана Багряного.",
    price: 210,
    emoji: "📔",
    category: "Пригоди",
    available: true,
  },
  {
    id: 5,
    name: "Лісова пісня",
    description: "Драма Лесі Українки про природу і кохання.",
    price: 190,
    emoji: "📘",
    category: "Поезія",
    available: true,
  },
  {
    id: 6,
    name: "Острів скарбів",
    description: "Класичний роман про піратів та пригоди.",
    price: 230,
    emoji: "📚",
    category: "Пригоди",
    available: true,
  },
  {
    id: 7,
    name: "Майстер і Маргарита",
    description: "Роман Булгакова з містикою і сатирою.",
    price: 270,
    emoji: "📖",
    category: "Класика",
    available: false,
  },
  {
    id: 8,
    name: "Тіні забутих предків",
    description: "Повість про життя гуцулів і кохання.",
    price: 220,
    emoji: "📓",
    category: "Класика",
    available: true,
  },
  {
    id: 9,
    name: "Гаррі Поттер",
    description: "Фентезі про школу магії.",
    price: 300,
    emoji: "📒",
    category: "Фантастика",
    available: true,
  },
  {
    id: 10,
    name: "Алхімік",
    description: "Філософська книга про шлях до мрії.",
    price: 200,
    emoji: "📔",
    category: "Класика",
    available: true,
  },
]

let nextId = 11

export { books }

export function getBookById(id) {
  return books.find((book) => book.id === Number(id))
}

export function getCategories() {
  return ["Всі", ...new Set(books.map((book) => book.category))]
}

export function addBook(data) {
  const newBook = {
    id: nextId++,
    name: data.name,
    description: data.description || '',
    price: Number(data.price),
    emoji: data.emoji || '📘',
    category: data.category || 'Інше',
    available: data.available !== undefined ? data.available : true,
  }

  books.push(newBook)
  return newBook
}

export function updateBook(id, data) {
  const index = books.findIndex((book) => book.id === Number(id))
  if (index === -1) return null

  books[index] = {
    ...books[index],
    ...data,
    id: books[index].id,
  }

  return books[index]
}

export function deleteBook(id) {
  const index = books.findIndex((book) => book.id === Number(id))
  if (index === -1) return null

  const deleted = books[index]
  books.splice(index, 1)
  return deleted
}