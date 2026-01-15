import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const login = async () => {
    const res = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
        isAdmin: role === "admin",
      }),
    });

    if (!res.ok) {
      alert("Login failed");
      return;
    }

    const user = await res.json();

    if (!user.isAdmin) {
      navigate("/vending-machines");
    } else {
      navigate("/admin/vending-machines");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <input
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <div className="flex justify-center gap-6 mb-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={role === "customer"}
              onChange={() => setRole("customer")}
            />
            Customer
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={role === "admin"}
              onChange={() => setRole("admin")}
            />
            Admin
          </label>
        </div>

        <button
          onClick={login}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
