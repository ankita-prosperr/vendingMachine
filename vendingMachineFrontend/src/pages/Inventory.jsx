import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Inventory() {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8080/admin/vending-machines/${id}/items`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch items");
        }
        return res.json();
      })
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (!id) {
    return <h3>Invalid vending machine</h3>;
  }

  if (loading) {
    return <h3>Loading inventory...</h3>;
  }

  if (items.length === 0) {
    return <h3>No items in this vending machine</h3>;
  }

  return (
    <div>
      <h2>Inventory</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>

        <tbody>
          {items.map(item => (
            <tr key={item.itemId}>
              <td>{item.itemName}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
