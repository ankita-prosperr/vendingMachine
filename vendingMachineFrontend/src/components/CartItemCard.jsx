function CartItemCard({ item, count }) {
  return (
    <div className="w-64 p-4 border rounded-xl shadow-md bg-white flex flex-col items-center">
      
      {/* Image Placeholder */}
      <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
        <span className="text-gray-500">Image</span>
      </div>

      {/* Item Name */}
      <h3 className="font-semibold text-lg mb-1 text-center">{item.itemName}</h3>

      {/* Quantity */}
      <p className="text-gray-700 mb-2">Quantity: {count}</p>

      {/* Total Price */}
      <p className="font-bold text-xl">₹ {item.price * count}</p>
    </div>
  );
}

export default CartItemCard;
