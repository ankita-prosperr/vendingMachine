import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount, vendingMachineId } = location.state || {};
  const [selected, setSelected] = useState("");

  const paymentMethods = ["UPI", "Netbanking", "Credit Card", "Debit Card"];

  const handlePay = () => {
    if (!selected) {
      alert("Please select a payment method!");
      return;
    }

    alert("Payment Successful!");
    navigate(`/vending-machines/${vendingMachineId}`);
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
