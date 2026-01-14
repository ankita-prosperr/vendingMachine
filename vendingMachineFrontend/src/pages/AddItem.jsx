import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AddItem() {
  const { vmId } = useParams();
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
      `http://localhost:8080/admin/vending-machines/${vmId}/items`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemName,
          price: Number(price),
          quantity: Number(quantity),
        }),
      }
    );

    if (!res.ok) {
      alert("Failed to add item");
      return;
    }

    navigate(`/admin/vending-machines/${vmId}/items`);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Item</h2>

      {/* Item name enum */}
      <select
        className="border p-2 w-full mb-3"
        value={itemName}
        onChange={e => setItemName(e.target.value)}
      >
        <option value="">Select Item</option>
        <option value="COKE">Coke</option>
        <option value="PEPSI">Pepsi</option>
        <option value="CHIPS">Chips</option>
        <option value="BISCUITS">Biscuits</option>
        <option value="WATER">Water</option>
      </select>

      <input
        type="number"
        placeholder="Price"
        className="border p-2 w-full mb-3"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Quantity"
        className="border p-2 w-full mb-3"
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