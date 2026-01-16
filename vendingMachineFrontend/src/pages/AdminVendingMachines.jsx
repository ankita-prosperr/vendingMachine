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

  // 🗑️ DELETE VENDING MACHINE
  const deleteMachine = async (e, vmId) => {
    e.stopPropagation(); //Prevent card click

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

    // Remove from UI
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-200"
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
              className="cursor-pointer border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col justify-between"
            >
              {/* Machine Info */}
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {vm.machineName}
                </h3>
              </div>

              {/* Bottom section */}
              <div className="mt-4 flex justify-between items-end">
                <div>
                  <span className="text-sm text-gray-500">Balance</span>
                  <p className="text-xl font-bold text-green-600">
                    ₹{vm.totalAmount}
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={(e) =>
                    deleteMachine(e, vm.vendingMachineId)
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
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

export default AdminVendingMachines;