import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import VendingMachines from "./pages/VendingMachines";
import Inventory from "./pages/Inventory";
import AdminVendingMachines from "./pages/AdminVendingMachines";
import CreateVendingMachine from "./pages/CreateVendingMachine";
import AdminVendingMachineItems from "./pages/AdminVendingMachineItems";
import EditItem from "./pages/EditItem";
import AddItem from "./pages/AddItem";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/vending-machines" element={<VendingMachines />} />
        <Route path="/vending-machines/:id" element={<Inventory />} />
        <Route path="/admin/vending-machines" element={<AdminVendingMachines />} />
        <Route path="/admin/create-vending-machine" element={<CreateVendingMachine />} />
       <Route
         path="/admin/vending-machines/:vmId/items"
         element={<AdminVendingMachineItems />}
       />
       <Route
         path="/admin/vending-machines/:vmId/items/:itemId/edit"
         element={<EditItem />}
       />
       <Route
         path="/admin/vending-machines/:vmId/items/new"
         element={<AddItem />}
       />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
