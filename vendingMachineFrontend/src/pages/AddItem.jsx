import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AddItem() {
  const { slotId } = useParams();
  const navigate = useNavigate();

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const addItem = async () => {
    if (!itemName || !price || !quantity) {
      alert("All fields are required");
      return;
    }

    const res = await fetch(
      `http://localhost:8080/admin/slots/${slotId}/item`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemName,
          price: Number(price),
          quantity: Number(quantity)
        }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      alert(err.message || "Failed to add item");
      return;
    }

    navigate(-1);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Item</h2>

      {/* ITEM NAME */}
      <input
        type="text"
        placeholder="Item Name"
        className="border p-2 w-full mb-3"
        value={itemName}
        onChange={e => setItemName(e.target.value)}
      />

      {/* PRICE */}
      <input
        type="number"
        placeholder="Price"
        className="border p-2 w-full mb-3"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      {/* QUANTITY */}
      <input
        type="number"
        placeholder="Quantity"
        className="border p-2 w-full mb-4"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />

      <button
        onClick={addItem}
        className="bg-blue-600 text-white w-full py-2 rounded"
      >
        Add Item
      </button>
    </div>
  );
}

export default AddItem;