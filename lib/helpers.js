import { books } from "./books";

export function getBookStats() {
  const total = books.length;
  const available = books.filter((b) => b.available).length;
  const unavailable = total - available;
  const categories = [...new Set(books.map((b) => b.category))];
  const avgPrice = Math.round(
    books.reduce((sum, b) => sum + b.price, 0) / total
  );

  return {
    total,
    available,
    unavailable,
    categoriesCount: categories.length,
    avgPrice,
  };
}