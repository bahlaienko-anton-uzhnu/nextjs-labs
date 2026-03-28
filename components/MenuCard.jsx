import Link from "next/link";

export default function MenuCard({
  id,
  name,
  description,
  price,
  emoji,
  category,
  available = true,
}) {
  return (
    <div className={`bg-white rounded-xl shadow-md p-5 transition ${
      !available ? "opacity-50" : ""
    }`}>
      
      <div className="text-5xl text-center mb-3">{emoji}</div>

      {/* 🔥 ВАЖЛИВО */}
      <h3 className="text-xl font-bold text-black mb-1">
        {name}
      </h3>

      <p className="text-gray-700 text-sm mb-2">
        {description}
      </p>

      <p className="text-green-700 font-bold text-lg">
        {price} грн
      </p>

      <p className="text-gray-500 text-sm mb-3">
        {category}
      </p>

      {id && (
        <Link
          href={`/menu/${id}`}
          className="text-green-700 font-semibold hover:underline"
        >
          Детальніше →
        </Link>
      )}
    </div>
  );
}