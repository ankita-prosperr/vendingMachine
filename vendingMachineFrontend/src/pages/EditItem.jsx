import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditItem() {
  const { itemId, vmId } = useParams();
  const navigate = useNavigate();

  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const updateItem = async () => {
    if (!price && !quantity) {
      alert("Provide price or quantity");
      return;
    }

    const res = await fetch(
      `http://localhost:8080/admin/items/${itemId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: price ? Number(price) : undefined,
          quantity: quantity ? Number(quantity) : undefined,
        }),
      }
    );

    if (!res.ok) {
      alert("Update failed");
      return;
    }

    navigate(`/admin/vending-machines/${vmId}/items`);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Item</h2>

      <input
        placeholder="New Price"
        className="border p-2 w-full mb-3"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      <input
        placeholder="New Quantity"
        className="border p-2 w-full mb-3"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />

      <button
        onClick={updateItem}
        className="bg-green-600 text-white w-full py-2 rounded"
      >
        Update
      </button>
    </div>
  );
}

export default EditItem;
