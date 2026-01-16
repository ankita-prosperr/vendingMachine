import { useLocation, useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";
import AppLayout from "../components/AppLayout";

function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, vendingMachineId, } = location.state || {};

  if (!cartItems || Object.keys(cartItems).length === 0) {
    return <h3 className="p-6">Your cart is empty.</h3>;
  }

  // Calculate total amount
  const totalAmount = Object.values(cartItems).reduce(
    (sum, ci) => sum + ci.item.price * ci.count,
    0
  );

  return (
    <AppLayout>
    <div className="p-6">
      {/* Pay Button */}
      <button
        onClick={() => navigate("/payment", { state: { totalAmount, vendingMachineId, cartItems, } })}
        className="mb-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
      >
        Pay ₹ {totalAmount}
      </button>

      {/* Cart Items */}
      <div className="flex flex-wrap gap-6 justify-start">
        {Object.values(cartItems).map(ci => (
          <CartItemCard
            key={ci.item.itemId}
            item={ci.item}
            count={ci.count}
          />
        ))}
      </div>
    </div>
    </AppLayout>
  );
}

export default Cart;
