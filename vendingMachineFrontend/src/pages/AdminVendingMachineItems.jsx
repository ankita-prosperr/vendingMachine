import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AdminVendingMachineItems() {
  const { vmId } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/admin/vending-machines/${vmId}/items`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(() => alert("Failed to load items"));
  }, [vmId]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">INVENTORY</h2>

        <button
          onClick={() =>
            navigate(`/admin/vending-machines/${vmId}/items/new`)
          }
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
           Add New Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(item => (
          <div
            key={item.itemId}
            className="border rounded p-4 shadow"
          >
            {/* Placeholder */}
            <div className="h-32 bg-gray-200 mb-3 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>

            <h3 className="font-semibold text-lg">
              {item.itemName}
            </h3>

            <p>Price: ₹{item.price}</p>
            <p>Quantity: {item.quantity}</p>

            <button
              onClick={() =>
                navigate(
                  `/admin/vending-machines/${vmId}/items/${item.itemId}/edit`
                )
              }
              className="mt-3 w-full bg-yellow-500 text-white py-1 rounded"
            >
               Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminVendingMachineItems;