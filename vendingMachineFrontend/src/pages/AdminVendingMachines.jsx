import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminVendingMachines() {
  const [machines, setMachines] = useState([]);
  const navigate = useNavigate();

  const loadMachines = () => {
    fetch("http://localhost:8080/admin/vending-machines")
      .then(res => res.json())
      .then(data => setMachines(data))
      .catch(() => alert("Failed to load vending machines"));
  };

  useEffect(() => {
    loadMachines();
  }, []);

  const deleteMachine = async (e, vmId) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vending machine?"
    );

    if (!confirmDelete) return;

    const res = await fetch(
      `http://localhost:8080/admin/vending-machines/${vmId}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      alert("Failed to delete vending machine");
      return;
    }

    // Reload list after delete
    loadMachines();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Vending Machines</h2>

        <button
          onClick={() => navigate("/admin/create-vending-machine")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg
                     shadow-md transition duration-200"
        >
          Add New Machine
        </button>
      </div>

      {/* Machines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {machines.map(vm => (
          <div
            key={vm.vendingMachineId}
            onClick={() =>
              navigate(`/admin/vending-machines/${vm.vendingMachineId}/items`)
            }
            className="cursor-pointer border rounded-lg shadow hover:shadow-lg
                       transition p-4 flex flex-col justify-between"
          >
            {/* Machine Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {vm.machineName}
              </h3>
            </div>

            {/* Delete Button */}
            <button
              onClick={(e) =>
                deleteMachine(e, vm.vendingMachineId)
              }
              className="mt-4 bg-red-600 hover:bg-red-700 text-white
                         py-2 rounded-md text-sm transition"
            >
              Delete Vending Machine
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminVendingMachines;