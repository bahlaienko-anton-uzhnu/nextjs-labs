import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

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
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="text-4xl text-center mb-2">{emoji}</div>

      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-black">{name}</h3>

        <div className="flex items-center gap-2">
          {id && <FavoriteButton drinkId={id} />}
          <span
            className={`text-xs px-2 py-1 rounded ${
              available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {available ? "В наявності" : "Немає"}
          </span>
        </div>
      </div>

      <p className="text-gray-700 mb-2">{description}</p>
      <p className="text-green-700 font-bold">{price} грн</p>
      <p className="text-sm text-gray-500 mb-3">{category}</p>

      <Link href={`/menu/${id}`} className="text-green-700 underline">
        Детальніше →
      </Link>
    </div>
  );
}