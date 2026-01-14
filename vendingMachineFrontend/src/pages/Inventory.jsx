import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ItemCard from "../components/ItemCard";

function Inventory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState({}); // store itemId -> {item, count}

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8080/admin/vending-machines/${id}/items`)
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      });
  }, [id]);

  // Handle cart change for each item
  const handleCartChange = (item, change) => {
    setCartCount(prev => prev + change);

    setCartItems(prev => {
      const newCart = { ...prev };
      if (!newCart[item.itemId]) {
        newCart[item.itemId] = { item, count: 0 };
      }
      newCart[item.itemId].count += change;

      if (newCart[item.itemId].count <= 0) {
        delete newCart[item.itemId];
      }

      return newCart;
    });
  };

  if (loading) return <h3>Loading inventory...</h3>;

  return (
    <div className="p-6 relative">
      {/* Cart Counter in top-right */}
      <div className="absolute top-4 right-4 group">
        <div className="bg-gray-100 px-4 py-2 rounded-full shadow-md cursor-pointer">
          Cart: {cartCount} {cartCount === 1 ? "item" : "items"}
        </div>

        {/* Dropdown on hover */}
        {cartCount > 0 && (
          <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => navigate("/cart", { state: { cartItems, vendingMachineId: id} })}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Go to Cart
            </button>
          </div>
        )}
      </div>

      <h2 className="text-3xl font-bold mb-6">Inventory</h2>

      <div className="flex flex-wrap gap-6 justify-start">
        {items.map(item => (
          <ItemCard key={item.itemId} item={item} onCartChange={(change) => handleCartChange(item, change)} />
        ))}
      </div>
    </div>
  );
}

export default Inventory;
