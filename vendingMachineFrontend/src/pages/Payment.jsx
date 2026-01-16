import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { totalAmount, vendingMachineId, cartItems } = location.state || {};
  const [selected, setSelected] = useState("");

  const paymentMethods = ["UPI", "Netbanking", "Credit Card", "Debit Card"];

  const handlePay = async () => {
    if (!selected) {
      alert("Please select a payment method!");
      return;
    }

    try {
      // ✅ Update slot quantities only
      for (const ci of Object.values(cartItems)) {
        const newQuantity = ci.slot.quantity - ci.count;

        await fetch(
          `http://localhost:8080/admin/slots/${ci.slot.slotId}/item`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quantity: newQuantity,
            }),
          }
        );
      }

      alert("Payment Successful!");
      navigate(`/vending-machines/${vendingMachineId}`);
    } catch (error) {
      console.error(error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        Select Payment Method (₹ {totalAmount})
      </h2>

      <div className="flex flex-wrap gap-6 mb-6">
        {paymentMethods.map(method => (
          <div
            key={method}
            onClick={() => setSelected(method)}
            className={`w-40 h-24 flex items-center justify-center border-2 rounded-xl cursor-pointer
              ${selected === method ? "border-blue-500" : "border-gray-300"}`}
          >
            {method}
          </div>
        ))}
      </div>

      <button
        onClick={handlePay}
        className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
      >
        Pay
      </button>
    </div>
  );
}

export default Payment;