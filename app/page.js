import Link from "next/link";
import MenuCard from "@/components/MenuCard";

const popularBooks = [
  {
    id: 1,
    name: "1984",
    description: "Антиутопія Джорджа Орвелла.",
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
    available: true,
  },
  {
    id: 3,
    name: "Тіні забутих предків",
    description: "Класичний твір Михайла Коцюбинського.",
    price: 220,
    emoji: "📘",
    category: "Класика",
    available: true,
  },
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Система управління бібліотекою
          </h1>

          <p className="text-xl mb-8 opacity-90">
            Зручний облік книг, читачів та швидке бронювання 📚
          </p>

          <Link
            href="/menu"
            className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-100 transition inline-block"
          >
            Розпочати
          </Link>
        </div>
      </section>

      {/* МОЖЛИВОСТІ (як в 1 лабі) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Можливості системи
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Облік книг
              </h3>
              <p className="text-gray-600">
                Додавання, редагування та пошук книг у бібліотеці.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Читачі
              </h3>
              <p className="text-gray-600">
                Реєстрація користувачів та контроль видачі книг.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Бронювання
              </h3>
              <p className="text-gray-600">
                Онлайн бронювання книг та контроль повернення.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ПОПУЛЯРНІ КНИГИ (lab2) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Популярні книги
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularBooks.map((item) => (
              <MenuCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}