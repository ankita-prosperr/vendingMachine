import { useLocation, useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";

function Cart() {
  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems, vendingMachineId } = location.state || {};

  if (!cartItems || Object.keys(cartItems).length === 0) {
    return <h3 className="p-6">Your cart is empty.</h3>;
  }

  // ✅ NOW THIS IS CLEAR & CORRECT
  const totalAmount = Object.values(cartItems).reduce(
    (sum, ci) => sum + ci.slot.price * ci.count,
    0
  );

  return (
    <div className="p-6">
      {/* Pay Button */}
      <button
        onClick={() =>
          navigate("/payment", {
            state: { totalAmount, vendingMachineId, cartItems },
          })
        }
        className="mb-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
      >
        Pay ₹ {totalAmount}
      </button>

      {/* Cart Items */}
      <div className="flex flex-wrap gap-6 justify-start">
        {Object.values(cartItems).map(ci => (
          <CartItemCard
            key={ci.slot.slotId}
            item={ci.slot}
            count={ci.count}
          />
        ))}
      </div>
    </div>
  );
}

export default Cart;