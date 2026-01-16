import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateVendingMachine() {
  const [machineName, setMachineName] = useState("");
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(4);

  const navigate = useNavigate();

  const createMachine = async () => {
    if (!machineName.trim()) {
      alert("Machine name cannot be empty");
      return;
    }

    if (rows <= 0 || columns <= 0) {
      alert("Rows and columns must be greater than 0");
      return;
    }

    const res = await fetch("http://localhost:8080/admin/vending-machines", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        machineName,
        rows,
        columns
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.message || "Failed to create vending machine");
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

        {/* Machine Name */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Machine Name
        </label>
        <input
          type="text"
          value={machineName}
          onChange={e => setMachineName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4"
          placeholder="Enter machine name"
        />

        {/* Rows */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rows
        </label>
        <input
          type="number"
          min="1"
          value={rows}
          onChange={e => setRows(Number(e.target.value))}
          className="w-full px-4 py-2 border rounded-lg mb-4"
        />

        {/* Columns */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Columns
        </label>
        <input
          type="number"
          min="1"
          value={columns}
          onChange={e => setColumns(Number(e.target.value))}
          className="w-full px-4 py-2 border rounded-lg mb-6"
        />

        <div className="flex justify-between">
          <button
            onClick={() => navigate("/admin/vending-machines")}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={createMachine}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateVendingMachine;