import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import VendingMachines from "./pages/VendingMachines";
import Inventory from "./pages/Inventory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/vending-machines" element={<VendingMachines />} />
        <Route path="/vending-machines/:id" element={<Inventory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
