import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";

function AdminVendingMachines() {
  const [machines, setMachines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/admin/vending-machines", {credentials: "include",})
      .then(res => res.json())
      .then(data => setMachines(data))
      .catch(() => alert("Failed to load vending machines"));
  }, []);

  return (
    <AppLayout>
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
            className="cursor-pointer border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col justify-between"
          >
            {/* Machine Info */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {vm.machineName}
              </h3>
            </div>

            {/* Balance at bottom */}
            <div className="mt-4 text-right">
              <span className="text-sm text-gray-500">
                Balance
              </span>
              <p className="text-xl font-bold text-green-600">
                ₹{vm.totalAmount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </AppLayout>
  );
}

export default AdminVendingMachines;
