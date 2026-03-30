'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DrinkActions({ drinkId }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    console.log(`Видалення книги ${drinkId}`);
    setShowConfirm(false);
    router.push("/dashboard/books");
  };

  if (showConfirm) {
    return (
      <div className="space-x-2">
        <span className="text-red-600 font-semibold mr-2">Видалити?</span>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
        >
          Так
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
        >
          Ні
        </button>
      </div>
    );
  }

  return (
    <div className="space-x-2">
      <button className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-800 cursor-pointer">
        Редагувати
      </button>
      <button
        onClick={() => setShowConfirm(true)}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
      >
        Видалити
      </button>
    </div>
  );
}