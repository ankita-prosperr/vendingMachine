function ItemCard({ item, count, onCartChange }) {
  const stock = item.quantity;
  const isOutOfStock = stock === 0;

  const increment = () => {
    if (isOutOfStock) return;

    if (count >= stock) {
      alert(`Only ${stock} item${stock > 1 ? "s" : ""} available`);
      return;
    }

    onCartChange(1);
  };

  const decrement = () => {
    if (count > 0) {
      onCartChange(-1);
    }
  };

  return (
    <div
      className={`w-64 p-4 border rounded-xl shadow-md flex flex-col items-center
      ${isOutOfStock ? "bg-gray-200 opacity-70" : "bg-white"}`}
    >
      {/* Image Holder */}
      {/* <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
        <span className="text-gray-500">Image</span>
      </div> */}
      <img
        src={item.imageUrl || "/placeholder.png"}
        alt={item.itemName}
        className="w-full h-32 object-cover rounded-lg mb-4"
      />


      {/* Item Name */}
      <h3 className="font-semibold text-lg mb-1">{item.itemName}</h3>

      {/* Price */}
      <p className="font-bold text-xl mb-1">₹ {item.price}</p>

      {!isOutOfStock && (
        <p className="text-sm text-gray-600 mb-3">
          Available: {stock}
        </p>
      )}

      {isOutOfStock && (
        <p className="text-red-600 font-semibold mb-3">Out of Stock</p>
      )}

      {/* Counter */}
      <div className="flex items-center gap-4">
        <button
          onClick={decrement}
          disabled={count === 0 || isOutOfStock}
          className="w-8 h-8 border rounded-md text-lg flex items-center justify-center disabled:opacity-40"
        >
          −
        </button>

        <span className="text-lg w-6 text-center">{count}</span>

        <button
          onClick={increment}
          disabled={isOutOfStock}
          className="w-8 h-8 border rounded-md text-lg flex items-center justify-center disabled:opacity-40"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
