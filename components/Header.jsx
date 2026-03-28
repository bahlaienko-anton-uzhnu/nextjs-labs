'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const linkClass = (path) =>
    pathname === path
      ? "text-yellow-300 font-bold"
      : "hover:text-green-200";

  return (
    <header className="bg-green-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          📚 Бібліотека
        </Link>

        <nav className="flex gap-6">
          <Link href="/" className={linkClass("/")}>
            Головна
          </Link>
          <Link href="/menu" className={linkClass("/menu")}>
            Каталог
          </Link>
          <Link href="/about" className={linkClass("/about")}>
            Про нас
          </Link>
          <Link href="/contact" className={linkClass("/contact")}>
            Контакти
          </Link>
          <Link href="/dashboard" className={linkClass("/dashboard")}>
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}