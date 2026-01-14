import { useEffect, useState } from "react";
import VendingMachineCard from "../components/VendingMachineCard";

function VendingMachines() {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/admin/vending-machines")
      .then(res => res.json())
      .then(data => setMachines(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Vending Machines</h2>

      <div className="flex flex-wrap gap-6">
        {machines.map(vm => (
          <VendingMachineCard key={vm.vendingMachineId} machine={vm} />
        ))}
      </div>
    </div>
  );
}

export default VendingMachines;
