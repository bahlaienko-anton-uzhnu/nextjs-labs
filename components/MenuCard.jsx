export default function MenuCard({ name, description, price, emoji, category, available = true }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300 ${
        !available ? "opacity-60" : ""
      }`}
    >
      <div className="h-36 bg-gradient-to-br from-green-200 to-green-100 flex items-center justify-center">
        <span className="text-5xl drop-shadow-md">{emoji}</span>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>

          {available ? (
            <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 whitespace-nowrap">
              В наявності
            </span>
          ) : (
            <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-700 whitespace-nowrap">
              Немає
            </span>
          )}
        </div>

        <p className="text-gray-700 text-sm mb-4">{description}</p>

        <div className="flex justify-between items-center">
          <span className="text-green-800 font-bold text-lg">{price} грн</span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
}