import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateVendingMachine() {
  const [machineName, setMachineName] = useState("");
  const navigate = useNavigate();

  const createMachine = async () => {
    if (!machineName.trim()) {
      alert("Machine name cannot be empty");
      return;
    }

    const res = await fetch("http://localhost:8080/admin/vending-machines", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ machineName }),
    });

    if (!res.ok) {
      alert("Failed to create vending machine");
      return;
    }

    navigate("/admin/vending-machines");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create Vending Machine
        </h2>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Machine Name
        </label>

        <input
          type="text"
          placeholder="Enter machine name"
          value={machineName}
          onChange={e => setMachineName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => navigate("/admin/vending-machines")}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={createMachine}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateVendingMachine;