'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Огляд" },
  { href: "/dashboard/books", label: "Книги" },
  { href: "/dashboard/readers", label: "Читачі" },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="space-y-2">
        {links.map((link) => {
          const isActive =
            link.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-green-700 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}