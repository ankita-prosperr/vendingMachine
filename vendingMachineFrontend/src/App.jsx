import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import VendingMachines from "./pages/VendingMachines";
import Inventory from "./pages/Inventory";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/vending-machines" element={<VendingMachines />} />
        <Route path="/vending-machines/:id" element={<Inventory />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
