import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";

function AdminVendingMachineItems() {
  const { vmId } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/admin/vending-machines/${vmId}/items`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(() => alert("Failed to load items"));
  }, [vmId]);

  // DELETE ITEM
  const deleteItem = async (itemId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    const res = await fetch(
      `http://localhost:8080/admin/items/${itemId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!res.ok) {
      alert("Failed to delete item");
      return;
    }

    setItems(prevItems =>
      prevItems.filter(item => item.itemId !== itemId)
    );
  };

  return (
    <AppLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">INVENTORY</h2>

          <button
            onClick={() =>
              navigate(`/admin/vending-machines/${vmId}/items/new`)
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add New Item
          </button>
        </div>

        {/* Items Grid */}
        <div className="flex flex-wrap gap-6 justify-start">
          {items.map(item => (
            <div
              key={item.itemId}
              className="w-64 p-4 border rounded-xl shadow-md bg-white flex flex-col items-center"
            >
              {/* Item Image */}
              <img
                src={item.imageUrl || "/placeholder.png"}
                alt={item.itemName}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />

              {/* Item Name */}
              <h3 className="font-semibold text-lg mb-1 text-center">
                {item.itemName}
              </h3>

              {/* Price */}
              <p className="font-bold text-xl mb-1">
                ₹ {item.price}
              </p>

              {/* Quantity */}
              <p className="text-sm text-gray-600 mb-4">
                Quantity: {item.quantity}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2 w-full">
                <button
                  onClick={() =>
                    navigate(
                      `/admin/vending-machines/${vmId}/items/${item.itemId}/edit`
                    )
                  }
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteItem(item.itemId)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

export default AdminVendingMachineItems;
