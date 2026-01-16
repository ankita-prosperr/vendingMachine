import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";

function AdminVendingMachines() {
  const [machines, setMachines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/admin/vending-machines", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setMachines(data))
      .catch(() => alert("Failed to load vending machines"));
  }, []);

  const deleteMachine = async (e, vmId) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure? This will delete the vending machine and ALL its items."
    );

    if (!confirmDelete) return;

    const res = await fetch(
      `http://localhost:8080/admin/vending-machines/${vmId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!res.ok) {
      alert("Failed to delete vending machine");
      return;
    }

    setMachines(prev =>
      prev.filter(vm => vm.vendingMachineId !== vmId)
    );
  };

  return (
    <AppLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Vending Machines</h2>

          <button
            onClick={() => navigate("/admin/create-vending-machine")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Add New Machine
          </button>
        </div>

        {/* Machines */}
        <div className="flex flex-wrap gap-6 justify-start">
          {machines.map(vm => (
            <div
              key={vm.vendingMachineId}
              onClick={() =>
                navigate(`/admin/vending-machines/${vm.vendingMachineId}/items`)
              }
              className="w-64 p-4 border rounded-xl shadow-md bg-white flex flex-col items-center cursor-pointer"
            >
              {/* Image */}
              <img
                src={vm.imageUrl || "/placeholder.png"}
                alt={vm.machineName}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />

              {/* Name */}
              <h3 className="font-semibold text-lg mb-2 text-center">
                {vm.machineName}
              </h3>

              {/* Balance */}
              <p className="text-green-600 font-bold mb-4">
                ₹ {vm.totalAmount}
              </p>

              {/* Delete */}
              <button
                onClick={(e) =>
                  deleteMachine(e, vm.vendingMachineId)
                }
                className="w-full bg-red-600 hover:bg-red-700 text-white py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

export default AdminVendingMachines;
