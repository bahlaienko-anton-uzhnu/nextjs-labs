import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-green-700 to-green-900 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link href="/" className="text-2xl font-bold tracking-wide hover:opacity-80 transition">
          📚 Бібліотека
        </Link>

        <nav>
          <ul className="flex gap-8 text-lg">
            <li>
              <Link href="/" className="hover:text-green-300 transition">
                Головна
              </Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-green-300 transition">
                Каталог
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-green-300 transition">
                Про нас
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}