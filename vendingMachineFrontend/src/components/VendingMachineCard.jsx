import { useNavigate } from "react-router-dom";

function VendingMachineCard({ machine }) {
  const navigate = useNavigate();

  return (
    <div className="w-64 p-4 border rounded-xl shadow-md bg-white flex flex-col items-center">
      
      {/* Image Holder */}
      {/* <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
        <span className="text-gray-500">Image</span>
      </div> */}
      <img
        src={machine.imageUrl || "/placeholder.png"}
        alt={machine.machineName}
        className="w-full h-32 object-cover rounded-lg mb-4"
      />

      {/* Machine Name */}
      <h3 className="font-semibold text-lg mb-4 text-center">
        {machine.machineName}
      </h3>

      {/* Inventory Button */}
      <button
        onClick={() => navigate(`/vending-machines/${machine.vendingMachineId}`)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Inventory
      </button>
    </div>
  );
}

export default VendingMachineCard;
