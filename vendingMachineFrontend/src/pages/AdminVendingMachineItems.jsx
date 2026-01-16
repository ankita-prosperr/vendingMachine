import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AdminVendingMachineItems() {
  const { vmId } = useParams();
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/admin/vending-machines/${vmId}/slots`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => setSlots(data))
      .catch(() => alert("Failed to load inventory"));
  }, [vmId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Inventory</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {slots.map(slot => (
          <div
            key={slot.slotId}
            className="border rounded-lg shadow p-4"
          >
            {/* IMAGE / STATUS */}
            {slot.quantity === 0 ? (
              <div className="h-32 bg-red-100 flex items-center justify-center mb-3">
                <span className="text-red-600 font-bold">
                  OUT OF STOCK
                </span>
              </div>
            ) : (
              <div className="h-32 bg-gray-200 flex items-center justify-center mb-3">
                <span className="text-gray-500">No Image</span>
              </div>
            )}

            {/* CASE 1: ITEM EXISTS & IN STOCK */}
            {slot.itemName && slot.quantity > 0 && (
              <>
                <h3 className="font-semibold text-lg">
                  {slot.itemName}
                </h3>
                <p>₹ {slot.price}</p>
                <p>Qty: {slot.quantity}</p>

                <button
                  onClick={() =>
                    navigate(`/admin/slots/${slot.slotId}/edit`)
                  }
                  className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-1 rounded"
                >
                  Edit Item
                </button>
              </>
            )}

            {/* CASE 2: EMPTY SLOT OR OUT OF STOCK */}
            {(!slot.itemName || slot.quantity === 0) && (
              <button
                onClick={() =>
                  navigate(`/admin/slots/${slot.slotId}/add`)
                }
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
              >
                Add Item
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminVendingMachineItems;