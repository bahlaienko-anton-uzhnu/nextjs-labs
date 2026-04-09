"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

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

        <nav className="flex items-center gap-6">
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

          {!session && (
            <>
              <Link
                href="/login"
                className="bg-white text-green-700 px-3 py-1 rounded-lg hover:bg-gray-200 transition"
              >
                Увійти
              </Link>

              <Link
                href="/register"
                className="bg-yellow-400 text-black px-3 py-1 rounded-lg hover:bg-yellow-300 transition"
              >
                Реєстрація
              </Link>
            </>
          )}

          {session && (
            <>
              <span className="text-sm text-gray-200">
                {session.user?.email}
              </span>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Вийти
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}