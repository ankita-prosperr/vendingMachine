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
              <div className="h-32 bg-gray-200 mb-3 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>

              <h3 className="font-semibold text-lg">
                {item.itemName}
              </h3>

              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.quantity}</p>

              {/* Edit +  Delete buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() =>
                    navigate(
                      `/admin/vending-machines/${vmId}/items/${item.itemId}/edit`
                    )
                  }
                  className="flex-1 bg-yellow-500 text-white py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteItem(item.itemId)}
                  className="flex-1 bg-red-600 text-white py-1 rounded"
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