'use client'
import { useFavorites } from "@/contexts/FavoritesContext";

export default function FavoriteButton({ drinkId }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const liked = isFavorite(drinkId);

  return (
    <button
      onClick={() => toggleFavorite(drinkId)}
      className="text-xl transition hover:scale-110 cursor-pointer"
      title={liked ? "Видалити з обраного" : "Додати в обране"}
    >
      {liked ? "❤️" : "🤍"}
    </button>
  );
}