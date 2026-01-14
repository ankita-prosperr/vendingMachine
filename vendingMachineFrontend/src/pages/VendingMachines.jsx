import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function VendingMachines() {
  const [machines, setMachines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/admin/vending-machines")
      .then(res => res.json())
      .then(data => setMachines(data));
  }, []);

  return (
    <div>
      <h2>Vending Machines</h2>

      {machines.map(vm => (
        <div
          key={vm.vendingMachineId}
          onClick={() =>
            navigate(`/vending-machines/${vm.vendingMachineId}`)
          }
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
            cursor: "pointer"
          }}
        >
          <h3>{vm.machineName}</h3>
        </div>
      ))}
    </div>
  );
}

export default VendingMachines;
