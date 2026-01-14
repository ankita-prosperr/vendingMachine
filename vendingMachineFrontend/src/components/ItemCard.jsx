import { useState } from "react";

function ItemCard({ item, onCartChange }) {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1);
    onCartChange(1); // ✅ Inform Inventory about added item
  };

  const decrement = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
      onCartChange(-1); // ✅ Inform Inventory about removed item
    }
  };

  return (
    <div className="w-64 p-4 border rounded-xl shadow-md bg-white flex flex-col items-center">
      
      {/* Image Holder */}
      <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
        <span className="text-gray-500">Image</span>
      </div>

      {/* Item Name */}
      <h3 className="font-semibold text-lg mb-1">{item.itemName}</h3>

      {/* Price */}
      <p className="font-bold text-xl mb-4">₹ {item.price}</p>

      {/* Counter */}
      <div className="flex items-center gap-4">
        <button
          onClick={decrement}
          className="w-8 h-8 border rounded-md text-lg flex items-center justify-center disabled:opacity-40"
          disabled={count === 0}
        >
          −
        </button>

        <span className="text-lg w-6 text-center">{count}</span>

        <button
          onClick={increment}
          className="w-8 h-8 border rounded-md text-lg flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
