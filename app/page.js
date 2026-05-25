import Link from "next/link";
import Image from "next/image";

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
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80"
          alt="Бібліотека"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-700/60" />

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            Система управління бібліотекою
          </h1>

          <p className="text-xl mb-8 opacity-95">
            Зручний облік книг, читачів та швидке бронювання 📚
          </p>

          <Link
            href="/menu"
            className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-100 transition inline-block shadow-lg"
          >
            Розпочати
          </Link>
        </div>
      </section>

      {/* МОЖЛИВОСТІ */}
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

      {/* ПОПУЛЯРНІ КНИГИ */}
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